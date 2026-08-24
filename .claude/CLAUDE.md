# CLAUDE.md

Be terse and concise.

Personal portfolio for Emma Stotz. A static React + TypeScript SPA deployed on GitHub Pages.
Animation-forward: GSAP for complex choreography, CSS scroll-driven animations for parallax.

---

## Git

Pick the conventional-commit type by external-API impact, not by intent:

- `feat!` (breaking change)
  - Add a method to an interface
  - Delete a method
- `feat`
  - Add a method to a class
  - Change code to call a different method
- `refactor`
  - A class's external API is unchanged (e.g. renaming an internal/private method)

"Migrating" or "converting" something to a new method is still `feat` — it adds and/or switches
methods.

Prefer commits as small as possible: each commit does one reviewable thing and leaves the build
green.
When the same mechanical change spans many files, split it per file — one commit per file.
Likewise, adding several independent things in one commit (e.g. two unrelated new classes) is
multiple reviewable things — give each its own commit, even when they look similar or were created
together.

E.g. renaming a class is 3+ commits:

1. Create the class under the new name.
2. One commit per caller migrated to the new class.
3. Delete the old class.

Deleting a feature is also one file per commit. Order the deletions so every commit still
builds (green): remove a file only after everything importing it is already gone. This is a
tree traversal of the import graph — delete entry points first (pages/routes), then the
components they used, then the composables/resources those used, down to the leaves. Drop a
barrel/`index` re-export in the same commit that orphans the file it points to. Combine files
into one commit only when they cannot be separated without breaking the build (e.g. files that
import each other).

Avoid including unrelated untracked files in commits.

Before commits: `pnpm run lint --fix`

## Stack & Tooling

| Tool                       | Version | Role                                                                           |
| -------------------------- | ------- | ------------------------------------------------------------------------------ |
| React                      | 19.2.5  | UI framework                                                                   |
| React Router               | 7.15.0  | Client-side routing (`createBrowserRouter`)                                    |
| GSAP                       | 3.15.0  | Animation — typewriter, flipbook 3D turns, scroll triggers                     |
| `@gsap/react`              | 2.1.2   | `useGSAP` hook for GSAP context scoping                                        |
| Vite                       | 8       | Build + dev server (port 3000)                                                 |
| TypeScript                 | 6       | Strict config — `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` |
| Tailwind CSS               | 4       | Utility CSS; theme configured entirely in `src/index.css` via `@theme`         |
| Babel + React Compiler     | —       | `babel-plugin-react-compiler` in the Vite pipeline for auto-memoization        |
| `scroll-timeline-polyfill` | 1.1.0   | Loaded conditionally in `main.tsx` when `animation-timeline` is unsupported    |
| `oxfmt`                    | 0.48.0  | Formatter (config: `.oxfmtrc.json`)                                            |

**No `tailwind.config.js`.** All custom tokens live in `src/index.css` inside the `@theme { }` block.

**Path alias:** `@/` → `./src/` (wired in both `vite.config.ts` and `tsconfig.app.json`).

**Build command:** `tsc -b && vite build` — type-checks first, then builds.

---

## Directory Structure

