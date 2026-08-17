## 1. CSS -- Scene animation classes (`cinematic-about.css`)

- [x] 1.1 Add `.scene-fade` (opacity 0->1->0, `view()`) -- standard per-sentence fade
- [x] 1.2 Add `.scene-translate-in-left` -- landscape + foreground translates left into position, `view()`
- [x] 1.3 Add `.scene-scale-zoom` -- scale 30%->60% on scene layer, `view()`
- [x] 1.4 Add `.scene-riverbed-descend` -- translateY from top into fixed-at-bottom position, `view()`
- [x] 1.5 Add `.scene-riverbed-exit` -- translateY out of bottom, `view()`
- [x] 1.6 Add `.scene-beaver-swim-left` -- beaver enters bottom-left, exits right, `view()`
- [x] 1.7 Add `.scene-beaver-swim-right` -- beaver enters bottom-right, exits left, `view()`
- [x] 1.8 Add `.scene-bubble-rise` -- CSS circles rise from bottom to top, `view()`
- [x] 1.9 Add `.scene-light-diffuse` -- radial gradient overlay fades in, `view()`
- [x] 1.10 Add `.scene-landscape-descend` -- landscape layers translate from top, fix at bottom, `view()`
- [x] 1.11 Add `prefers-reduced-motion` rules for all new scene classes
- [x] 1.12 Verify all new classes are top-level (not inside `@layer`)

## 2. CSS -- Wood chip animation (`index.css`)

- [x] 2.1 Add `.wood-chip-fall` `@keyframes` + class targeting the wood chip group inside
         `BeaverCopyForeground3`; gravity-style fall with slight rotation
- [x] 2.2 Verify class is top-level (not inside `@layer`)

## 3. Component -- `ScrollRevealText` extension

- [x] 3.1 Add `renderScene?: (lineIndex: number) => ReactNode` to `ScrollRevealText` Props type
- [x] 3.2 Wrap each `h-screen` div in `relative`; render `absolute inset-0 overflow-clip` scene div
         when `renderScene` is provided
- [x] 3.3 Add `relative z-raised` to the text content div inside each sentence container
- [x] 3.4 Verify the closing `CLOSING_COPY` call in `About.tsx` renders without regression when
         `renderScene` is not passed

## 4. SVG Asset Authoring -- Above-ground layers (S1-S9)

- [x] 4.1 Author `assets/landing/beaver-copy-background.svg` -- landscape scene; designed to overlay
         `dawn-clouds-bg.svg` / `dusk-clouds-bg.svg`
- [x] 4.2 Author `assets/landing/beaver-copy-foreground-1.svg` -- beaver contemplating, positioned
         for S1 translation animation
- [x] 4.3 Author `assets/landing/beaver-copy-foreground-2.svg` -- dam interior overlay for S3
- [x] 4.4 Author `assets/landing/beaver-copy-foreground-3.svg` -- chewing beaver with named wood chip
         group (targetable by `.wood-chip-fall`) and tooth paths with glimmer `@keyframes` in SVG
         `<style>` block

## 5. Inline SVG Components -- `src/components/landing/`

- [x] 5.1 Create `BeaverCopyBackground.tsx` wrapping `beaver-copy-background.svg`
- [x] 5.2 Create `BeaverCopyForeground1.tsx` wrapping `beaver-copy-foreground-1.svg`
- [x] 5.3 Create `BeaverCopyForeground2.tsx` wrapping `beaver-copy-foreground-2.svg`
- [x] 5.4 Create `BeaverCopyForeground3.tsx` wrapping `beaver-copy-foreground-3.svg`

## 6. Scene wiring -- `CinematicAbout.tsx` above-ground (S0-S8, beaver sentences)

