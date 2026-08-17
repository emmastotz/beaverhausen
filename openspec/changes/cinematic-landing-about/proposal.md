## Why

The landing page's about section delivers copy one sentence per screenful via CSS scroll-driven animation, but
the backgrounds are plain cream. The section is a significant time commitment for a first-time visitor; adding
per-sentence visual scenes makes the experience more immersive and justifies the scroll depth.

## What Changes

- The `about` section of the landing page gains a full visual scene system: each of the 13 sentences and the
  closing beat has a distinct background illustration or color environment.
- The journey moves above-ground (hero landscape) -> descent to earth (beaver story) -> underwater
  (professional story) -> breach the surface (closing).
- `ScrollRevealText` gains an optional `renderScene` prop so callers can supply a per-line backdrop.
- 3 new SVG assets are created in `src/assets/landing/`; 1 existing portfolio asset is reused for two scenes;
  the closing uses the already-fixed `ParallaxLandscape` revealed by removing the scene backdrop.
- `src/components/landing/About.tsx` gains scene definitions wired to each sentence index.

## Capabilities

### New Capabilities

- `landing-about-scenes`: Per-sentence visual scene system for the landing page about section, including asset
  placement, CSS animation classes, the `renderScene` extension to `ScrollRevealText`, and the scene
  definitions in `About.tsx`.

### Modified Capabilities

<!-- none -->

## Impact

- `src/components/landing/ScrollRevealText.tsx`: new optional `renderScene` prop + absolute scene layer inside
  each `h-screen` div.
- `src/components/landing/About.tsx`: imports 3 new SVGs + 1 existing portfolio SVG; adds 14 scene
  definitions.
- `src/components/landing/scroll-reveal.css`: new utility classes for scene fade-in/out and S8-S13 gradient
  shift.
- `src/assets/landing/` (new directory): `beaver-at-dam.svg`, `dam-interior.svg`, `night-beaver-felled.svg`.
- No new dependencies. No routing changes. No breaking changes to existing pages.
