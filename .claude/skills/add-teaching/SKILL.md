---
name: add-teaching
description: Add one course or teaching role (instructor, TA, guest lecturer) to the Teaching page, teaching.qmd, with an optional materials link. Use when William asks to add or update teaching experience.
---

# Add a teaching entry

1. Read `MEMORY.md` and `.claude/rules/writing-style.md`.
2. Collect from William only: course name, institution, role (e.g. Instructor, Teaching Assistant),
   term/year, level (optional), materials link or file (optional). Missing → ask or `TODO(William): ...`.
3. Check `teaching.qmd` exists. If not, **ask before creating it** (new page; navbar label "Teaching").
4. Create branch `update/add-teaching-<short-course-name>`.
5. Add the entry using the format below (or the page's existing format), newest first,
   grouped by role if the page already groups them:

   ```markdown
   - **Course name** (Level), Institution. Role, Term YYYY. [Materials](files/teaching/<file>)
   ```

6. Materials: a file William provides goes in `files/teaching/` (lowercase, hyphens). A Quarto document
   becomes a `.qmd` page. Ask where before creating it, and if it has R chunks William must render it locally.
   External links are used exactly as given.
7. Don't include student names or any student data.
8. Verify: `quarto render` (or "UNVERIFIED — relying on the PR check").
9. Commit the files by name, push, open a PR titled "Add teaching: <course>".
