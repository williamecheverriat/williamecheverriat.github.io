---
paths:
  - "posts/**"
  - "blog.qmd"
---

# Blog posts

- One folder per post: `posts/<YYYY-MM-DD-short-title>/index.qmd`. Lowercase, hyphen-separated slug.
  The folder date is the post's `date`.
- The post's images and data files live inside its own folder and are referenced with relative paths
  (`![Alt text](figure.png)`), not from `images/`.
- Required front matter: `title`, `date` (YYYY-MM-DD), `description`, `categories`, `draft`.
  New posts start with `draft: true`. Only William sets `draft: false`.
- Drafts are hidden from the published site and listing but are visible in `quarto preview`.
- Posts are written by William. Claude may scaffold, edit or proofread, but must not add claims,
  results, citations or anecdotes William has not provided.
- **R code:** if a post has R chunks, William must render it locally so `_freeze/posts/<slug>/` is
  created and committed. CI cannot run R. If the change edits R code or needs R re-run, say so and stop.
- Don't rename or move a published post folder: it changes the post's URL. Ask first.
- `blog.qmd` is a Quarto listing page. Change its listing options only when asked.
