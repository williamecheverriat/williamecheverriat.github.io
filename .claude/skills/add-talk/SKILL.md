---
name: add-talk
description: Add one presentation to the Conferences page, talks.qmd, optionally with slides (a Quarto revealjs deck, a PDF, or an external link). Use when William asks to add a talk, seminar, conference presentation or slides.
---

# Add a talk

1. Read `MEMORY.md` and `.claude/rules/writing-style.md`.
2. Collect from William only: talk title, event/venue, city (optional), date (month + year at least),
   related paper (optional), slides (see step 5). Anything missing → ask or `TODO(William): ...`.
3. Check `talks.qmd` (the Conferences page) exists. If not, **ask before creating it** (new page; page title and
   navbar label "Conferences"; keep the file name `talks.qmd` so the URL stays `talks.html`).
4. Create branch `update/add-talk-<short-title>`.
5. Slides, one of:
   - **Quarto revealjs deck** (William's usual): put the source in `talks/<YYYY-MM-DD-short-title>/index.qmd`
     with `format: revealjs` in its front matter. Images go in the same folder. It renders with the site
     at `talks/<YYYY-MM-DD-short-title>/`.
     **If the deck has R chunks**, William must render it locally so `_freeze/talks/...` is committed.
     If it isn't frozen yet, say so and stop.
   - **PDF:** save as `files/talks/<YYYY-MM-DD-short-title>.pdf` and link it.
   - **External link:** use the URL William gives, unchanged.
6. Add the entry to `talks.qmd` using [template.md](template.md) (or the page's existing format),
   newest first.
7. Verify: `quarto render` (or "UNVERIFIED — relying on the PR check"). Check the slides link resolves.
8. Commit the files by name, push, open a PR titled "Add talk: <short title>".
