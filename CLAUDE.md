# CLAUDE.md

Context for working on this repository.

## What this is

Personal blog for Nate Veldkamp, served at **https://nateveldkamp.github.io**.
Built with **Jekyll** (via the `github-pages` gem) and deployed with **GitHub Pages**.
The design is a custom, hand-written theme — no third-party Jekyll theme is used
(the `github-pages` gem silently defaults `theme` to `jekyll-theme-primer`, but our
own `_layouts/` and `assets/css/style.css` override it; source files take precedence
over theme files, so primer never actually surfaces).

## Deployment

- GitHub Pages builds and serves from the **`main`** branch. Pushing to `main` makes
  changes live in ~1–2 minutes. There is no separate Actions workflow.
- The repo must be **public** for Pages on the free plan (Pro/Team/Enterprise can serve
  Pages from a private repo).
- No `CNAME` file — the site uses the default `nateveldkamp.github.io` domain. Add a
  `CNAME` only if a custom domain is configured.

## Local development

Ruby + Bundler are expected. Install deps once with `bundle install`.

**Critical gotcha — locale.** Builds fail with `Invalid US-ASCII character "\xE2"` unless
the locale is UTF-8. This comes from the bundled primer theme's SCSS, not our files.
Always prefix Jekyll commands with a UTF-8 locale:

```bash
LANG=C.UTF-8 LC_ALL=C.UTF-8 bundle exec jekyll serve   # http://localhost:4000
```

If `bundle exec jekyll` reports `command not found: jekyll` (a binstub quirk seen in some
sandboxes), invoke the gem binary directly:

```bash
JEKYLL_BIN=$(bundle show jekyll)/exe/jekyll
LANG=C.UTF-8 LC_ALL=C.UTF-8 bundle exec ruby "$JEKYLL_BIN" build
```

GitHub Pages' own build servers are UTF-8, so the deployed build is unaffected by this.

## Layout

```
_config.yml                 site config (title, author, permalink: /:year/:month/:day/:title/)
_layouts/default.html       base layout: <head>, header/nav, footer, conditional D3 loading
_layouts/post.html          post layout (title + date + content), wraps default
index.html                  home page — list of all posts
about.md                    about page
_posts/                     blog posts, named YYYY-MM-DD-title.md
_includes/chart.html        reusable chart-section scaffold (see Charts below)
assets/css/style.css        site theme: design tokens + all page styling
assets/css/chart.css        chart card / axis / legend / tooltip styling (loaded only when needed)
assets/js/chart-theme.js    shared D3 helpers exposed as window.ChartTheme
```

Build output (`_site/`) and caches are git-ignored.

## Design system

The visual style fuses the Anthropic research blog (warm cream background, serif
headlines, terracotta accent) with the OpenAI blog (clean sans body, minimal layout).
All tokens live in `:root` in `assets/css/style.css` — change them there, not inline:

- Background `#faf9f5`, surface `#f3eee2`, text `#141413`, muted `#7c7c74`, border `#e7e2d6`
- Accent (links/hover) terracotta `#d47f2a` (dark `#b3641a`, visited `#8a5a2a`)
- Fonts (Google Fonts, loaded in `_layouts/default.html`): **Newsreader** serif for
  headings/titles, **Inter** sans for body. `--font-mono` is a system stack.
- Reading column is `max-width: 680px`.

Keep the design minimal and editorial. Reuse existing tokens and classes rather than
adding new colors/fonts.

## Writing a post

Create `_posts/YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title: "Post Title"
date: 2026-05-27
---

Body in Markdown.
```

Posts dated in the future are not built unless `--future` is passed, so use a current
or past date when you want a post to appear locally.

## Charts (interactive D3)

Charts share one look via a small system. To add a chart to a post:

1. Add `d3: true` to the post front matter. This is what conditionally loads D3 (from the
   jsDelivr CDN), `assets/css/chart.css`, and `assets/js/chart-theme.js` — nothing loads on
   posts without it.
2. Insert a chart section:
   `{% include chart.html id="my-chart" title="..." caption="..." %}`
   It renders a titled card with a `<div class="chart-plot" data-chart="my-chart">` mount point.
3. Draw into it with a `<script>` wrapped in `DOMContentLoaded` (D3 and ChartTheme load
   deferred, so they're ready by then), targeting `[data-chart="my-chart"]`.

`window.ChartTheme` (defined in `assets/js/chart-theme.js`) provides the shared look:

- `palette` — categorical series colors (terracotta + warm neutrals)
- `text` / `muted` / `border` / `accent` — color tokens read from the CSS variables
- `responsiveSvg(container, {width, height, margin})` — returns `{svg, g, innerWidth, innerHeight, width, height, margin}` (SVG scales via `viewBox`)
- `yGrid(g, yScale, innerWidth, ticks)` — light horizontal gridlines
- `tooltip()` — singleton tooltip with `show(html, event) / move(event) / hide()`
- `legend(svg, [{label, color}], {x, y})` — swatch + label legend

`_posts/2026-05-27-interactive-charts.md` is a complete, working grouped-bar-chart
reference — copy its pattern. Each chart keeps its own draw code (full flexibility);
the theme keeps them visually consistent. When a chart type recurs, promote the common
parts into a new `ChartTheme` helper so posts stay short.

## Git workflow

- Develop on the assigned feature branch (e.g. `claude/...`); do not push to `main`
  without explicit instruction. Getting changes onto `main` is what deploys them live.
- Standard commits; no PR unless asked.

## Verifying changes

- Build/serve locally with the UTF-8-prefixed command above and check the home page, a
  post, the about page, and any chart in a browser.
- No automated test suite. JS can be syntax-checked with `node --check <file.js>`.
- This environment has no browser and cannot reach the D3 CDN, so chart rendering must be
  confirmed via local `jekyll serve` or after deploy — a successful build does not prove a
  chart draws.
```
