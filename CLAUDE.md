# CLAUDE.md

Personal academic website of **William E. Echeverria Tigse**, built with Quarto (1.10.19) as a Quarto website
project and published to GitHub Pages at https://williamecheverriat.github.io.

- Position/affiliation: TODO(William): not yet provided.
- Research areas: TODO(William): not yet provided.
- Audience: academics, hiring committees, students. Tone: professional, plain, first person
  (details in `.claude/rules/writing-style.md`).
- William knows R and Quarto well and web development less well. Explain web-specific changes briefly.

## Start of every task

1. Read `MEMORY.md` and apply every `[LEARN:...]` entry.
2. List the files you will change before editing them. One focused change per PR.

## Where things live

| Path | What it is |
|---|---|
| `_quarto.yml` | Site config: title, navbar, theme, render list, `site-url`, `execute.freeze` |
| `*.qmd` | Site pages (see page map below) |
| `posts/<YYYY-MM-DD-short-title>/index.qmd` | One folder per blog post; the post's images live in its folder |
| `talks/<YYYY-MM-DD-short-title>/` | Quarto (revealjs) slides hosted on the site, if any |
| `styles.scss` | Custom theme (Quarto SCSS with `scss:defaults` / `scss:rules` sections) |
| `images/` | Site-wide images (profile photo, etc.) |
| `files/` | Downloadable files: `files/cv.pdf`, `files/papers/`, `files/talks/`, `files/teaching/` |
| `_freeze/` | Frozen R output. **Committed.** CI never runs R |
| `.claude/` | Claude Code config: `settings.json`, `rules/`, `skills/`, `agents/` |
| `.github/workflows/` | `publish.yml` (main → gh-pages), `check.yml` (PR build check) |
| `MEMORY.md` | Lessons learned from William's corrections |

### Page map

| File | Page |
|---|---|
| `index.qmd` | Home: single-page profile (photo, short bio, links, highlights) |
| `research.qmd` | Research: working papers, publications, work in progress |
| `talks.qmd` | Talks: presentations |
| `teaching.qmd` | Teaching: courses, TA roles, materials |
| `cv.qmd` | CV page linking/embedding `files/cv.pdf` |
| `blog.qmd` | Blog: Quarto listing page of `posts/` |
| `about.qmd` | To be merged into `index.qmd` later. Do not delete without asking |

Navbar order (once these pages exist): Home, Research, Talks, Teaching, CV, Blog.
Some of these pages do not exist yet. **Ask before creating a page that doesn't exist.**

## Workflow (local and cloud sessions)

1. `git checkout -b update/<short-description>` from an up-to-date `main`.
2. Make one focused change.
3. Verify (see below), then optionally run the `site-reviewer` agent on the branch diff.
4. Stage files **by name** (never `git add -A` / `git add .`), commit, `git push -u origin update/<...>`.
5. Open a PR with a clear summary: what changed, why, files touched, verification status, open TODOs.
6. William reviews and merges. On merge, `.github/workflows/publish.yml` renders and publishes to `gh-pages`.
   Every PR is build-checked by `.github/workflows/check.yml`.

## Rules

a. **Never invent facts.** No made-up papers, co-authors, dates, venues, awards, DOIs or links.
   Missing info → write a visible `TODO(William): ...` in the page and ask William.
b. Always work on a new `update/<short-description>` branch and open a PR. Never push to `main`,
   never force-push, never run `quarto publish`.
c. Ask before deleting files or removing existing content.
d. Before editing, list the files you'll change. One focused change per PR.
e. Don't change `site-url`, `_publish.yml`, or `.github/workflows/*` unless William asks.
f. No private info (phone, home address, ID numbers). Never read or create credential or
   recovery-code files (`*recovery-codes*`, `.env*`), by any tool, including shell commands.
g. Site pages are `.qmd` only (no new `.md`, `.ipynb` or `.html` pages).
h. If Quarto is available, run `quarto render` before opening the PR; otherwise rely on the PR check and say so.

## Verification

A task is **done** only after `quarto render` succeeds with no errors.
If Quarto cannot run (for example in a cloud session), the PR summary and your final message must say
**"UNVERIFIED — relying on the PR check"**, never "done".

## R code and `_freeze/`

- `execute.freeze: auto` is on. CI has no R. It renders from the committed `_freeze/`.
- Pages or posts with R chunks must be rendered **locally by William** so `_freeze/` is updated and committed.
- If a requested change edits R code or needs R output re-computed: **say so and stop.** Don't edit
  `_freeze/` by hand. Text-only edits outside R chunks of an already-frozen page are fine.

## Skills and agents

- Skills (`.claude/skills/`): `add-paper`, `add-talk`, `add-teaching`, `add-post`, `update-cv`, `site-check`.
- Agent (`.claude/agents/site-reviewer.md`): read-only review of the branch diff before a PR.
- Path-scoped rules (`.claude/rules/`): `blog-posts.md`, `site-config.md`, `writing-style.md` (always on).

## Learning from corrections

When William corrects you, propose a new `MEMORY.md` entry in the form `[LEARN:tag] lesson` and add it
(in the same PR, or a separate `update/memory-...` PR) once William agrees.
