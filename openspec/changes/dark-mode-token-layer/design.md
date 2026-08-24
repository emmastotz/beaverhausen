## Context

Dark mode works today but is expressed as per-component `dark:` variants (~66 occurrences across
21 files). `src/index.css` declares primitives in `@theme` (beaver, beaver-dark, cream,
iron-orange, enamel, dawn, dusk, water, water-dark) but there is no semantic tier: components
pick primitives and their dark counterparts directly. The dark mappings are context-specific
(cream maps to dusk in `DefaultLayout` but beaver-dark in `CaseStudyLayout`), so the migration
must first prove which divergences are intentional roles and which are drift.

A read-only reference repo, `/whitehawk/whitehawk-frontend` (also Tailwind v4), demonstrates a
primitive/semantic split. Its architecture is the model; its brand values are off-limits.

## Goals / Non-Goals

**Goals:**
- Semantic tokens in `src/index.css` that resolve light/dark at the token layer.
- Components use one utility per role; `dark:` color variants disappear from components.
- Pixel-identical rendering in both modes.
- Lint enforcement plus `STYLE.md` so the system stays closed.

**Non-Goals:**
- Any visual change, new primitives without approval, WhiteHawk values, toggle-strategy change,
  component refactoring, or visual regression tooling (see proposal Non-goals).

## Decisions

### 1. Audit before any code, with two hard review gates

Phase 0 produces `.migration/token-audit.md` and stops. Phase 1 (token layer) also stops for
review before migration. Rationale: the dark mappings are known to diverge by context; whether a
divergence is a role (two tokens) or drift (a bug to surface) is the user's call, not the
implementer's. Alternative (audit-while-migrating) rejected: it forces exactly those judgment
calls mid-flight.

Audit contents: primitive inventory (unused, near-duplicate, wrongly-semantic flagged); current
toggle strategy (class vs media, applied at `html` or lower) stated before proceeding; every
`dark:` pair as a table (base utility, dark utility, count, files); every primitive-bypassing
value (arbitrary values, default-palette utilities, inline styles, custom properties outside
`src/index.css`, font/radius/shadow/z-index/duration one-offs); direct primitive use. Every row
carries the proposed semantic token. Explicit flag lists: missing `dark:` counterparts, dark-only
variants, inconsistent pairs (with a recommendation but no resolution), unmappable values, and
any dark value needing a new primitive (proposed with reasoning, not added).

### 2. Semantic tier lives in `src/index.css`, referencing primitives by var

The existing primitive `@theme` block stays intact; a clearly separated semantic block follows
it. Semantic tokens are defined as `var(--color-<primitive>)` references, never literals, and
the dark value is applied at the token layer using whichever toggle strategy the audit finds
already in use (e.g. redefining the custom properties under the dark selector or media query).
Rationale: one file owns the palette, matching the existing "all color tokens live in
`src/index.css` `@theme`" rule; var-references keep primitives the single source of truth.
Alternative (separate tokens.css) rejected: splits the theme source and fights the existing
convention. Exact Tailwind v4 mechanics (e.g. `@theme` static vs dark-selector custom-property
override) follow the pattern observed in the reference repo, adapted to this app's toggle
strategy.

### 3. Naming: role-based, modeled on the reference architecture

Token names describe the role (surface, heading, body, accent-interactive), never the artwork or
color. The concrete convention is taken from studying `/whitehawk/whitehawk-frontend`'s
primitive/semantic split and written into `STYLE.md` before any token is applied. Values that do
not map cleanly onto a role stop the work and go back to the user.

### 4. Migration is sliced by blast radius, one concern per commit

Slices ordered smallest-first; shared primitives (`interactiveStyles.ts`, typography) and layout
wrappers (`DefaultLayout`, `CaseStudyLayout`) last. Each slice replaces base + `dark:` pair with
the semantic utility and leaves no orphan `dark:` variants in touched files. >10 occurrences of
one replacement means a committed codemod script. Gates after every slice, in order: lint,
typecheck, build; failures are reported, not worked around. After every slice, the route/state
list for both modes is given to the user for manual checking. This matches the repo's
commit-granularity convention in CLAUDE.md.

### 5. Enforcement via lint, exempting the CSS entry point

Rules ban arbitrary color values, direct primitive utilities in components, and `dark:` color
variants outside `src/index.css`. `STYLE.md` finishes with the token list, naming convention,
add-a-token procedure, light/dark resolution mechanics, and what the lint blocks. The concrete
lint tooling is chosen at Phase 3 from what the repo already runs (`pnpm run lint`); no new
dependency without asking.

## Risks / Trade-offs

- [Inconsistent dark pairs are really intentional context-specific roles] → The audit models
  them as candidate distinct tokens and surfaces each pair with a recommendation; the user
  decides. Never auto-resolved.
- [Canvas/GSAP code uses raw rgba by necessity (`TransitionOverlay`)] → Out of scope for utility
  migration; documented in the audit as a known, justified bypass rather than papered over.
- [Tailwind v4 `@theme` inlines values, so a naive semantic block may not flip with the dark
  selector] → Phase 1 verifies the chosen mechanism actually resolves per-mode (the reference
  repo shows the working pattern); build + manual mode check before sign-off.
- [Migration slice silently changes a pixel] → Pure-refactor rule: per-slice both-mode route
  checks by the user; any visual diff is a bug unless approved at audit review.
- [Lint rule too broad, blocking legitimate CSS-entry usage] → Explicit exemption for
  `src/index.css`; colocated animation CSS files reviewed case by case in Phase 3.

## Migration Plan

1. Phase 0: audit only → `.migration/token-audit.md` → **stop for review**.
2. Phase 1: semantic block in `@theme` + naming convention in `STYLE.md`, no component edits,
   single commit → **stop for review**.
3. Phase 2: slices, one commit each, gates + manual both-mode checks per slice.
4. Phase 3: lint rules + finished `STYLE.md`.

Rollback: each phase and slice is an independent commit; revert the offending commit. The token
layer commit is inert until slices consume it, so reverting a slice never breaks the build.

## Open Questions

- Which toggle strategy is actually in use (class vs media, and at what element)? Resolved by
  audit step 2 before anything else proceeds.
- Do any dark values require new primitives? Audit proposes; user approves or rejects.
- Which inconsistent pairs are roles vs drift? User decides at the audit gate.
- Exact lint mechanism (existing linter plugin vs custom rule) — decided in Phase 3 against the
  repo's current lint setup.
