# Media analysis tools

AI shortlister for the Bika event-photo archive on Google Drive.

The archive is large and mostly NOT website-grade (the originals are 10–17 MB
DSLR JPGs, and most shots in any event shoot are duplicates / blurry / cluttered).
`analyze_media.py` lets Claude do the first editorial pass so you only review a
ranked shortlist instead of thousands of photos.

## How it works

1. Walks the Drive folder recursively (Shared Drives supported).
2. Groups every photo by **venue + shoot** (inferred from the folder names).
3. For each image, fetches Drive's **thumbnail** (~1024px) — never the full file —
   and asks Claude vision to score it (quality, aesthetics, subject, usability),
   tag it, flag identifiable guest faces, suggest where it belongs on the site,
   and write SEO alt text + a caption.
4. Writes `shortlist.csv` (one row per image) and `videos_catalog.csv`.

## Quick start

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r tools/requirements.txt

# Google auth: Cloud Console -> enable Drive API -> create OAuth "Desktop app"
# client -> download as tools/credentials.json. First run opens a browser once.

export ANTHROPIC_API_KEY=sk-ant-...

# 1) Free inventory — see counts/sizes per shoot, no AI spend:
python3 tools/analyze_media.py --folder 1raIsvxh7vuMzZ3lxinwljCat7ts_tMTq --dry-run

# 2) Pilot — score the first 25 images to sanity-check the rubric:
python3 tools/analyze_media.py --folder 1raIsvxh7vuMzZ3lxinwljCat7ts_tMTq --limit 25

# 3) Full run:
python3 tools/analyze_media.py --folder 1raIsvxh7vuMzZ3lxinwljCat7ts_tMTq
```

Then open `shortlist.csv` in Google Sheets, sort by `score_overall` descending,
and filter out `suggested_use = skip`. The `drive_link` column jumps straight to
each original for the final human pick.

## Cost

`MODEL` defaults to `claude-opus-4-8`. For triaging large volumes,
`--model claude-haiku-4-5` costs roughly 5× less and is usually plenty for
"is this usable and what is it of" — eyeball a sample of each before committing
to a full run.

## Privacy

- Point this **only** at the event-photo folder. The wider Drive contains
  personal documents (IDs, licenses, customer booking sheets with phone numbers) —
  keep those out of scope and off any public page.
- `has_identifiable_faces = yes` flags photos where recognisable guests appear.
  Get consent before publishing those.
- `token.json` and `credentials.json` are gitignored — never commit them.