```
src/
├── assets/
│   ├── landscape/          SVG parallax layers (background, midground, foreground, clouds)
│   ├── about/              SVG landscape for the about page
│   └── portfolio/
│       └── case-studies/   Case study images per project (beaverhausen/, whitehawk/)
├── components/
│   ├── about/              StaticAbout.tsx + static-about.css
│   ├── brand/              BeaverMark, Wordmark, icons/ (stroke SVGs)
│   ├── gsap/               Flipbook.tsx (complex GSAP component)
│   ├── landing/            Hero, About, ParallaxLandscape, Typewriter, ScrollJackTypewriter, ScrollRevealText
│   ├── portfolio/          PortfolioParallax, LandmarkScene, Scenes.config.tsx
│   │   ├── beaverhausen/   BeaverhausenCaseStudy, TypeSpecimen
│   │   └── whitehawk/      WhiteHawkCaseStudy
│   └── primitives/
│       ├── typography      BaseT1–T6, BodyT1–T4, DisplayT1–T4, AutoH, AutoHProvider
│       └── interactive     Button, AppLink, TransitionLink, ExternalLink, interactiveStyles.ts
├── context/
│   ├── TransitionContext.tsx   Page-transition state machine + provider
│   └── TransitionOverlay.tsx   Canvas-based water animation
├── deps/
│   └── gsap.ts             Single re-export point for all GSAP imports
├── hooks/
│   ├── useFadeIn.ts        GSAP scroll-triggered fade + translate
│   ├── useTypewriter.ts    GSAP character-by-character reveal
│   ├── useScrollJack.ts    GSAP ScrollTrigger pinning + snap
│   └── usePageTransition.ts  idle → flooding → holding → draining state machine
├── layouts/
│   ├── DefaultLayout.tsx   bg-cream wrapper + optional dot-grid overlay
│   ├── SectionLayout.tsx   <section> with id and aria-label
│   └── CaseStudyLayout.tsx
├── pages/
│   ├── index.tsx           LandingPage
│   ├── about/index.tsx     AboutPage
│   └── portfolio/          PortfolioPage, beaverhausen/, whitehawk/
├── content/                Typed content constants (hero.ts, about.ts, case-studies.ts, …)
├── util/
│   ├── dependency.ts       createDependency<T> — context + throw-if-missing hook factory
│   ├── portal.tsx          createPortalPair — defined but unused
│   └── state.ts
├── App.tsx                 createBrowserRouter + TransitionProvider + RootLayout
├── main.tsx                Entry point — polyfill check, ReactDOM.createRoot
└── index.css               Global styles, @import tailwindcss, @theme, @layer utilities, @keyframes
```

### Naming conventions

| Thing               | Convention                  | Example                     |
| ------------------- | --------------------------- | --------------------------- |
| Components          | PascalCase `.tsx`           | `LandmarkScene.tsx`         |
| Hooks               | `use` + camelCase `.ts`     | `useScrollJack.ts`          |
| Config / data files | PascalCase `.config.tsx`    | `Scenes.config.tsx`         |
| Utility modules     | camelCase `.ts` / `.tsx`    | `dependency.ts`             |
| Pages               | `index.tsx` in named folder | `pages/portfolio/index.tsx` |
| Assets              | kebab-case                  | `landscape-foreground.svg`  |

**CSS files** are colocated with their component when they contain scroll-driven `animation-timeline` rules that must not live inside `@layer` blocks (polyfill constraint). They are otherwise avoided — use Tailwind utilities instead.

---

## Architecture

### Bootstrap sequence

```
index.html → main.tsx
  polyfill check (scroll-timeline-polyfill if CSS.supports fails)
  ReactDOM.createRoot(<StrictMode><App /></StrictMode>)
    App.tsx: createBrowserRouter → <RouterProvider>
      TransitionProvider
        RootLayout (ScrollToTop + Header portal + TransitionOverlay + <Outlet>)
          / → LandingPage
          /about → AboutPage
          /portfolio → PortfolioPage
          /portfolio/beaverhausen → BeaverhausenPortfolioPage
          /portfolio/whitehawk → WhiteHawkPortfolioPage
```

GitHub Pages SPA routing: `public/404.html` redirect + script in `index.html`.

### State management

No Redux, Zustand, or global state library. Two contexts:

- **`TransitionContext`** — page-transition state machine (`idle → flooding → holding → draining → idle`). Exposed via `createDependency<T>` (from `util/dependency.ts`) which creates a typed context + a hook that throws if used outside the provider. Always use `TransitionLink` / `AppLink` for internal navigation — they call `transitionTo()` rather than React Router's `navigate` directly.
- **`HeadingLevelContext`** — integer level, defaults to 1. Incremented by `AutoHProvider`. Read by `AutoH` to emit the correct `<h1>`–`<h6>`.

All other state is local to the component.

### Scroll position is communicated via CSS variables, not React state

- `PortfolioParallax` writes `--offset` directly to its container's `style` on every scroll event.
- `ParallaxLandscape` writes `--landing-scroll-y` to `document.documentElement.style`.

This keeps React out of the scroll hot path. Never lift scroll position into `useState`.

### GSAP import rule

All GSAP imports come from `@/deps/gsap`, never from `gsap` directly.

```ts
// CORRECT
import { gsap, useGSAP, ScrollTrigger } from '@/deps/gsap'

// WRONG — do not do this
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```

`src/deps/gsap.ts` registers all plugins once and re-exports them.

### Pages are thin

Pages compose layouts and section components and hold at most one piece of trivial local state. Business logic belongs in hooks or components, not pages.

### CSS scroll-timeline polyfill constraint

