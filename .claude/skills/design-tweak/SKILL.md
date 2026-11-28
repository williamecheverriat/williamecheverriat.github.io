---
name: design-tweak
description: Change the site's look (colours, fonts, sizes, spacing, layout, buttons, navbar) in styles.scss or the _quarto.yml theme only, with before/after screenshots at desktop and phone widths so that only the intended element changes. Use whenever William asks for a visual or design change.
---

# Design tweak

Styling only. No content changes, no inline styles. Only the element William asked about may change
(`[LEARN:design]`).

1. Read `MEMORY.md` (especially `[LEARN:design]`), `.claude/rules/site-config.md` and
   `.claude/rules/writing-style.md`. Read `styles.scss` and the `format.html` block of `_quarto.yml`.
2. **Ask** which element(s) to change and how (for example "navbar links: larger and darker").
   If William gives a reference (a screenshot or a site), describe in words what you will take from it,
   such as the colour values, the font style, the spacing rhythm or the button shape. Also say what you won't copy:
   logos, brand assets, text or whole layouts.
3. **Bigger changes** (more than one element, a palette, a font family, the layout or the navbar): propose
   **two options in words** before editing. Give hex colours, font names (and whether they are system fonts or a
   web-font download), sizes in rem/px, and contrast ratios. **Wait for William's choice.**
4. Create branch `update/design-<short-description>` from an up-to-date `main`. List the files you will change
   and the **affected pages**:
   - Global changes (theme variables, fonts, headings, links, buttons, navbar, footer) affect **all pages**:
     `index, research, talks, teaching, cv, blog`, plus any post under `posts/`.
   - A change to one class (for example `.profile-*`, `.entry-*`, `.cv-*`) affects only the pages that use it.
     Check with `grep -rn "<class>" --include=*.qmd .`
5. **Before screenshots.** Run `quarto render`, then:
   `node .claude/skills/design-tweak/screenshot.mjs --out <scratchpad>/design/before --pages <affected pages>`
   It saves `<page>-1280.png` (desktop) and `<page>-390.png` (phone) and prints each page's height.
   Screenshots stay in the scratchpad and are never committed. The script needs Node 22+ and Edge, Chrome or
   Chromium.
   - **No browser available** (for example in a cloud session started from William's phone), the script exits
     with code 2 and prints `SCREENSHOTS SKIPPED`, or `node` itself is missing. **Don't stop and don't treat
     this as a failure.** Skip all screenshot steps (5, 8 and the screenshot part of 9), carry on with the edit,
     and mark the work **"VISUALLY UNVERIFIED — check in quarto preview before merging"**. Write that exact line
     in your messages to William and at the top of the PR body. All other checks still apply: contrast ratios
     from the hex values, no inline styles, and `quarto render` (or "UNVERIFIED — relying on the PR check").
   - Any **other** error (exit code 1, for example a missing page or `_site` not rendered) is a real problem:
     fix it, don't skip it.
6. **Edit only**:
   - `styles.scss`: Bootstrap/Quarto variables go under `/*-- scss:defaults --*/` and CSS rules go under
     `/*-- scss:rules --*/`. Keep both markers. Reuse existing variables (`$primary`, `$text-muted`, ...)
     instead of repeating hex values, and add a short comment saying what the rule is for.
   - Theme settings under `format.html` in `_quarto.yml` (for example `theme`, `mainfont`, `fontsize`,
     `linestretch`). Nothing else in that file.
   - **Never** use `style="..."` attributes, `{style="..."}` on Markdown elements, `<style>` blocks, or
     `include-in-header` CSS. Never change page text, links or front matter. If a change seems to need a new
     class in a `.qmd`, **ask William first**.
   - New web fonts: prefer system fonts. A Google Fonts or other external font is a privacy and speed trade-off,
     so propose it only as an option in step 3, and note that `$web-font-path: false` currently blocks downloads.
7. **Accessibility and mobile** (must hold after the change):
   - Text contrast at least **4.5:1**, or **3:1** for large text (24px or more, or 19px bold or more), borders of
     buttons and inputs, icons and focus outlines. Check every changed colour against its background with:
     `node -e "const L=h=>{const c=h.replace('#','').match(/../g).map(x=>{x=parseInt(x,16)/255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};const [a,b]=process.argv.slice(1).map(L);console.log(((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2)+':1')" "#2f4f7f" "#ffffff"`
     (6-digit hex only). Remember the hover state too (for example white text on a `$primary` button).
   - Body text at least 1rem (16px); line height at least 1.5; keep line length around 60 to 80 characters.
   - Keep visible focus outlines and keep links distinguishable from body text.
   - Tap targets (buttons, navbar links and icons) at least 24×24px, ideally 44px tall on phones.
   - No horizontal scrolling at 390px (the script prints `WARNING: horizontal overflow`). The navbar must still
     collapse into the menu button on phones.
8. **After screenshots.** Run `quarto render` again, then run the same command with `--out <scratchpad>/design/after`.
   Open each before/after pair with the Read tool at **both** widths and compare them:
   - The intended element changed as agreed.
   - **Nothing else changed**: other text, spacing, navbar, buttons, line breaks and image sizes are the same.
     A changed page height is a red flag unless the change explains it.
   - Known noise: on the CV page, the browser's PDF viewer inside the embed frame can load at a different
     zoom or scroll position from run to run. Ignore differences **inside** that frame, but not to the frame itself.
   - Fix any unintended change before going on, or report it to William if it can't be avoided.
9. Run the **`design-reviewer`** agent on the branch. Pass it the intended change, the affected pages and both
   screenshot folders (or say that screenshots were skipped, so it reviews the diff only). Fix blockers.
   Report warnings to William.
10. Tell William **what to check in `quarto preview`**: which pages, hover and focus states (Tab through the
    links), the collapsed navbar menu on a phone, and the page at phone width (browser DevTools → device toolbar
    → 390px wide, or simply a narrow window).
11. Verify that `quarto render` succeeds (or "UNVERIFIED — relying on the PR check"). Commit the changed files
    **by name**, push, and open a PR titled "Design: <short description>". The body has:
    - What changed and why, with **old → new values** (hex, font, size, spacing).
    - Contrast ratios for any changed colours.
    - **Before/after notes**: each page × width compared, what differs, and confirmation that nothing else changed
      (page heights before → after where they differ).
    - The design-reviewer verdict, verification status and what William should check in `quarto preview`.
    - If screenshots were skipped: **"VISUALLY UNVERIFIED — check in quarto preview before merging"** as the
      first line, in place of the before/after notes, plus a short list of what to look at on which pages.
