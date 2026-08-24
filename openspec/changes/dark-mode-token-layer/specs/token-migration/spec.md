## ADDED Requirements

### Requirement: Migration proceeds in blast-radius-ordered slices
The system SHALL migrate components from `base + dark:` utility pairs to single semantic
utilities in slices, one concern per commit, ordered smallest blast radius first with shared
primitives and layout wrappers last. Migration commits MUST NOT include component restructuring,
prop renames, extraction, or markup changes.

#### Scenario: Slice completeness
- **WHEN** a slice is committed
- **THEN** every file it touched has both the base utility and its `dark:` counterpart replaced
  by the semantic utility, with no orphan `dark:` color variants remaining in those files

#### Scenario: Bulk replacement uses a codemod
- **WHEN** a single replacement pattern exceeds ~10 occurrences
- **THEN** a codemod script performs it and is committed alongside the change

### Requirement: Every slice passes gates and both-mode checks
After each slice the system SHALL run the repo's gates in order (lint, typecheck, build) and
SHALL provide the user a list of routes and states to check manually in both light and dark
mode. Failures are reported, not worked around. No visual regression dependency is added
without asking.

#### Scenario: Gate failure
- **WHEN** lint, typecheck, or build fails after a slice
- **THEN** the failure is reported with output and the slice is not considered done

#### Scenario: Pure refactor guarantee
- **WHEN** any slice lands
- **THEN** both modes render identically to pre-migration; any visual difference is treated as
  a bug unless the user approved it at audit review