The polyfill cannot parse styles inside `@layer` blocks. Any class using `animation-timeline` must be declared at the **top level** of a CSS file, not inside `@layer utilities` or `@layer base`. This is why some animation classes live in component-adjacent `.css` files rather than `index.css`.

---

## Design System

### Colors

All color tokens are CSS custom properties in `src/index.css` `@theme { }`. Use Tailwind token names (`text-beaver`, `bg-cream`, etc.) — never raw hex values.

| Token         | Hex       | Use                                                                                                           |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `beaver`      | `#78614d` | Body text, secondary UI, navigation labels                                                                    |
| `beaver-dark` | `#3c3127` | Headings, active states, high-contrast text                                                                   |
| `cream`       | `#fff5e3` | Page background, header background, inverted text on dark                                                     |
| `iron-orange` | `#b96e16` | Every interactive affordance: underlines, focus rings, accent labels                                          |
| `enamel`      | `#fffefc` | Flipbook page surface — near-white "paper"                                                                    |
| `dawn`        | `#ffffc5` | Sun/sky background, dawn color scheme                                                                         |
| `dusk`        | `#1e2f38` | Dark background, dusk color scheme                                                                            |
| `water-dark`  | `#7a9aaa` | Water tones (transition overlay)                                                                              |
| `water`       | `#b7c4ca` | Water tones (lighter)                                                                                         |
| `olive-green` | `#5c6b3a` | SVG illustration color — commented out of `@theme` (no Tailwind utility generated); kept as a reference value |

**Opacity modifiers** are the primary way to extend the palette: `beaver/10` (hairline borders), `beaver/20` (rings), `iron-orange/30` (soft focus rings), `iron-orange/70` (muted labels).

`iron-orange` is the single accent color. Do not use it for passive text.

### Typography

Three font families, each with a distinct role:

| Token          | Family                            | Role                                                    |
| -------------- | --------------------------------- | ------------------------------------------------------- |
| `font-header`  | Magic Retro (self-hosted WOFF2)   | Brand identity — hero headings, cover pages             |
| `font-display` | Fraunces (Google Fonts, variable) | Editorial — featured quotes, callouts, case study body  |
| `font-body`    | Spinnaker (Google Fonts)          | UI — navigation, labels, captions, all interactive text |

**Type scale components** (`src/components/primitives/`):

| Component        | Family      | Size (mobile → desktop) | Use                                                                |
| ---------------- | ----------- | ----------------------- | ------------------------------------------------------------------ |
| `BaseT1`         | Magic Retro | 2.25rem → 3rem          | Section headings, hero                                             |
| `BaseT6`         | Spinnaker   | 0.75rem                 | Labels, eyebrows, captions — always uppercase, `tracking-[0.18em]` |
| `BodyT1`         | Spinnaker   | 1.25rem → 1.5rem        | Subheadings                                                        |
| `BodyT2`         | Spinnaker   | 1.125rem → 1.25rem      | Card titles                                                        |
| `BodyT3`         | Spinnaker   | 1rem → 1.125rem         | Standard body                                                      |
| `BodyT4`         | Spinnaker   | 0.875rem → 1rem         | Fine print                                                         |
| `DisplayT1`      | Fraunces    | 1.5rem → 1.875rem       | Featured quotes                                                    |
| `DisplayT2`–`T3` | Fraunces    | 1.125rem → 1.125rem     | Display subheadings / body                                         |
| `DisplayT4`      | Fraunces    | 0.875rem → 1rem         | Display captions, `tracking-[0.18em]`                              |

`BaseT2`–`T5` are polymorphic: they render either the body or display variant based on a `variant` prop (default: `'body'`).

All typography components are `<span>` wrappers. They do not apply color or semantic elements. The caller provides the color class and wraps in `AutoH` (or a semantic tag) where needed.

Apply `antialiased` to all typographic components. The three fonts render significantly better with subpixel smoothing disabled.

`tracking-[0.18em]` is a system signature — it appears on `BaseT6`, `DisplayT4`, and all interactive element text. Use it for labels, eyebrows, and controls.

### Heading hierarchy

Never hardcode `<h1>`–`<h6>` inside components. Use `AutoH` + `AutoHProvider`:

```tsx
// Increments heading level for this subtree
<AutoHProvider>
  <AutoH className="...">Section title</AutoH>
</AutoHProvider>
```

