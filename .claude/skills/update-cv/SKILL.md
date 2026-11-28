---
name: update-cv
description: Replace the CV PDF at files/cv.pdf with a new version William provides, and update cv.qmd and any other links. Use when William says the CV has changed or asks to update the CV.
---

# Update the CV

1. Read `MEMORY.md`.
2. Confirm the new PDF is available (attached by William or already in the working tree). If there is no
   new PDF, **stop and ask**. Never generate or edit a CV PDF yourself.
3. Create branch `update/cv-<YYYY-MM>`.
4. Replace `files/cv.pdf` with the new file. Keep that exact filename so existing links keep working.
5. Update `cv.qmd`:
   - If it doesn't exist, **ask before creating it** (new page; navbar label "CV").
   - Make sure it links to (and, if the page already embeds it, embeds) `files/cv.pdf`.
   - Don't add a "Last updated" line to the page (William removed it in November 2026; the date is in the PDF).
6. Search every `.qmd` and `_quarto.yml` for CV links (`grep -rn "cv" --include=*.qmd`) and make sure they point
   to `files/cv.pdf` (relative), not to an old filename or an external copy.
7. Don't copy CV content into site pages unless asked.
8. Verify: `quarto render` (or "UNVERIFIED — relying on the PR check"). Check `_site/files/cv.pdf` exists after render.
9. Commit the files by name, push, open a PR titled "Update CV (Month YYYY)".
