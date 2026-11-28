---
paths:
  - "_quarto.yml"
  - "_publish.yml"
  - ".github/workflows/**"
---

# Site configuration and CI

- Don't change `website.site-url`, `_publish.yml` or `.github/workflows/*` unless William explicitly asks.
- Keep `project.render: ["**/*.qmd"]`. It stops `README.md`, `CLAUDE.md`, `MEMORY.md` and `.claude/` from
  becoming pages. New pages must be `.qmd`.
- Keep `execute.freeze: auto`, and never add R setup to the workflows. CI renders from the committed `_freeze/`.
- Navbar order, once the pages exist: Home, Research, Conferences (`talks.qmd`), Teaching, CV, Blog. Every navbar `href`
  must point to an existing `.qmd`.
- YAML: two-space indentation, no tabs. Quote strings containing `:` or `#`. After any edit,
  run `quarto render` (or flag UNVERIFIED) because a YAML error breaks the whole site.
- `styles.scss` keeps its `/*-- scss:defaults --*/` and `/*-- scss:rules --*/` markers.
- Workflows: `publish.yml` runs on push to `main` (+ manual) and publishes to `gh-pages` with
  `GITHUB_TOKEN`. `check.yml` runs `quarto render` on PRs and never publishes. Quarto is pinned
  to the same version William uses locally. Update both together only when asked.
