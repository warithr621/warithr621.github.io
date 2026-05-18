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

The entire site lives in `index.html`. Styling is done with **Tailwind CSS loaded from CDN** (no local install). 
### Page structure

`index.html` has four anchor-linked sections rendered sequentially:

- `#about` — bio text + headshot (`images/warith.jpg`)
- `#experience` — grid of experience cards + writing/competition involvement list + link to `resume.pdf`
- `#projects` — 2×2 grid of project cards, each with a cover image (`images/`), tech tags, and GitHub link
- `#contact` — list of contact links

### Adding content

**New experience card:** Copy an existing `<div class="bg-white rounded-lg shadow-lg p-6 ...">` block inside the `#experience` grid and update the title, org, date range, and description. The comment `<!-- Experience Card 1 - ADD YOUR NEW EXPERIENCE HERE -->` marks the top of the grid.

**New project card:** Copy an existing card block inside the `#projects` grid. Place the cover image in `images/` and update the `src`, title, tech tags, description, and GitHub href.

**Resume:** Replace `resume.pdf` and update the "Last Updated" date in the anchor text at `index.html:129`.
