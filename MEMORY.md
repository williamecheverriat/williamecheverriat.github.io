# MEMORY.md

Lessons learned from William's corrections. Claude reads this file at the start of every task.

- Format: one line per lesson, `[LEARN:tag] lesson`. The tag is a short topic such as `style`, `git`, `research`,
  `talks`, `teaching`, `blog`, `cv`, `config` or `quarto`.
- Add an entry only after William agrees to it. Keep entries short and specific; delete ones that stop being true.
- Facts about William's career belong on the site pages, not here.

## Entries

[LEARN:facts] When the CV and old website disagree, the CV wins.
[LEARN:awards] SASE 2025 travel grant: awarded, declined; never list as a talk or "presenter". If listed at all, only as an award: "Travel Grant, SASE Annual Meeting, Montréal, 2025".
[LEARN:seo] New pages need a title and a one-sentence description.
[LEARN:language] No visible Spanish summary on the site (William's choice). Spanish appears only in JSON-LD and in original Spanish titles.
[LEARN:design] SEO or content changes must not alter visual styling; check the Home header looks the same before opening the PR.
[LEARN:windows] Files William downloads (PDFs, verification files, images) carry Windows' Zone.Identifier mark; Quarto's copy into _site/ then gets locked by the antivirus and the render fails. Fix: Unblock-File on the source file (contents unchanged), delete _site/, re-render. OK to do without asking; it doesn't count as modifying the file.

## Pending
