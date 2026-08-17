## ADDED Requirements

### Requirement: Per-sentence visual scenes in landing about section
The landing page about section SHALL display a distinct visual scene for each of the 16 sentences
and the 1 closing beat (17 screens total). Scenes SHALL be implemented as CSS
`animation-timeline: view()`-driven layers inside each `div.h-screen` sentence container,
positioned `absolute inset-0`.

#### Scenario: Each sentence has a scene
- **WHEN** a visitor scrolls through the landing page about section
- **THEN** each sentence's `h-screen` container displays its assigned visual scene as a full-bleed
  layer behind the text

#### Scenario: Text remains legible above scenes
- **WHEN** any scene is active
- **THEN** sentence text is rendered above the scene layer via `z-raised` (z-10) and is legible

#### Scenario: Reduced motion
- **WHEN** the visitor has `prefers-reduced-motion: reduce` set
- **THEN** scene animation classes are disabled and scenes display at their initial static state

---

### Requirement: Narrative arc -- above-ground to underwater to resurface
The visual sequence SHALL follow a three-act arc: above-ground (S1-S9), underwater (S10-S16),
resurface (closing beat).

#### Scenario: Above-ground sequence (S1-S9)
- **WHEN** the visitor scrolls through sentences 1 through 9
- **THEN** scenes depict an above-ground environment: sky/clouds, beaver landscape, dam interior,
  and a darkening night scene, matching the beaver copy

#### Scenario: Transition to underwater (S8-S9)
- **WHEN** the visitor scrolls through sentences 8 and 9
- **THEN** scene details fade away leaving only `bg-gradient-to-t from-beaver-dark via-beaver-dark to-beaver`,
  acting as a visual threshold before the underwater world begins

#### Scenario: Underwater sequence (S10-S16)
- **WHEN** the visitor scrolls through sentences 10 through 16
- **THEN** scenes display a continuous underwater gradient (`bg-gradient-to-t from-dusk via-water-dark to-water`)
  as the base, with per-sentence foreground elements (riverbed, swimming beavers, bubbles, light diffusion,
  breaching landscape)

#### Scenario: Resurface on closing beat
- **WHEN** the closing sentence ("The beaverhausen doesn't build itself.") is in view
- **THEN** a sun-rise animation plays and fades, revealing the `BeaverMark` component

---

### Requirement: Scene inventory -- full sentence mapping
The system SHALL assign the following scene to each sentence (1-based, matching copy order):

