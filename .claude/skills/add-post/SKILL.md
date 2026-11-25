---
name: add-post
description: Create a new blog post folder posts/<YYYY-MM-DD-short-title>/index.qmd from the template, as a draft (draft true). Use when William asks to start, scaffold or add a blog post.
---

# Add a blog post

1. Read `MEMORY.md`, `.claude/rules/blog-posts.md` and `.claude/rules/writing-style.md`.
2. Get from William: title, date (default: today, confirm it), one-sentence description, categories,
   and the body text or outline. Don't write the argument of the post yourself. Scaffold with
   `TODO(William): ...` where content is missing.
3. Check `blog.qmd` exists. If not, **ask before creating it** (listing page; navbar label "Blog").
4. Create branch `update/add-post-<short-title>`.
5. Create `posts/<YYYY-MM-DD-short-title>/index.qmd` from [template.md](template.md).
   Keep `draft: true`. Only William switches it to `false` to publish.
6. Images: save in the post's folder and reference them relatively, with alt text.
7. **If the post contains R code**, tell William: "This post has R code. Render it locally
   (`quarto render posts/<folder>/index.qmd`) and commit `_freeze/posts/<folder>/` before the PR can pass."
   Don't try to produce R output yourself.
8. Verify: `quarto render` (or "UNVERIFIED — relying on the PR check"). Drafts don't appear on the live
   site. Check them with `quarto preview`.
9. Commit the files by name, push, open a PR titled "Add post (draft): <title>".
