# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

No test suite is configured.

## Architecture

This is a React 19 + Vite single-page portfolio. Three.js and GSAP (including ScrollTrigger and ScrollToPlugin) are loaded via CDN `<script>` tags in `index.html` and accessed as `window.THREE`, `window.gsap`, etc. — they are **not** npm dependencies.

### Scroll-based animation pattern

The entire site uses a "scroll-height-holder" pattern: a `500vh` tall `<div>` creates scroll distance while a `position: fixed` `sticky-viewport` stays on screen. GSAP `ScrollTrigger` scrubs through a master timeline as the user scrolls, cross-fading between four stacked sections (`#sec-1` through `#sec-4`).

All animation logic — Three.js scene setup, the GSAP scroll timeline, nav highlighting, smooth-scroll on nav click, and the hover preview — lives in a single hook: `src/hooks/useScrollAnimations.js`. This hook is called once in `App.jsx` and runs after the first render (empty `useEffect` dependency array). The cleanup function in the hook handles React StrictMode's double-mount in dev.

### Three.js scene

Two 3D objects are managed directly inside `useScrollAnimations`:
- **Globe** (wireframe sphere) — visible on sections 1 and 4
- **Origami crane** (custom `BufferGeometry` wireframe) — visible on section 2

`ThreeCanvas.jsx` renders `null`; it only exists to document intent. The actual canvas element (`<canvas id="three-canvas">`) is placed in JSX by `App.jsx` and must be present in the DOM before the hook runs.

### Layout

`index.css` drives layout. The 3-column grid (`230px / 1fr / 100px`) named `.layout-grid` is reused by `Nav`, the canvas container, and all four sections. Sections are absolutely stacked on top of each other inside `.sections-stack`.

### Projects data

Project entries live as a plain array constant (`PROJECTS`) at the top of `src/sections/SectionProjects.jsx`. To add, remove, or reorder projects, edit that array. Project preview images are served from `/public/media/` and referenced as `/media/<filename>`.

### Nav scroll targets

Nav links use scroll-fraction targets defined in `useScrollAnimations.js` (the `targets` array: `[0, 0.35, 0.68, 1]`). If the scroll timeline durations change, these fractions may need adjustment.
