# Bika Banquets — Website Transformation Plan

> Goal: make the site exceptionally alluring for customers AND a local-SEO leader for
> Kolkata banquet/wedding searches. Ambition level chosen: **Transform it.**
> Status: planning only — no site code changed yet.

---

## 0. TL;DR priority order

1. **Stop the bleeding** — fix the dead contact form, broken nav links, fake review schema, missing Howrah address.
2. **Fix the media** — replace ~9 recycled stock-feel photos with a curated set from the 400GB archive; add hero video, real gallery, testimonials.
3. **Deepen the SEO** — FAQ/Breadcrumb/Review schema, content pages for long-tail terms, neighborhood targeting, GBP + analytics.
4. **Showcase what you actually have** — lawns, multiple sub-halls, terraces, hundreds of real events.

---

## PHASE 1 — Critical fixes (fast, high ROI, low risk)

| # | Issue | Where | Fix |
|---|-------|-------|-----|
| 1 | **Contact form is dead** — posts to `formspree.io/f/YOUR_FORM_ID` placeholder; every submission is lost | `app/contact/page.tsx` | Wire to a real Formspree ID (or a Next.js API route + email/WhatsApp/Google Sheet). Add success/error states + spam honeypot. |
| 2 | **"Pricing" nav link broken** → `/#pricing` (no such anchor) | `components/Nav.tsx` | Point to a real pricing section or `/contact#pricing`; add matching `id`. |
| 3 | **Footer "FAQ" link broken** → `/#faq` (the `#faq` section is on /contact) | `components/Footer.tsx` | Link to `/contact#faq`. |
| 4 | **Fake review schema** — `aggregateRating 4.5 / 200` with zero visible reviews (Google guideline violation) | `app/layout.tsx` | Either add a real on-page reviews section backed by genuine reviews, or remove the rating until then. |
| 5 | **Howrah has no real address** | `lib/venues.ts` | Use real address from trade license: **212, Girish Ghosh Road, Belurmath, Howrah 711202** (+ correct geo). Unlocks "banquet hall Belurmath/Bally" search. |
| 6 | **Date drift** — "Since 2016" vs "9+ Years"; footer `© 2025` | `app/page.tsx`, `components/Footer.tsx` | Make year dynamic; reconcile years-of-excellence number. |

---

## PHASE 2 — Media transformation (the biggest visual upgrade)

The entire site currently runs on ~9 images reused everywhere, served from the old
Zyrosite CDN. This is the #1 thing making it feel less premium than it should.

### 2a. Photo overhaul
- Curate a fresh set from the Drive archive via the AI pipeline (see Phase 5).
- Targets: 1 strong hero per page, 4–6 per venue gallery, 20–40 in the main gallery,
  plus dedicated shots for décor, catering, lawn, terrace, stage/mandap.
- Self-host optimized images (or a modern CDN) instead of depending on Zyrosite.
- Every image: descriptive filename + alt + caption (doubles as image SEO — Phase 4).

### 2b. Video (you have 400GB — use it)
- **Hero background video**: 10–20s muted, looping, lightweight (poster image fallback,
  lazy-loaded, `prefers-reduced-motion` respected). Single biggest "wow" upgrade.
- **Reels strip**: 3–6 short vertical clips (décor reveal, full hall, crowd joy, food).
- **1–2 video testimonials** if available.

### 2c. New content sections
- **Testimonials / social proof** (real quotes + names + event type + photo).
- **"Events we host" depth** — weddings, tilak, reception, roka, upnayan, sangeet,
  mehndi, anniversary, corporate. (Your booking sheets prove huge real volume.)
- **"How booking works"** simple 4-step timeline (enquiry → visit → 50% advance → event).
- **Downloadable menu PDF** + menu highlights.
- **Google Maps embed** per venue.
- **Instagram feed embed** (if active).

### 2d. Showcase the real venues (currently under-sold)
Booking data reveals far more than the site shows:
- **Golaghata**: halls A1–A5 **+ a lawn** (lawn is a major selling point — currently hidden).
- **Bika Rythm Baguiati**: Rythm A, Rythm B, an open Terrace, **and a 7th-floor terrace**.
- Reframe venue pages around configurable multi-space + lawn/terrace options.

