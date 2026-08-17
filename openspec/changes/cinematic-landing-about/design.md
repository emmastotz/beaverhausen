## Context

The landing page about section renders 16 sentences + 1 closing beat (17 screens), each in its own
`div.h-screen` via `ScrollRevealText`. Text opacity is driven by `animation-timeline: view()` in
`scroll-reveal.css`. Backgrounds are currently transparent, showing the cream `DefaultLayout` beneath.

The `ParallaxLandscape` (hero landscape) is `position: fixed` behind all page content. The about page's
`StaticAbout` establishes the underwater visual language (water gradient, riverbed, swimming beavers)
this change brings to the landing.

## Goals / Non-Goals

**Goals:**
- 17 screens (16 sentences + closing) each have a distinct visual scene.
- Three-act arc: above-ground (S1-S9) -> underwater (S10-S16) -> closing beat (sun + BeaverMark).
- CSS only -- no GSAP for scenes.
- All `animation-timeline` classes top-level in their CSS files (polyfill constraint).
- Zero new npm dependencies.

**Non-Goals:**
- Moving `src/assets/landscape/` into `src/assets/landing/` (separate change).
- Modifying `StaticAbout` or the portfolio parallax.
- Dark mode scene variants (deferred).

## Decisions

### D1: Extend `ScrollRevealText` with `renderScene`

`ScrollRevealText` is only consumed by `About.tsx`. Adding `renderScene?: (i: number) => ReactNode`
adds ~6 lines. Each `h-screen` div gains an `absolute inset-0 overflow-clip` scene layer; the text
div gains `relative z-raised`.

```tsx
// before
<div className="flex h-screen w-full items-center justify-center">
  <div className="mx-auto ..."><span className="... reveal">...</span></div>
</div>

// after
<div className="relative flex h-screen w-full items-center justify-center">
  {scene && <div className="absolute inset-0 overflow-clip">{scene}</div>}
  <div className="relative z-raised mx-auto ..."><span className="... reveal">...</span></div>
</div>
```

### D2: Two `ScrollRevealText` calls in `About.tsx`; `composeScrollSections` removed

Splitting into two calls (beaver sentences S0-S8, professional sentences S9-S15) makes the underwater
gradient wrapper possible without hardcoded scroll offsets. `composeScrollSections` is removed -- the
two sections become independent with local scene indices (0-8 and 0-6 respectively).

```tsx
// Beaver sentences (S0-S8) -- no gradient wrapper
<ScrollRevealText lines={BEAVER_LINES} renderScene={renderBeaverScene} ... />

// Professional sentences (S9-S15) -- gradient provides the underwater base
<div className="bg-gradient-to-t from-dusk via-water-dark to-water">
  <ScrollRevealText lines={PROFESSIONAL_LINES} renderScene={renderUnderwaterScene} ... />
</div>
```

The gradient wrapper div's height is naturally `7 × 100svh` (7 `h-screen` children). As the visitor
scrolls upward through it, the viewport moves from the dusk base toward the water top -- literally
surfacing through the gradient without any JS or scroll-driven logic on the gradient itself.

### D3: Inline SVG components for animated assets; `<img>` for swimmers

Assets requiring CSS targeting of internal SVG element groups (wood chips, teeth glimmer) are delivered
as inline React components in `src/components/landing/`, following the `BeaverLandmark.tsx` pattern.
This gives full access to path IDs for `@keyframes` targeting and avoids the `<img>` animation
restriction.

| Component | Animated internals |
|---|---|
| `BeaverCopyBackground` | none (static) |
| `BeaverCopyForeground1` | none (fades in/out via scene class) |
| `BeaverCopyForeground2` | none (fades in via scene class) |
| `BeaverCopyForeground3` | wood chip group (`.wood-chip-fall`); tooth paths (glimmer `@keyframes` in SVG `<style>`) |

Swimming beavers use two overlapping `<img>` elements -- one for glide, one for pull -- because the
alternation is driven by toggling opacity between two loaded images. Preloading is automatic with
`<img>` and avoids the FOIT risk of `background-image` switching.

Glide/pull cycle uses an asymmetric keyframe: glide visible ~60% of the cycle, pull ~40%, matching
the natural rhythm of actual beaver swimming.

### D4: S1 sky/clouds base layer

