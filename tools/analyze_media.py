#!/usr/bin/env python3
"""
analyze_media.py — AI shortlister for the Bika event-photo archive.

What it does
------------
Walks a Google Drive folder (recursively), and for every IMAGE it finds:
  1. Pulls a small *thumbnail* from Drive (never the full 10-17 MB original),
  2. Sends that thumbnail to Claude vision for scoring + tagging,
  3. Writes one row per image to a CSV you can sort in Sheets/Excel.

For VIDEOS it just catalogues them (path, size, link) so you can shortlist by
hand or with a follow-up keyframe pass — it does not download or transcode them.

Why thumbnails: the originals are huge and there are potentially thousands of
them. Drive's thumbnailLink gives a ~1024px JPEG that is plenty for judging
composition, lighting, subject and usability — at a tiny fraction of the bytes
and cost.

Output columns (per image)
--------------------------
file_id, name, venue, shoot_folder, drive_link,
score_overall (0-100), quality (0-10), aesthetics (0-10),
category (decor/stage/hall/food/lawn/terrace/candid/portrait/other),
event_type, has_identifiable_faces (yes/no — get consent before publishing),
suggested_use (hero/gallery/decor-section/catering/skip),
alt_text, caption, reason

Setup
-----
    python3 -m venv .venv && source .venv/bin/activate
    pip install -r tools/requirements.txt

    # Google: create an OAuth desktop client in Google Cloud Console, enable the
    # Drive API, download credentials.json into tools/. First run opens a browser
    # to authorise read-only Drive access; the token is cached in tools/token.json.

    # Claude:
    export ANTHROPIC_API_KEY=sk-ant-...

Run
---
    # Inventory only — counts images/videos per shoot, no AI cost:
    python3 tools/analyze_media.py --folder 1raIsvxh7vuMzZ3lxinwljCat7ts_tMTq --dry-run

    # Full scoring run -> writes tools/shortlist.csv:
    python3 tools/analyze_media.py --folder 1raIsvxh7vuMzZ3lxinwljCat7ts_tMTq

    # Limit while testing (score only the first 25 images):
    python3 tools/analyze_media.py --folder <ID> --limit 25

Cost note
---------
MODEL defaults to claude-opus-4-8 (best judgement). For triaging hundreds or
thousands of photos this is overkill — claude-haiku-4-5 costs ~5x less and is
usually more than good enough for "is this shot usable and what is it of".
Flip MODEL below (or pass --model) once you've eyeballed a sample of each.
"""

from __future__ import annotations

import argparse
import base64
import csv
import json
import os
import sys
import time
from dataclasses import dataclass

# --- Google Drive ---
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# --- Claude ---
import anthropic

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN_PATH = os.path.join(HERE, "token.json")
CREDS_PATH = os.path.join(HERE, "credentials.json")
OUT_CSV = os.path.join(HERE, "shortlist.csv")
VIDEO_CSV = os.path.join(HERE, "videos_catalog.csv")

MODEL = "claude-opus-4-8"  # see "Cost note" above — consider claude-haiku-4-5 at scale

# The scoring rubric is a stable prefix -> cache it so we only pay to process it once.
SYSTEM_PROMPT = """You are a photo editor curating images for a luxury banquet-hall \
and wedding-venue website (Bika Banquets, Kolkata). You are shown ONE thumbnail at a \
time and must judge it for use on a high-end marketing site.

Score each image honestly. Most archive photos are NOT website-worthy (blurry, badly \
lit, cluttered, duplicate-ish, unflattering crowd shots) — be a strict editor. Reserve \
high scores for images that are sharp, well-composed, well-lit and genuinely alluring.

Definitions:
- quality (0-10): technical — sharpness, exposure, focus, noise, motion blur.
- aesthetics (0-10): composition, lighting mood, colour, how 'premium' it feels.
- score_overall (0-100): your overall website-worthiness, weighing both plus subject value.
- category: the dominant subject — one of decor, stage, hall, food, lawn, terrace, \
candid, portrait, other.
- event_type: best guess (wedding, reception, sangeet, mehndi, tilak, engagement, \
corporate, birthday, other) or "unknown".
- has_identifiable_faces: "yes" if recognisable guests' faces are prominent (these need \
consent before publishing), else "no".
- suggested_use: hero, gallery, decor-section, catering, or skip.
- alt_text: concise SEO alt text (<=120 chars) describing the scene, naturally including \
venue/Kolkata context when relevant.
- caption: a short, elegant 2-5 word caption.
- reason: one short sentence justifying the score."""

