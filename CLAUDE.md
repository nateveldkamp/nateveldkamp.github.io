# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog for Nate Veldkamp at **https://nateveldkamp.github.io**, built with Jekyll (`github-pages` gem) and deployed via GitHub Pages from the `main` branch. Custom hand-written theme — `_layouts/` and `assets/css/style.css` override the gem's default primer theme entirely.

## Commands

```bash
# Install deps (once)
bundle install

# Serve locally — http://localhost:4000
LANG=C.UTF-8 LC_ALL=C.UTF-8 bundle exec jekyll serve

# Build only
LANG=C.UTF-8 LC_ALL=C.UTF-8 bundle exec jekyll build

# Syntax-check a JS file
node --check assets/js/chart-theme.js
```

**Locale is required.** Omitting `LANG=C.UTF-8 LC_ALL=C.UTF-8` causes `Invalid US-ASCII character "\xE2"` from the primer SCSS. GitHub Pages' servers are UTF-8, so deployed builds are unaffected.

**If `jekyll` is not found** (binstub quirk in some sandboxes):
```bash
JEKYLL_BIN=$(bundle show jekyll)/exe/jekyll
LANG=C.UTF-8 LC_ALL=C.UTF-8 bundle exec ruby "$JEKYLL_BIN" build
```

Posts dated in the future are excluded from builds unless `--future` is passed.

## Architecture

`_layouts/default.html` is the root layout. It conditionally loads D3, `chart.css`, and `chart-theme.js` when a page has `d3: true` in front matter — nothing chart-related loads otherwise. `_layouts/post.html` wraps `default`.

`index.html` loops `site.posts` to render the home page list. `_config.yml` sets `permalink: /:year/:month/:day/:title/` and `paginate: 10`.

## Design system

All tokens are CSS variables in `:root` in `assets/css/style.css` — edit there, not inline:

- Background `#faf9f5`, surface `#f3eee2`, text `#141413`, muted `#7c7c74`, border `#e7e2d6`
- Accent terracotta `#d47f2a` (dark `#b3641a`, visited `#8a5a2a`)
- Fonts: **Newsreader** serif (headings/titles), **Inter** sans (body), loaded from Google Fonts in `default.html`
- Reading column `max-width: 680px`

Keep the design minimal. Reuse existing tokens rather than adding new colors or fonts.

## Writing a post

Create `_posts/YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title: "Post Title"
date: 2025-01-01
---

Body in Markdown.
```

## Charts (interactive D3)

To add a chart to a post:

1. Add `d3: true` to front matter — this is what loads D3 from jsDelivr CDN, `chart.css`, and `chart-theme.js`.
2. Insert the include: `{% include chart.html id="my-chart" title="..." caption="..." %}`  
   Renders a `<figure>` with a `<div class="chart-plot" data-chart="my-chart">` mount point.
3. Draw inside a `<script>` wrapped in `DOMContentLoaded` — D3 and ChartTheme load deferred, so they're ready by then.

`window.ChartTheme` (in `assets/js/chart-theme.js`) provides:

- `palette` — categorical series colors (terracotta + warm neutrals)
- `text` / `muted` / `border` / `accent` — CSS variable tokens
- `responsiveSvg(container, {width, height, margin})` → `{svg, g, innerWidth, innerHeight, width, height, margin}`
- `yGrid(g, yScale, innerWidth, ticks)` — light horizontal gridlines
- `tooltip()` → singleton `{show(html, event), move(event), hide()}`
- `legend(svg, [{label, color}], {x, y})` — swatch + label legend

`_posts/2026-05-27-interactive-charts.md` is the reference implementation (grouped bar chart with error bars, tooltip, and legend) — copy its pattern for new charts.

This environment has no browser and cannot reach the D3 CDN, so chart rendering must be confirmed via `jekyll serve` or after deploy — a successful build does not prove a chart draws.

## Git workflow

- Develop on the assigned feature branch (`claude/…`); do not push to `main` without explicit instruction — pushing to `main` deploys live.
- No PR unless asked.
