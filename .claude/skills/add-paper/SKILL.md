---
name: add-paper
description: Add one paper (working paper, publication, or work in progress) to the Research page, research.qmd, using only details William provides. Use when William asks to add, list or update a paper.
---

# Add a paper

1. Read `MEMORY.md` and `.claude/rules/writing-style.md`.
2. Collect the details from William's message. Never look them up or guess them. Required: title,
   co-authors (or "sole-authored"), status (working paper / published / work in progress).
   Optional: venue and year, abstract, links (PDF, SSRN/NBER/arXiv, DOI, journal page, replication package).
   Any required field missing → ask William. Any optional field mentioned but not given → `TODO(William): ...`.
3. Check `research.qmd` exists. If not, **ask before creating it** (it is a new page; navbar label "Research").
4. Create branch `update/add-paper-<short-title>`.
5. Add the entry under the right section (Publications / Working papers / Work in progress), using
   [template.md](template.md). If `research.qmd` already has entries, match their existing format instead.
   Newest first within a section unless the page orders otherwise.
6. If William supplied a PDF: save it as `files/papers/<short-title>.pdf` (lowercase, hyphens) and link it
   relatively. Don't link to files that aren't in the repo.
7. Validate links you were given: DOIs as `https://doi.org/<doi>`. Don't alter a DOI or URL.
8. Verify: `quarto render` (or say "UNVERIFIED — relying on the PR check"). Optionally run `site-reviewer`.
9. Commit the files by name, push, open a PR titled "Add paper: <short title>", listing any TODOs.