---

## PHASE 3 — UX / conversion polish

- Gallery: real filtering (venue + event type) + lightbox + lazy load + more volume.
- Sticky mobile call/WhatsApp bar.
- Faster, clearer enquiry form (autosave, inline validation, WhatsApp prefill per venue — partially done).
- Trust badges: years, events hosted, in-house kitchen/décor, valet, power backup.
- Accessibility pass (focus states, color contrast on gold-on-white, alt coverage).
- Add a real `/opengraph-image` for richer link previews.

---

## PHASE 4 — SEO depth (foundation is already good; make it dominate)

Already in place (keep): LocalBusiness + EventVenue schema, sitemap, robots, canonical,
per-page titles/descriptions, OG/Twitter cards, semantic HTML.

Add:
- **`FAQPage` schema** (you have FAQs on /contact + per venue — not marked up → missing rich snippets).
- **`BreadcrumbList` schema** (breadcrumbs are visual-only today).
- **Real `Review` + `AggregateRating`** backed by visible reviews (also fixes Phase 1 #4 → earns star ratings).
- **Image SEO at scale** — descriptive filenames/alt/captions + an image sitemap (this is where the 400GB pays back in search traffic).
- **Long-tail content pages / short blog**:
  - "Bengali wedding venues in North Kolkata"
  - "Banquet halls near Kolkata airport (VIP Road / Baguiati)"
  - "Marriage halls with lawn in Dakshindari / Golaghata"
  - "Sangeet & mehndi venues with open terrace in Kolkata"
  - "Affordable per-plate banquet catering in Kolkata"
- **Neighborhood targeting**: Belurmath, Bally, Dum Dum, Lake Town, VIP Road, Salt Lake, Howrah.
- **Google Business Profile**: 3 profiles (one per venue), consistent NAP, photos, posts, reviews → drives the map pack (where most banquet enquiries start).
- **Analytics + Search Console**: add GA4/GTM + verification (currently none — can't optimize what you can't measure).
- **Core Web Vitals**: self-host optimized media, lazy-load video, keep priority hero image.

---

## PHASE 5 — AI media analysis pipeline (for the 400GB)

Reality check from inspecting the Drive:
- Most of the 400GB is **personal media** (TV shows/movies), not business assets.
  → Scope analysis to the **event-photo folder(s) only** (user will provide the folder).
- Drive also holds **sensitive docs** (passport/visa scan, trade licenses, customer
  booking sheets with hundreds of phone numbers). These must NOT be processed or published.
  Customer phone numbers are personal data — keep them off the public site.

### Photo pipeline (high value, cheap, do first)
1. **Scope** — list the target folder(s); count + group by venue/date.
2. **Pre-filter** — pull small thumbnails (not full files) so processing is fast/cheap.
3. **AI score** each image on: technical quality (sharpness/exposure), composition/aesthetics,
   subject (décor / stage-mandap / full hall / food / lawn / terrace / lighting / candid joy),
   and flag images with identifiable guest faces (consent before publishing).
4. **Tag & categorize** — venue + event type + best use (hero / gallery / décor / catering).
5. **Dedup & rank** — collapse near-duplicates; keep top N per category.
6. **Deliver** — a ranked sheet: thumbnail, Drive link, scores, tags, suggested placement,
   auto-written SEO alt text + filename. You skim dozens, not thousands.

### Video pipeline (sample, not exhaustive)
- Target best recent event videos; extract keyframes; score frames; shortlist 5–15 clips
  to trim into a hero loop + reels. Don't attempt to watch the whole archive.

### Suggested first step
- Run a **pilot on one event folder** to validate scoring/tagging before scaling.

---

## Open items / needed from owner
- [ ] Drive folder link/name containing the real event photos.
- [ ] Real Formspree ID (or preference for API-route + email/Sheet/WhatsApp).
- [ ] Real reviews/testimonials (text + optional photos + consent).
- [ ] Confirm Howrah/Belurmath address + whether to list it publicly.
- [ ] Active Instagram / Google Business Profile URLs.
- [ ] Any brand assets (logo files, brand colors, menu PDFs).
