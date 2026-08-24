## ADDED Requirements

### Requirement: Audit precedes all code changes
The system SHALL produce a complete audit at `.migration/token-audit.md` before any code change,
covering: primitives declared in `src/index.css` (flagging unused, near-duplicate, and
semantic-in-disguise entries); the current dark-mode toggle strategy and where it is applied;
every `dark:` variant as a light/dark pair with base utility, dark utility, occurrence count,
and files; every primitive-bypassing value (arbitrary Tailwind values, default-palette
utilities, inline styles, custom properties outside `src/index.css`, one-off font stacks, radii,
shadows, z-index, durations); and every direct primitive use in components. Each row SHALL carry
the proposed semantic token.

#### Scenario: Audit is the gate
- **WHEN** the audit document is written
- **THEN** work stops for user review, and no token or component change is made until the user
  signs off on the token set and the inconsistency list

#### Scenario: Inconsistent pairs are surfaced, not resolved
- **WHEN** two places play the same semantic role in light mode but take different dark
  treatments (or vice versa)
- **THEN** the audit lists each pair with a recommendation and rationale, and does not resolve
  it unilaterally

#### Scenario: Unmappable value
- **WHEN** a value does not map cleanly onto a semantic role name
- **THEN** it is flagged in the audit and work stops for user input rather than inventing a name

#### Scenario: Dark value not expressible with existing primitives
- **WHEN** a dark value cannot be expressed using primitives already declared
- **THEN** the audit proposes the minimum new primitives with reasoning, and none are added
  without approval

### Requirement: Semantic tokens resolve light and dark in `src/index.css`
The system SHALL declare a semantic token tier in `src/index.css`, clearly separated from the
existing primitive `@theme` block, where each semantic token resolves to a light value and a
dark value at the token layer using the toggle strategy already in use. Semantic tokens SHALL
reference primitives via `var()`, never literal values. The existing primitive block SHALL
remain intact.

#### Scenario: Mode resolution happens under the utility
- **WHEN** a component uses a semantic utility (e.g. `bg-surface`)
- **THEN** the rendered color matches the pre-migration light value in light mode and the
  pre-migration dark value in dark mode, with no `dark:` variant on the component

#### Scenario: Token layer commit is isolated
- **WHEN** the semantic tier is added
- **THEN** the commit contains no component edits, and work stops for user review

#### Scenario: Naming convention documented first
- **WHEN** the first semantic token is declared
- **THEN** `STYLE.md` already records the naming convention it follows

### Requirement: Reference architecture only
The token architecture (primitive/semantic split, naming convention, declaration location, dark
application point) SHALL follow the structure observed in the read-only repo
`/whitehawk/whitehawk-frontend`. The system MUST NOT write to that repo, import its brand
values, or alter this app's primitive values toward it.

#### Scenario: Values stay local
- **WHEN** the semantic tier is complete
- **THEN** every token value resolves to a primitive already declared in this app (or one
  explicitly approved), and both modes render identically to pre-migration