# Constrain Claude's reply to exactly this JSON shape.
SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "score_overall": {"type": "integer"},
        "quality": {"type": "integer"},
        "aesthetics": {"type": "integer"},
        "category": {"type": "string", "enum": [
            "decor", "stage", "hall", "food", "lawn", "terrace",
            "candid", "portrait", "other"]},
        "event_type": {"type": "string"},
        "has_identifiable_faces": {"type": "string", "enum": ["yes", "no"]},
        "suggested_use": {"type": "string", "enum": [
            "hero", "gallery", "decor-section", "catering", "skip"]},
        "alt_text": {"type": "string"},
        "caption": {"type": "string"},
        "reason": {"type": "string"},
    },
    "required": ["score_overall", "quality", "aesthetics", "category",
                 "event_type", "has_identifiable_faces", "suggested_use",
                 "alt_text", "caption", "reason"],
}


@dataclass
class DriveItem:
    file_id: str
    name: str
    mime: str
    size: int
    venue: str          # inferred from the top-level shoot folder name
    shoot_folder: str
    thumbnail_link: str | None


def drive_service():
    creds = None
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDS_PATH):
                sys.exit(f"Missing {CREDS_PATH} — download an OAuth desktop client "
                         "from Google Cloud Console (Drive API enabled).")
            creds = InstalledAppFlow.from_client_secrets_file(
                CREDS_PATH, SCOPES).run_local_server(port=0)
        with open(TOKEN_PATH, "w") as f:
            f.write(creds.to_json())
    # supportsAllDrives=True so this works on Shared Drives.
    return build("drive", "v3", credentials=creds)


def infer_venue(folder_name: str) -> str:
    n = folder_name.upper()
    if "RANGOLI" in n or "HOWRAH" in n or "BELUR" in n:
        return "Howrah (Bika Rangoli)"
    if "BAGUIHATI" in n or "BAGUIATI" in n or "RYTHM" in n or "RHYTHM" in n:
        return "Baguiati (Bika Rythm)"
    if "GOLAGHATA" in n:
        return "Golaghata (Bika Banquets)"
    if "SILIGURI" in n or "FOUR VEDA" in n:
        return "Siliguri (Four Veda)"
    if "DIVINITY" in n:
        return "Divinity"
    return folder_name


def walk(svc, folder_id: str, venue: str, shoot: str, depth: int = 0):
    """Yield DriveItem for every file under folder_id (recursing into subfolders)."""
    page = None
    while True:
        resp = svc.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id,name,mimeType,size,thumbnailLink)",
            pageSize=200, pageToken=page,
            includeItemsFromAllDrives=True, supportsAllDrives=True,
        ).execute()
        for f in resp.get("files", []):
            mime = f.get("mimeType", "")
            if mime == "application/vnd.google-apps.folder":
                # Top-level children define the venue/shoot grouping.
                child_shoot = f["name"] if depth == 0 else shoot
                child_venue = infer_venue(f["name"]) if depth == 0 else venue
                yield from walk(svc, f["id"], child_venue, child_shoot, depth + 1)
            else:
                yield DriveItem(
                    file_id=f["id"], name=f["name"], mime=mime,
                    size=int(f.get("size", 0) or 0),
                    venue=venue or infer_venue(shoot), shoot_folder=shoot,
                    thumbnail_link=f.get("thumbnailLink"),
                )
        page = resp.get("nextPageToken")
        if not page:
            break


def fetch_thumbnail_b64(svc, item: DriveItem) -> str | None:
    """Drive's thumbnailLink ends in '=sNNN'; bump it to ~1024px and fetch the bytes
    through the authorised session so we never download the full-size original."""
    link = item.thumbnail_link
    if not link:
        return None
    if "=s" in link:
        link = link.rsplit("=s", 1)[0] + "=s1024"
    # Reuse the Drive client's authorised http transport.
    resp, content = svc._http.request(link)
    if resp.status != 200:
        return None
    return base64.standard_b64encode(content).decode()