| # | Copy (truncated) | Scene description | Asset(s) |
|---|---|---|---|
| S1 | "Beavers are one of the only animals..." | Sky/clouds base layer; landscape + BeaverCopyBackground translates left (stops at 75% center); BeaverCopyForeground1 (beaver contemplating) fades in | `dawn-clouds-bg.svg` / `dusk-clouds-bg.svg` + `BeaverCopyBackground` + `BeaverCopyForeground1` |
| S2 | "They are nature's engineers..." | Same layers; CSS scale animation from 30% to 60% (zoom toward dam + beaver) | same |
| S3 | "They transform entire environments..." | BeaverCopyForeground2 (dam interior) fades in; BeaverCopyForeground1 fades out | `BeaverCopyBackground` + `BeaverCopyForeground2` |
| S4 | "They are also, by most accounts, a little feral." | BeaverCopyForeground3 (chewing beaver) fades in over existing background + foreground-2 | `BeaverCopyBackground` + `BeaverCopyForeground2` + `BeaverCopyForeground3` |
| S5 | "They work in the dark..." | Wood chip paths inside BeaverCopyForeground3 animate falling; same scene layer composition as S4 | same |
| S6 | "Their teeth are orange..." | Scene CSS-zooms to frame the beaver head at ~50% of the viewport; glimmer animation plays on tooth paths (baked as CSS `@keyframes` in SVG `<style>`) | `BeaverCopyForeground3` (zoomed) |
| S7 | "That detail feels important." | Same as S6, glimmer continues | same |
| S8 | "Beavers build things that outlast them." | Scene details fade away; `bg-gradient-to-t from-beaver-dark via-beaver-dark to-beaver` | CSS only |
| S9 | "That's the kind of work I'm interested in doing." | Same gradient holds | CSS only |
| S10 | "I am a designer and frontend engineer..." | Underwater begins on `bg-dusk`; `underwater-riverbed.svg` descends from top of screen, fixes at the bottom; riverbed grass animates subtly | `underwater-riverbed.svg` |
| S11 | "I think in systems and in pixels..." | Beaver alternating glide/pull swims from bottom-left, moves up ~half viewport height and right, exits screen | `beaver-swimming-glide.svg` + `beaver-swimming-pull.svg` |
| S12 | "I've led full rebrands..." | Riverbed translates down and exits bottom; continuous gradient naturally lightens as viewport scrolls up through it | CSS gradient (from wrapper) |
| S13 | "I prototype in Figma and in code." | Beaver alternating glide/pull swims from bottom-right, moves up ~half viewport height and left, exits screen | `beaver-swimming-glide.svg` + `beaver-swimming-pull.svg` |
| S14 | "I care too much about the feel of interactions..." | CSS circles (bubbles) rise from bottom of viewport to top | CSS only |
| S15 | "Some might call it gnawing." | Diffused light CSS overlay (radial gradient) simulating light streaming from above; beaver alternating glide/pull swims from bottom-left, moves up and right, exits screen | CSS + `beaver-swimming-glide.svg` + `beaver-swimming-pull.svg` |
| S16 | "I work best in small, focused teams..." | Landscape layers (background/midground/foreground) descend from top of screen to bottom and fix; above-water beaver alternating glide/pull enters from right to ~two-thirds screen width | `assets/landscape/background.svg` + `midground.svg` + `foreground.svg` + `assets/landing/beaver-swimming-above-*.svg` |
| Closing | "The beaverhausen doesn't build itself." | Sun-rise animation plays; sun fades; `BeaverMark` component fades in beneath it | `BeaverMark` component |

#### Scenario: Scene renders at correct sentence
- **WHEN** the visitor scrolls to sentence N
- **THEN** the scene assigned to sentence N is displayed as the full-bleed background layer

#### Scenario: Continuous underwater gradient covers S10-S16
- **WHEN** the visitor scrolls through sentences 10 through 16
- **THEN** the background reads as a single `bg-gradient-to-t from-dusk via-water-dark to-water` gradient
  that progresses visually as the visitor scrolls upward through it, without per-sentence background resets

---

### Requirement: Inline SVG components for animated landing assets
New SVG assets that require CSS animation targeting of internal element groups SHALL be delivered as inline
React components in `src/components/landing/`, following the same pattern as `BeaverLandmark.tsx` and
`FelledTreeLandmark.tsx`.

| Component | Source SVG | Used in |
|---|---|---|
| `BeaverCopyBackground` | `assets/landing/beaver-copy-background.svg` | S1-S9 base layer |
| `BeaverCopyForeground1` | `assets/landing/beaver-copy-foreground-1.svg` | S1-S2 (beaver contemplating) |
| `BeaverCopyForeground2` | `assets/landing/beaver-copy-foreground-2.svg` | S3 dam interior overlay |
| `BeaverCopyForeground3` | `assets/landing/beaver-copy-foreground-3.svg` | S4-S7 chewing beaver; contains wood chip group + tooth glimmer |

#### Scenario: Wood chip animation is externally targetable
- **WHEN** sentence 5 ("They work in the dark...") is in view
- **THEN** the wood chip path group inside `BeaverCopyForeground3` animates falling via a CSS class
  applied externally, not baked into the SVG

#### Scenario: Glimmer animation plays on zoom
- **WHEN** sentence 6 or 7 is in view and the beaver's head is framed at ~50% viewport fill
- **THEN** the tooth paths inside `BeaverCopyForeground3` display a glimmer effect driven by CSS
  `@keyframes` in the SVG's `<style>` block, without requiring a separate asset

---

### Requirement: Swimming beaver pattern for underwater and surface sequences
Swimming beaver sequences (S11, S13, S15, S16) SHALL alternate between two `<img>` elements
(glide and pull) to simulate swimming motion.

