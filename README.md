# williamecheverriat.github.io

Source for the personal academic website of William E. Echeverria Tigse, live at
<https://williamecheverriat.github.io>.

The site is a [Quarto](https://quarto.org) website project (Quarto 1.10.19). Pages are `.qmd` files in this
repository. The rendered site lives on the `gh-pages` branch and is served by GitHub Pages.

## Preview locally

```powershell
quarto preview
```

This opens a live preview in the browser and reloads as you edit. `quarto render` builds the full site into
`_site/` (ignored by git).

## How publishing works

- **Branches:** all changes go on a branch named `update/<short-description>` and arrive as a pull request.
  Nothing is pushed to `main` directly.
- **On every pull request:** `.github/workflows/check.yml` runs `quarto render` to confirm the site builds.
  Nothing is published.
- **On merge to `main`:** `.github/workflows/publish.yml` renders the site and publishes it to the `gh-pages`
  branch. GitHub Pages then serves it, usually within a minute or two.
- **R code:** CI does not install R. Any page or post with R code must be rendered locally first
  (`quarto render path/to/page.qmd`), and the resulting `_freeze/` folder committed with the change.
  If you forget, the PR check fails.

## Working with Claude Code

`CLAUDE.md` holds the project instructions for Claude Code (VS Code, the Claude app, or claude.ai/code).
`.claude/` contains permissions, path-scoped rules, skills (`add-paper`, `add-talk`, `add-teaching`, `add-post`,
`update-cv`, `site-check`) and the `site-reviewer` agent. `MEMORY.md` collects lessons from corrections.

## One-time setup (by hand)

1. Run `quarto publish gh-pages` once locally. This creates the `gh-pages` branch and `_publish.yml`.
2. Commit `_publish.yml` to `main` (via a PR once branch protection is on).
3. GitHub → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch**,
   branch **`gh-pages`**, folder **`/ (root)`**.
4. GitHub → **Settings → Actions → General** → *Workflow permissions*: **Read and write permissions**.
5. Recommended: GitHub → **Settings → Rules → Rulesets** (or *Branches*) → add a rule for `main` that
   **requires a pull request before merging** and blocks force pushes. Optionally also require the
   "Check site builds" status check.
