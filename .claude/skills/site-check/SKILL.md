---
name: site-check
description: Check the site for problems (build errors, broken internal links, missing images, front-matter/YAML errors, typos, leftover TODOs) and report them without changing anything. Use when William asks to check, audit or test the site.
---

# Site check (report only, change nothing)

1. Run `quarto --version`. If Quarto is available, run `quarto render` and record errors and warnings.
   If not, say "UNVERIFIED: Quarto not available, build not checked".
2. **Config:** `_quarto.yml` parses, every navbar `href` points to an existing file, and `site-url`
   is `https://williamecheverriat.github.io`.
3. **Front matter:** every `.qmd` starts with a valid `---` YAML block and has a `title`.
   Posts also need `date`, `description`, `categories` and `draft`.
4. **Internal links:** for each relative link `](path)` or `href="path"` in `.qmd` files, check the target
   exists (relative to the file; `.qmd` targets count for `.html` links; `#anchors` should match a heading or id).
5. **Images:** every `![...](path)` and image path in front matter exists, and every image has non-empty alt text.
6. **Files:** links into `files/` point to files that exist in the repo.
7. **Freeze:** each `.qmd` with `{r}` chunks has a matching folder in `_freeze/`.
8. **Typos and style:** proofread the page text (not code), following `.claude/rules/writing-style.md`.
9. **TODOs and privacy:** list every `TODO(` in the site, and flag anything that looks like a phone
   number, home address or ID number.
10. Report a table: severity (error / warning / suggestion), file:line, issue, suggested fix.
    **Don't edit files, create branches or commit.**
