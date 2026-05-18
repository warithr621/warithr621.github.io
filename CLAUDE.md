# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal portfolio website for Warith Rahman, deployed via GitHub Pages at `warithr621.github.io`. There is no build step, no package manager, and no framework — just `index.html` and static assets.

## Developing

Open `index.html` directly in a browser, or use any static file server:

```bash
python3 -m http.server
```

## Architecture

The entire site lives in `index.html`. Styling is **pure CSS with CSS custom properties** — no Tailwind, no external CSS framework. Font is `Nunito` loaded from Google Fonts CDN.

### Design system (CSS variables)

Defined at `:root`:

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#10082a` | Page background (deep violet) |
| `--surface` | `rgba(255,255,255,0.06)` | Glass card fill |
| `--border` | `rgba(196,181,253,0.15)` | Card border (resting) |
| `--border-h` | `rgba(196,181,253,0.35)` | Card border (hover) |
| `--purple` | `#c4b5fd` | Primary accent |
| `--purple-vivid` | `#a855f7` | Gradient start (buttons, nav CTA) |
| `--pink` | `#f9a8d4` | Secondary accent |
| `--pink-vivid` | `#ec4899` | Gradient end (buttons, nav CTA) |
| `--text` | `#f0e8ff` | Body text |
| `--muted` | `#9d8fbd` | Secondary / description text |

### Visual effects

- **Stars** — JS generates 120 `<span class="star">` elements inside `.stars` (fixed, z-index 0). Each has randomised `--d` (duration) and `--op` (opacity) CSS vars, driven by a `twinkle` keyframe animation.
- **Glow blobs** — `.blobs` holds 4 fixed `<div class="b b1/b2/b3/b4">` circles with `radial-gradient` fills and `blur(80px)`. They drift via `glow1/glow2/glow3` keyframe animations (14–22 s loops).
- **Scroll reveal** — Elements with class `fade` start at `opacity:0; translateY(22px)`. An `IntersectionObserver` adds class `show` when they enter the viewport, triggering a CSS transition.

### Page structure

`index.html` has four anchor-linked sections rendered sequentially:

- `#about` — hero name, chips, bio text, headshot (`images/warith.jpg`)
- `#experience` — `.exp-grid` of `.exp-card` elements + `.writing-card` sidebar + resume button
- `#projects` — `.proj-grid` (2-col) of `.proj-card` elements, each with a cover image
- `#contact` — `.ct-grid` (4-col single row) of `.ct-card` elements

### Component patterns

**Glass card** (`.card`):
```html
<div class="card fade">…content…</div>
```
Base styles: `background: var(--surface)`, `backdrop-filter: blur(16px)`, `border-radius: 24px`. Hover lifts the card with `translateY(-6px)`.

**Section header**:
```html
<span class="sec-label"><span class="dot"></span> SECTION NAME</span>
<h2>Heading <span class="grad">gradient word</span></h2>
```

**Experience card** (`.exp-card.card`):
```html
<div class="exp-card card fade">
  <div class="exp-top">
    <h3>Role Title</h3>
    <span class="date-chip">Month YYYY – Month YYYY</span>
  </div>
  <div class="org">Organization Name</div>
  <p>Description text.</p>
</div>
```
The `.exp-grid` uses `grid-template-columns: repeat(auto-fill, minmax(245px, 1fr))`.

**Project card** (`.proj-card.card`):
```html
<div class="proj-card card fade">
  <div class="proj-img-wrap">
    <img src="images/your-image.png" alt="…">
    <div class="proj-img-overlay"></div>
  </div>
  <div class="proj-body">
    <h3>Project Name</h3>
    <div class="proj-tags">
      <span class="proj-tag">Tech</span>
    </div>
    <p>Description.</p>
    <a href="https://github.com/…" class="proj-link" target="_blank">
      GitHub ↗
    </a>
  </div>
</div>
```
The `.proj-grid` uses `grid-template-columns: 1fr 1fr`.

**Contact card** (`.ct-card.card`):
The `.ct-grid` is `repeat(4, 1fr)` — one row of four cards. Each card has a `.ct-key` label and an `<a>` link. The four cards are colour-coded via `nth-child` selectors.

### Responsive breakpoints

| Breakpoint | Key changes |
|---|---|
| `≤768px` (tablet) | Nav collapses to logo + GitHub button only; hero goes single-col; `.proj-grid` → 1 col; `.ct-grid` → 2 col |
| `≤480px` (mobile) | `.exp-grid` and `.ct-grid` → 1 col; tighter section padding; `.btn` goes full-width; `.exp-top` wraps so date chip doesn't clip |

### Adding content

**New experience card:** Copy an existing `.exp-card` block inside `#experience > .container > .exp-grid` and update the role, org, date chip, and description.

**New project card:** Copy an existing `.proj-card` block inside `.proj-grid`. Place the cover image in `images/` and update `src`, title, tags, description, and GitHub href.

**Resume:** Replace `resume.pdf` at the repo root and update the "Last Updated" date in the `.resume-wrap` anchor text inside `#experience`.
