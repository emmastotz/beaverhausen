## 1. Phase 0: Audit (no code changes)

- [ ] 1.1 Study `/whitehawk/whitehawk-frontend` (read-only): primitive/semantic split, naming
      convention, declaration locations, how the dark variant is applied at the token layer.
      Record the architecture pattern; take no values.
- [ ] 1.2 Read `src/index.css`: list declared primitives; flag unused ones, near-duplicates,
      and any that are semantic rather than primitive.
- [ ] 1.3 Identify the dark-mode toggle strategy (class, media, or custom) and where it is
      applied (`html` or lower). State it in the audit before proceeding.
- [ ] 1.4 Inventory every `dark:` variant as a light/dark pair: base utility, dark utility,
      occurrence count, files.
- [ ] 1.5 Inventory primitive-bypassing values: arbitrary Tailwind values, default-palette
      utilities, inline `style={{}}`, custom properties declared outside `src/index.css`,
      one-off font stacks, radii, shadows, z-index, durations.
- [ ] 1.6 Inventory direct primitive use in components (each is a slot for a semantic token).
- [ ] 1.7 Write `.migration/token-audit.md` with all tables, each row carrying the proposed
      semantic token.
- [ ] 1.8 Propose the semantic token set: name, light value, dark value, collapsed usages.
      Every value must be an existing primitive.
- [ ] 1.9 Flag explicitly: base utilities missing a `dark:` counterpart; dark-only variants;
      inconsistent pairs (list each with a recommendation, do not resolve); values that do not
      map cleanly onto a semantic name; any dark value needing new primitives (propose minimum
      set with reasoning, add nothing).
- [ ] 1.10 STOP. Present audit for review; wait for sign-off on token set and inconsistency
      list before any further task.

## 2. Phase 1: Token layer (after audit sign-off)

- [ ] 2.1 Write the naming convention into `STYLE.md` before declaring any token.
- [ ] 2.2 Add the semantic token block to `src/index.css`, clearly separated from the intact
      primitive block; tokens reference primitives by `var()`, never literals; light/dark
      resolves at the token layer using the existing toggle strategy.
- [ ] 2.3 Verify tokens actually flip per mode (Tailwind v4 `@theme` inlining caveat) with a
      build and a manual both-mode check; no component edits.
- [ ] 2.4 `pnpm run lint --fix`, `pnpm run format`, typecheck, build; commit the token layer
      alone (conventional commit).
- [ ] 2.5 STOP. Present the token layer for review; wait for sign-off.

## 3. Phase 2: Migration (one slice per commit)

- [ ] 3.1 Derive the slice order from the audit: smallest blast radius first; shared
      primitives (`interactiveStyles.ts`, typography) and layout wrappers
      (`DefaultLayout`, `CaseStudyLayout`) last.
- [ ] 3.2 For each slice: replace base + `dark:` pair with the semantic utility; confirm no
      orphan `dark:` color variants remain in touched files; no restructuring, renames,
      extraction, or markup changes.
- [ ] 3.3 Where one replacement exceeds ~10 occurrences, write a codemod and commit the
      script alongside the slice.
- [ ] 3.4 After each slice: `pnpm run lint --fix`, `pnpm run format`, typecheck, build, in
      order; report failures rather than working around them.
- [ ] 3.5 After each slice: list routes and states for the user to check manually in both
      modes (`/`, `/about`, `/portfolio`, `/portfolio/beaverhausen`, `/portfolio/whitehawk`,
      `/contact`, plus transition overlay, flipbook, and parallax states). Do not add visual
      regression tooling without asking.
- [ ] 3.6 Final sweep: grep confirms zero `dark:` color variants remain outside
      `src/index.css`.

## 4. Phase 3: Enforcement

- [ ] 4.1 Add lint rules banning arbitrary color values, direct primitive color utilities in
      components, and `dark:` color variants outside `src/index.css`; exempt the CSS entry
      point. Use the repo's existing lint setup; ask before adding a dependency.
- [ ] 4.2 Verify the rules: a deliberate violation of each kind fails lint; `src/index.css`
      passes.
- [ ] 4.3 Finish `STYLE.md`: token list, naming convention, how to add a token, how the
      light/dark pair resolves, what the lint rule blocks.
- [ ] 4.4 `pnpm run lint --fix`, `pnpm run format`, typecheck, build; commit enforcement and
      docs as separate conventional commits.