def score_image(client, b64: str, item: DriveItem) -> dict:
    msg = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=[{"type": "text", "text": SYSTEM_PROMPT,
                 "cache_control": {"type": "ephemeral"}}],
        output_config={"format": {"type": "json_schema", "schema": SCHEMA}},
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {
                "type": "base64", "media_type": "image/jpeg", "data": b64}},
            {"type": "text", "text": (
                f"Venue: {item.venue}. Shoot: {item.shoot_folder}. "
                "Score this image for the website.")},
        ]}],
    )
    text = "".join(b.text for b in msg.content if b.type == "text")
    return json.loads(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--folder", required=True, help="Drive folder ID to analyse")
    ap.add_argument("--dry-run", action="store_true", help="Inventory only, no AI calls")
    ap.add_argument("--limit", type=int, default=0, help="Cap images scored (0 = all)")
    ap.add_argument("--model", default=MODEL)
    args = ap.parse_args()

    global MODEL
    MODEL = args.model

    svc = drive_service()
    items = list(walk(svc, args.folder, venue="", shoot="(root)"))
    images = [i for i in items if i.mime.startswith("image/")]
    videos = [i for i in items if i.mime.startswith("video/")]

    # --- inventory summary ---
    by_shoot: dict[str, list[DriveItem]] = {}
    for i in images:
        by_shoot.setdefault(i.shoot_folder, []).append(i)
    print(f"\nFound {len(images)} images and {len(videos)} videos across "
          f"{len(by_shoot)} shoots.\n")
    for shoot, imgs in sorted(by_shoot.items()):
        gb = sum(x.size for x in imgs) / 1e9
        print(f"  {len(imgs):>4} imgs  {gb:5.1f} GB  {imgs[0].venue:<28} {shoot}")

    # Always write the video catalogue (cheap, no AI).
    with open(VIDEO_CSV, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["file_id", "name", "venue", "shoot_folder", "size_mb", "drive_link"])
        for v in videos:
            w.writerow([v.file_id, v.name, v.venue, v.shoot_folder,
                        round(v.size / 1e6, 1),
                        f"https://drive.google.com/file/d/{v.file_id}/view"])
    print(f"\nVideo catalogue -> {VIDEO_CSV}")

    if args.dry_run:
        print("\nDry run — no images scored.")
        return

    client = anthropic.Anthropic()
    todo = images[: args.limit] if args.limit else images
    print(f"\nScoring {len(todo)} images with {MODEL} ...\n")

    with open(OUT_CSV, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["file_id", "name", "venue", "shoot_folder", "drive_link",
                    "score_overall", "quality", "aesthetics", "category",
                    "event_type", "has_identifiable_faces", "suggested_use",
                    "alt_text", "caption", "reason"])
        for n, item in enumerate(todo, 1):
            try:
                b64 = fetch_thumbnail_b64(svc, item)
                if not b64:
                    print(f"  [{n}/{len(todo)}] no thumbnail, skip: {item.name}")
                    continue
                s = score_image(client, b64, item)
                w.writerow([
                    item.file_id, item.name, item.venue, item.shoot_folder,
                    f"https://drive.google.com/file/d/{item.file_id}/view",
                    s["score_overall"], s["quality"], s["aesthetics"], s["category"],
                    s["event_type"], s["has_identifiable_faces"], s["suggested_use"],
                    s["alt_text"], s["caption"], s["reason"]])
                f.flush()
                print(f"  [{n}/{len(todo)}] {s['score_overall']:>3}  "
                      f"{s['suggested_use']:<13} {item.name}")
            except anthropic.RateLimitError:
                print("  rate limited — sleeping 30s"); time.sleep(30)
            except Exception as e:  # keep going; one bad file shouldn't stop the run
                print(f"  [{n}/{len(todo)}] error on {item.name}: {e}")

    print(f"\nDone. Shortlist -> {OUT_CSV}")
    print("Tip: open in Sheets, sort by score_overall desc, filter suggested_use != skip.")


if __name__ == "__main__":
    main()