- [x] 6.1 Remove `composeScrollSections` call; split into two independent `ScrollRevealText` calls
- [x] 6.2 Import `dawn-clouds-bg.svg` / `dusk-clouds-bg.svg`; import the 4 inline SVG components
- [x] 6.3 Define `renderBeaverScene(i)` for S0-S8:
         - S0: clouds base + `BeaverCopyBackground` + `BeaverCopyForeground1` with `.scene-translate-in-left`
         - S1: same layers with `.scene-scale-zoom` (zoom in)
         - S2: `BeaverCopyBackground` + `BeaverCopyForeground2` fading in; `BeaverCopyForeground1` fading out
         - S3: `BeaverCopyBackground` + `BeaverCopyForeground2` + `BeaverCopyForeground3` fading in
         - S4: same layers + `.wood-chip-fall` active on `BeaverCopyForeground3`
         - S5-S6: `BeaverCopyForeground3` CSS-zoomed to frame head at ~50%; tune `transform-origin`
           and translate in-browser
         - S7-S8: `bg-gradient-to-t from-beaver-dark via-beaver-dark to-beaver`, `.scene-fade`

## 7. Scene wiring -- `CinematicAbout.tsx` underwater (S0-S6, professional sentences)

- [x] 7.1 Wrap second `ScrollRevealText` call in
         `<div className="bg-gradient-to-t from-dusk via-water-dark to-water">`
- [x] 7.2 Import `underwater-riverbed.svg` from `@/assets/about/`;
         import `beaver-swimming-glide.svg` + `beaver-swimming-pull.svg` from `@/assets/about/`;
         import `beaver-swimming-above-*.svg` from `@/assets/landing/`;
         import landscape layers from `@/assets/landscape/`
- [x] 7.3 Define `renderUnderwaterScene(i)` for professional sentences (local indices 0-6):
         - i=0 (S10): `underwater-riverbed.svg` with `.scene-riverbed-descend`; transparent bg
           (gradient wrapper provides base)
         - i=1 (S11): two `<img>` beaver swim pair with `.scene-beaver-swim-left` + alternating
           opacity keyframe
         - i=2 (S12): `underwater-riverbed.svg` with `.scene-riverbed-exit`
         - i=3 (S13): two `<img>` beaver swim pair with `.scene-beaver-swim-right` + alternating
           opacity keyframe
         - i=4 (S14): CSS bubble elements with `.scene-bubble-rise`
         - i=5 (S15): radial gradient div with `.scene-light-diffuse`; two `<img>` beaver swim pair
           with `.scene-beaver-swim-left`
         - i=6 (S16): landscape layers (background/midground/foreground) with `.scene-landscape-descend`;
           two `<img>` above-water beaver pair entering from right to ~two-thirds width

## 8. Closing beat -- sun animation

- [x] 8.1 Add sun-rise CSS element to the closing section of `About.tsx` (the section containing the
         sticky `BeaverMark`)
         NOTE: The existing fixed sun element in `LandingPage` already handles this visual beat;
         no additional element needed in CinematicAbout.
- [x] 8.2 Sun rises via CSS `@keyframes`, then fades; `BeaverMark` fades in beneath it (existing
         `isScrollComplete` logic can remain or be replaced by the sun's exit animation)
         NOTE: Handled by existing LandingPage sun + isScrollComplete BeaverMark logic.

## 9. Text legibility -- apply `text-cream`

- [x] 9.1 Add `text-cream` overrides via `getLineProps` for beaver sentence indices 5-8 (S6-S9,
         dark backgrounds: night zoom scenes + stillness gradient)
- [x] 9.2 Pass `text-cream` as the base `className` on the second `ScrollRevealText` call (professional
         sentences, entire underwater block)

## 10. Format and verify

- [x] 10.1 Run `pnpm run format`
- [x] 10.2 Run `tsc -b` and resolve any type errors
- [ ] 10.3 Manual browser check: scroll through the full about section, verify all 17 screens,
          scene transitions, text legibility, beaver swim cycles, and closing beat
- [ ] 10.4 Verify `prefers-reduced-motion`: scene animations disabled, static fallback renders cleanly