`AutoH` reads `HeadingLevelContext` to emit the correct tag. `AutoHProvider` increments the level by 1 (clamped to 6).

### Interactive elements

All interactive primitives (`Button`, `AppLink`, `ExternalLink`) share one style definition in `src/components/primitives/interactiveStyles.ts` via `buildInteractiveClass(variant, size, className)`. The header nav uses `baseLinkClasses` from the same file as its structural foundation, then adds its own colors and offset — the two share the underline machinery without sharing the button-specific typography classes (`font-body`, `uppercase`, `tracking-[0.18em]`) that the nav label handles via `BaseT6`.

The canonical interactive pattern is `underline-build` — a CSS utility class defined in `src/index.css` `@layer utilities`. It adds a 2px `iron-orange` underline that grows from the center outward on hover/focus-visible:

- Hover: `0.4s` ease-out-cubic transition
- `focus-visible`: immediate (no transition) for clear keyboard feedback

**Variants:** `primary` (beaver text) | `ghost` (iron-orange text).  
**Sizes:** `sm` (0.675rem) | `md` (0.8rem) | `lg` (0.925rem) — responsive, each slightly larger at `md:`.

No filled-background button variants exist. The system uses underline-only affordances.

The `--ub-offset` CSS custom property controls where the underline sits relative to the element bottom (default: `0px`). Components like the header nav override it with `[--ub-offset:-0.8rem]`.

### Layout

- All pages use `DefaultLayout` (bg-cream, optional 160×160px dot-grid overlay at 8% opacity).
- Header is `fixed top-0 z-header` at 3.5rem tall, portaled into `document.body`. Account for it with `pt-24` to `pt-32`.
- `SectionLayout` wraps semantic `<section>` elements with `id` and `aria-label`.

Content max-widths:

| Context                 | Class       | Value  |
| ----------------------- | ----------- | ------ |
| Long-form prose (about) | `max-w-2xl` | ~42rem |
| Case study / flipbook   | `max-w-3xl` | ~48rem |
| Portfolio overview      | `max-w-7xl` | ~80rem |

### Z-index

A named scale is defined in `@theme` and exposed as utility classes in `@layer utilities`. Nothing should use a raw `z-*` value outside this scale:

| Class        | Value | Contract                                               |
| ------------ | ----- | ------------------------------------------------------ |
| `z-raised`   | 10    | Component-internal page layering (flipbook pages)      |
| `z-tabs`     | 20    | Component UI above its own page layers (flipbook tabs) |
| `z-floating` | 30    | Fixed elements above content but below the header      |
| `z-header`   | 40    | Fixed site header                                      |
| `z-overlay`  | 50    | Full-screen overlays (page transition)                 |

### Animation tokens

Defined in `@theme`:

| Token                    | Value                            |
| ------------------------ | -------------------------------- |
| `--duration-interaction` | `0.4s`                           |
| `--duration-transition`  | `1.2s`                           |
| `--ease-out-cubic`       | `cubic-bezier(0.33, 0, 0.66, 1)` |

GSAP calls inside Flipbook and PortfolioParallax use named local variables (`flipDuration`, etc.) rather than the CSS tokens — reading CSS custom properties in JS requires `getComputedStyle`, which is too awkward for a small project.

**`prefers-reduced-motion`:** All animated components check `window.matchMedia('(prefers-reduced-motion: reduce)')`. `TransitionOverlay` returns `null` entirely; `Flipbook` and `PortfolioParallax` zero out their GSAP durations.

### Elevation

Two shadow levels only:

| Level    | Value                         | Context                              |
| -------- | ----------------------------- | ------------------------------------ |
| card     | `0 1px 2px rgba(0,0,0,0.05)`  | Color swatches, small inset surfaces |
| flipbook | `0 40px 80px rgba(0,0,0,0.5)` | The case study flipbook              |

No shadows on buttons, links, or navigation.

### Dark mode

Dark variants are applied via `dark:` prefixes throughout the codebase. This is intentional — the dark color mappings are context-specific and diverge enough that `:root` token overrides can't serve them. For example, `cream` maps to `dusk` in `DefaultLayout` but to `beaver-dark` in `CaseStudyLayout`; `beaver-dark` text maps to `cream` for headings but to `iron-orange` for nav labels. Each component's `dark:` classes are the source of truth for its dark appearance.

---

## Component Patterns

### Props