- Underwater: `assets/about/beaver-swimming-glide.svg` + `assets/about/beaver-swimming-pull.svg`
- Above-water (S16): `assets/landing/beaver-swimming-above-*.svg` (glide + pull variants)

Each pair SHALL use two absolutely positioned `<img>` elements with a CSS `steps(1)` keyframe
alternating their opacity on an asymmetric cycle: glide visible for ~60% of the cycle, pull for ~40%.

#### Scenario: Beaver swim cycle plays
- **WHEN** a swimming sequence sentence is in view
- **THEN** the beaver image alternates between glide and pull variants at a natural swimming cadence

#### Scenario: Beaver traverses the viewport
- **WHEN** the swim animation is active
- **THEN** the beaver enters from the designated screen edge, travels upward ~half the viewport height,
  and exits off the opposite edge, driven by a CSS `translateX`+`translateY` keyframe

---

### Requirement: `ScrollRevealText` scene extension
`ScrollRevealText` SHALL accept an optional `renderScene?: (lineIndex: number) => ReactNode` prop.
When provided, each sentence container SHALL render the scene as an `absolute inset-0 overflow-clip`
layer before the text content.

#### Scenario: `renderScene` not provided
- **WHEN** `ScrollRevealText` is rendered without a `renderScene` prop
- **THEN** behavior is identical to the current implementation (no regression)

#### Scenario: `renderScene` provided
- **WHEN** `ScrollRevealText` is rendered with `renderScene`
- **THEN** each `h-screen` div contains an `absolute inset-0` scene layer, and the text content
  div carries `relative z-raised`

---

### Requirement: Two-call `ScrollRevealText` structure in `About.tsx`
`About.tsx` SHALL render the above-ground and underwater sentences as two separate `ScrollRevealText`
calls. The underwater call SHALL be wrapped in a `div` with
`bg-gradient-to-t from-dusk via-water-dark to-water`, providing the continuous background gradient
for S10-S16 as a single inherited layer.

#### Scenario: Above-ground sentences render without gradient
- **WHEN** the visitor is in the beaver copy section (S1-S9)
- **THEN** no underwater gradient is applied; scene backgrounds are driven by `renderScene` alone

#### Scenario: Underwater sentences inherit the gradient
- **WHEN** the visitor is in the professional copy section (S10-S16)
- **THEN** each `h-screen` sentence container has a transparent or foreground-only `renderScene`,
  and the gradient wrapper provides the base background color

---

### Requirement: New CSS scene animation classes
`scroll-reveal.css` SHALL define all new scene animation classes at the top level (not inside
`@layer` blocks), per the polyfill constraint.

Classes required:
- `.scene-fade`: opacity 0->1->0, `animation-timeline: view()` (standard per-sentence fade)
- `.scene-translate-in-left`: landscape + foreground translates left from off-screen, `view()`
- `.scene-scale-zoom`: CSS scale from 30% to 60% on the scene layer, `view()`
- `.scene-riverbed-descend`: `underwater-riverbed.svg` translateY from top to fixed-at-bottom, `view()`
- `.scene-riverbed-exit`: riverbed translateY to below viewport, `view()`
- `.scene-beaver-swim-left`: beaver traverses left-to-right path, `view()`
- `.scene-beaver-swim-right`: beaver traverses right-to-left path, `view()`
- `.scene-bubble-rise`: CSS circles rise from bottom to top, `view()`
- `.scene-light-diffuse`: radial gradient overlay fades in, `view()`
- `.scene-landscape-descend`: landscape layers translate from top, fix at bottom, `view()`
- `.wood-chip-fall`: targets wood chip group in `BeaverCopyForeground3`, falls with gravity, reusable
  (will also be used in a future `PortfolioParallax` update -- defined in `index.css`, not
  `scroll-reveal.css`)

#### Scenario: Polyfill compatibility
- **WHEN** the scroll-timeline polyfill is active
- **THEN** all scene classes animate correctly because they are declared at the top level of their
  respective CSS files