S1-S9 scenes sit on top of `dawn-clouds-bg.svg` (light mode) / `dusk-clouds-bg.svg` (dark mode),
mirroring the layering pattern of the hero `ParallaxLandscape` and `StaticAbout`. The cloud SVGs are
existing URL imports used as CSS background images; `BeaverCopyBackground` overlays them as a
positioned element.

### D5: S1 translate, S2 zoom -- CSS animation-range

S1 uses a `translateX` animation on `BeaverCopyBackground` + `BeaverCopyForeground1` that stops when
75% of the landscape reaches the horizontal center of the screen. This is an `animation-range` concern:
the keyframe ends at the target position and `animation-fill-mode: forwards` holds it there.

S2 applies a CSS `scale` animation to the scene layer (30% -> 60%), zooming the entire composed scene
toward the dam and beaver.

### D6: S6-S7 zoom and glimmer -- no new asset

S6-S7 reuse `BeaverCopyForeground3` (the full chewing-beaver inline component) with a CSS `scale` +
`translate` applied to the scene container to frame the beaver's head at ~50% of the viewport. The
exact `transform-origin` and translate values require in-browser tuning against the authored SVG.

The glimmer is baked as CSS `@keyframes` inside `BeaverCopyForeground3`'s SVG `<style>` block,
targeting the tooth path group. Using CSS `@keyframes` in the SVG `<style>` (not SMIL `<animate>`)
ensures the animation plays correctly when the component is rendered inline in the DOM.

### D7: Underwater gradient is a wrapper div, not per-sentence backgrounds

Replacing the original per-sentence stepped backgrounds with a single wrapper div eliminates
6 redundant background declarations and produces the correct "scrolling through the gradient" effect
naturally: the viewport moves from dusk (bottom) to water (top) as the visitor scrolls through the
7 professional sentences.

### D8: S16 landscape descent + above-water beaver

S16 uses the existing `assets/landscape/` layers (background, midground, foreground) which are
currently the hero's `ParallaxLandscape` source. They animate from `translateY(-100%)` to
`translateY(0)` (descending from above) and fix when the bottom edge reaches the screen bottom.
This reuses the same above-ground visual world as the hero, completing the circle.

The above-water beaver (`assets/landing/beaver-swimming-above-*.svg`, glide + pull) enters from the
right at the waterline level and travels to ~two-thirds screen width.

### D9: `.wood-chip-fall` in `index.css`, not `scroll-reveal.css`

The wood chip fall animation targets a named group inside `BeaverCopyForeground3`. It is defined in
`index.css` (not `scroll-reveal.css`) because it will also be reused in a future `PortfolioParallax`
update and belongs in shared styles.

### D10: Closing beat -- sun + BeaverMark

The closing beat (after the main sentence scroll) adds a sun-rise CSS animation element in the existing
closing section of `About.tsx`. The sun rises, fades, and the `BeaverMark` component (already present,
currently fading in on `isScrollComplete`) appears beneath it. Existing CTAs (download resume,
"Continue the journey") are unchanged.

## Risks / Trade-offs

- [Asset dependency] Inline SVG components (BeaverCopyForeground3 in particular) cannot be implemented
  until the SVG is authored. CSS/component tasks can land first; scene wiring waits on assets.
- [S6-S7 zoom framing] `transform-origin` and translate values for the 50% head zoom require
  in-browser tuning against the actual SVG geometry.
- [Text legibility on dark scenes] S4-S9 (dark/night) and S10-S16 (underwater/dusk) backgrounds
  require contrast verification for sentence text. Professional sentences likely need `text-cream`
  against the dark underwater gradient.
- [Polyfill] All new `animation-timeline` classes must be top-level. `.wood-chip-fall` in `index.css`
  and scene classes in `scroll-reveal.css` must never be inside `@layer` blocks.
- [S16 landscape overlap] The descending landscape layers in S16 are the same SVGs used in the fixed
  `ParallaxLandscape`. They must be independent copies (imported again as positioned elements in the
  scene layer) to avoid interfering with the hero's fixed backdrop.

### D11: Text color for dark scenes

`text-cream` is used for:
- Beaver sentences S6-S9 (dark backgrounds: beaver-dark night/zoom scenes and the stillness gradient)
  via `getLineProps` overrides on those indices in the first `ScrollRevealText` call.
- All professional sentences S10-S16 (underwater gradient) via the `className` prop on the second
  `ScrollRevealText` call -- the entire block uses `text-cream`, no per-sentence check needed.