Props are typed inline or with a named `Props` / `interface` near the component. Components extend HTML attribute types where appropriate (`React.ButtonHTMLAttributes`, `React.AnchorHTMLAttributes`). Prop interfaces are not exported unless consumed externally.

### Effects and cleanup

All effects that attach listeners or observers return a cleanup function. The React Compiler (auto-memoization via Babel plugin) is active — avoid patterns that confuse it (e.g., mutating objects across renders, non-stable inline functions in dependency arrays).

### Render props for content

`Flipbook` accepts `children: (id: string) => ReactNode`. Case study components pass an inline function that switches on chapter id. This colocates chapter content with the component that renders it.

### Colocated CSS files

Allowed only when the styles use `animation-timeline` (polyfill constraint). Component CSS files sit next to the component file. Never put `animation-timeline` classes inside `@layer` blocks.

### Key component behaviors

**`TransitionLink`** — Use for all internal navigation. Intercepts clicks, calls `transitionTo()` to trigger the water animation, then navigates at the `holding` phase. Preserves `href` for middle-click/right-click. `AppLink` wraps this with interactive styles.

**`TransitionOverlay`** — Canvas-based water flood/drain animation portaled into `document.body`. Draws with raw `rgba()` values by necessity — the canvas 2D API does not resolve CSS custom properties, so `var(--color-water-dark)` is not available in `fillStyle`. The colors approximate `water-dark` and `water` from the token palette. Returns `null` when `prefers-reduced-motion` is set.

**`PortfolioParallax`** — Horizontal scroll panorama. Uses a manual scroll listener (not GSAP ScrollTrigger) for fine-grained `renderedWidth` control. Writes `--offset` directly to the DOM. Detects keyboard vs. pointer input via a `usingKeyboard` ref; on Tab focus, `scrollToHitAreaCenter` fires and scrolls the panorama to center the focused scene in the viewport.

**`LandmarkScene`** — Polls `getBoundingClientRect` on scroll to set `active` when its hit-area center is within the viewport. Does not receive active state from above; it reads the DOM directly.

**`Flipbook`** — 3D page-turn via GSAP `rotateY`. `perspective: 1200px`, `backface-visibility: hidden`. Chapter tabs are `z-tabs`. The cover page renders separately and is hidden once the first chapter is opened.

**`ScrollJackTypewriter`** — Pins a container via `useScrollJack`, advances through `lines` as the user scrolls, animates each line via `useTypewriter`. Use `composeScrollSections` to merge multiple `ScrollSection` configs into a flat lines array.

---

## Do's and Don'ts

**Do:**

- Import GSAP from `@/deps/gsap`, never from `gsap` directly.
- Use `useGSAP` (not `useEffect`) for all GSAP animations inside React components.
- Use Tailwind token names for all colors (`text-beaver`, `bg-cream`). Never raw hex.
- Use `underline-build` + `buildInteractiveClass` for all interactive affordances.
- Use `iron-orange` for every interactive affordance: underlines, focus rings, CTA labels.
- Use `BaseT6` (uppercase, `tracking-[0.18em]`) for all labels and eyebrows.
- Use `font-body tracking-[0.18em] uppercase` for interactive element text (marks it as a control).
- Apply `antialiased` to all typography components.
- Use `focus-visible:` (not `focus:`) for custom focus styles.
- Use `AutoH` + `AutoHProvider` for heading hierarchy — never hardcode `<h1>`–`<h6>`.
- Use `TransitionLink` / `AppLink` for internal navigation.
- Return cleanup functions from all effects that attach listeners or observers.
- Put `animation-timeline` classes at the top level of a CSS file, never inside `@layer`.

**Don't:**

- Don't use raw hex values for colors — reference the `@theme` token.
- Don't add filled-background buttons — the system is underline-only. Add a new variant to `interactiveStyles.ts` if needed.
- Don't use `olive-green` or `water` for UI text — they have no verified contrast.
- Don't apply `shadow-*` utilities to buttons, links, or navigation.
- Don't put scroll position into React state — write it directly to a CSS custom property.
- Don't import GSAP plugins directly; they must be registered via `deps/gsap.ts`.
- Don't use `<Link>` from React Router directly — use `TransitionLink` or `AppLink`.
- Don't put `animation-timeline` inside `@layer` blocks (polyfill will ignore them).
- Don't add `<style>` blocks to component files — use Tailwind utilities or colocated `.css` files only for scroll-driven animation.
