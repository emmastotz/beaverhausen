## ADDED Requirements

### Requirement: Lint blocks regressions to the pre-token state

The system SHALL add lint enforcement that bans arbitrary color values, direct primitive color
utilities in components, and `dark:` color variants outside `src/index.css`. The CSS entry
point (`src/index.css`) SHALL be exempt.

#### Scenario: Component reintroduces a dark variant

- **WHEN** a component file contains a `dark:` color variant after enforcement lands
- **THEN** lint fails

#### Scenario: Arbitrary color value

- **WHEN** a component uses an arbitrary color value (e.g. `bg-[#1f2937]`) or a direct primitive
  color utility
- **THEN** lint fails

#### Scenario: Entry point exemption

- **WHEN** `src/index.css` declares primitives, semantic tokens, or dark-mode overrides
- **THEN** lint passes

### Requirement: STYLE.md documents the closed system

`STYLE.md` SHALL contain the full semantic token list, the naming convention, the procedure for
adding a token, how the light/dark pair resolves, and what the lint rule blocks.

#### Scenario: Adding a token later

- **WHEN** a developer needs a new semantic token
- **THEN** `STYLE.md` gives the naming convention, declaration location, and light/dark
  resolution mechanics without needing to reverse-engineer `src/index.css`
