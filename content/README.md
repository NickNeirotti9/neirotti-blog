# Writing content

Every blog post is one file in `content/posts/`, and every portfolio item is one
file in `content/portfolio/`. A file is a short header (the details shown on
cards and at the top of the page) followed by the body text in Markdown with a
few extras.

The easiest way to write or change a post is the editor:

```bash
npm start
```

then open <http://localhost:3000/editor>. It looks and behaves like the live
article, validates everything as you type, and **Save to site** writes the file
into `content/` for you. The site reloads on its own. Nothing about the editor
is included in the published website.

If you prefer, edit the `.md` files directly in any text editor; the site
picks up changes while `npm start` is running.

## Publishing

- `npm start` and `npm run build` both convert `content/` into the data the site
  reads (`src/generated/`, not committed). Run `npm run content` to do it by hand.
- A post with `draft: true` is shown while developing (with a red "Draft" badge)
  but left out of the production build. New posts made in the editor start as
  drafts; untick **Draft** when the post is ready.
- If a file has a problem (missing field, unknown category, duplicate id, a
  related post that does not exist...) the build prints exactly what to fix.
  While developing the broken file is skipped; a production build stops.
- Commit `content/` with the rest of the project and deploy as before.

## Post header

```yaml
---
id: 9
title: 'Why Sleep Matters'
date: '2025-11-02T15:30:00Z'      # or just 2025-11-02
subcategory: Lifestyle            # one of the subcategories in src/data/categories.json
subject: Habits                   # free text, shown after the subcategory
youtube: dQw4w9WgXcQ              # the 11-character video id
spotify: https://open.spotify.com/episode/...   # optional
hook: One line shown on the post card
featured: false                   # true = shown in "Featured" on the home page
draft: true                       # remove (or false) to publish
related: [3, 5]                   # ids of posts for "You Might Like"
takeaways:                        # optional "Key Takeaways" section
  - Short point
quotes:                           # optional "Quotes I Like" section
  - A quote
resources:                        # optional "Resources & References" section
  - title: Source name
    url: https://example.com
    description: Optional one-liner
---
```

Portfolio items use `slug`, `title`, `youtube` or `image` (a file name in
`src/assets/images`), `dateFrom`, `dateTo` (leave out while ongoing),
`description`, and optionally `takeaways` and `resources`.

## Body format

Standard Markdown, plus a few extras the site has always had.

| You write | You get |
| --- | --- |
| `## Title` | a chapter (numbered 1, 2, 3 in the table of contents) |
| `### Title` | a section (1.1, 1.2 ...) |
| `#### Title` | a subsection (1.1.1 ...) |
| a blank line | a new paragraph |
| a tab at the start of a paragraph | first-line indent |
| `**bold**`, `*italic*`, `__underline__` | **bold**, *italic*, underline |
| `~sub~`, `^sup^` | CO~2~, x^2^ (no spaces inside) |
| `` `code` `` | inline code |
| `[text](https://...)` | a link (other sites open in a new tab) |
| `![caption](/images/posts/photo.png)` | an image (the editor uploads into `public/images/posts/`) |
| `- item` / `1. item` | bulleted / numbered list |
| `> text` | block quote |
| `---` | horizontal rule |
| `::: center` ... `:::` (on their own lines) | centered block |
| `$$ ... $$` and `$x^2$` | display and inline equations (LaTeX via KaTeX) |
| `\|` tables with a `\| --- \|` row under the header | table (use `<br>` for a line break inside a cell) |

Raw HTML such as `<br>` is allowed as an escape hatch but is never needed.

Headings are numbered automatically, so write `### Warm-Up`, not `### 1.2 Warm-Up`.
