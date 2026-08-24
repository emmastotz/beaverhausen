## Why

Dark mode is implemented as ~66 scattered `dark:` variants across 21 files with no semantic
token layer. Every component decides its own dark mapping, so pairs drift (the same role gets
different dark treatments), new components must guess, and nothing enforces consistency.

## What Changes

- Audit-first: full inventory of primitives, `dark:` pairs, primitive-bypassing values, and
  direct primitive use, written to `.migration/token-audit.md`. Hard stop for review before any
  code changes.
- A semantic token tier in `src/index.css` alongside the existing `@theme` primitives. Each
  semantic token resolves to a light and a dark value at the token layer, using the toggle
  strategy already in use. Tokens reference primitives by `var()`, never literals.
- Components migrate from `base + dark:` pairs to single semantic utilities, one slice per
  commit, smallest blast radius first.

  Before:
  ```tsx
  <div className="bg-cream dark:bg-dusk text-beaver-dark dark:text-cream">
  ```

  After:
  ```tsx
  <div className="bg-surface text-heading">
  ```

- Lint enforcement banning arbitrary color values, direct primitive use in components, and
  `dark:` color variants outside `src/index.css`.
- `STYLE.md` documenting the token list, naming convention, and how to add a token.
- Architecture (tier split, naming, dark application point) is modeled on the read-only
  reference repo `/whitehawk/whitehawk-frontend`. Architecture only: this app keeps its own
  color values in both modes.

## Non-goals

- No visual change in either mode. Both modes are a pure refactor; any appearance diff is a bug
  unless approved in the audit review.
- No new primitives without explicit approval.
- No import of WhiteHawk brand values, and no nudging this app's primitives toward theirs.
- No component restructuring, prop renames, extraction, or markup cleanup during migration.
- No change to the dark-mode toggle strategy.
- No visual regression tooling unless asked.

## Capabilities

### New Capabilities

- `semantic-token-layer`: semantic tokens in `src/index.css` that resolve light/dark at the
  token layer; components consume one utility per role.
- `token-migration`: sliced, commit-per-slice replacement of `base + dark:` pairs with semantic
  utilities, gated by lint/typecheck/build and per-slice manual route checks.
- `token-enforcement`: lint rules and `STYLE.md` that keep arbitrary colors, direct primitive
  use, and component-level `dark:` variants out of the codebase.

### Modified Capabilities

None. No existing specs.

## Impact

- `src/index.css`: new semantic block in `@theme`; existing primitive block untouched.
- ~21 component/page/layout/content files currently carrying `dark:` variants.
- Lint config: new rule set plus exemption for the CSS entry point.
- New docs: `.migration/token-audit.md` (audit artifact), `STYLE.md` (system reference).
- Two review gates: after the Phase 0 audit and after the Phase 1 token layer. Nothing
  downstream runs without sign-off.
