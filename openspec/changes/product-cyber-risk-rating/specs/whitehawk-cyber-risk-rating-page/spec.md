## ADDED Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/cyber-risk-rating` SHALL render the Cyber Risk Rating tier 1 chapter. The page
component SHALL live at `src/pages/portfolio/whitehawk/cyber-risk-rating/index.tsx` and SHALL be
thin: it composes `CaseStudyLayout` and the chapter component and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/cyber-risk-rating`
- **THEN** the Cyber Risk Rating chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Cyber Risk Rating entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

### Requirement: Chapter copy lives in a typed content module

`src/content/product-cyber-risk-rating.ts` SHALL export the chapter as typed data rather than
commented draft text. It SHALL carry the title "Cyber Risk Rating: From Analyst to Everyone Else"
and the six body blocks (Specimen, Working Hypothesis, Provenance, Field Guide, Divergence, Later
Observations) plus the closing field note, matching the approved draft verbatim.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text is in exported constants, not in `//` comments

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about the sort-order argument renders last

### Requirement: All ten artifacts appear, mapped to their blocks

The chapter SHALL render the eight visual moments from the approved artifact list, in their assigned
blocks, using the files under
`src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`:

| Moment | Block              | Files                                                                                         |
| ------ | ------------------ | --------------------------------------------------------------------------------------------- |
| 1      | Masthead hero      | `cyber-risk-scorecard_hero.png`                                                               |
| 2      | Field Guide        | `cyber-risk-scorecard_translation.png`                                                        |
| 3      | Field Guide        | `admin_cyber-risk-scorecard_risk-vectors.png` + `cyber-risk-scorecard_hero.png`               |
| 4      | Field Guide        | `cyber-risk-scorecard_risk-vector-analysis.png`                                               |
| 5      | Field Guide        | `admin_cyber-risk-scorecard_analyst-products.png` + `cyber-risk-scorecard_product-bundle.png` |
| 6      | Divergence         | `cyber-risk-scorecard_compliance-grid.png`                                                    |
| 7      | Later Observations | `cyber-risk-scorecard_info-icon.png`                                                          |
| 8      | Later Observations | `report-state-model.svg` + `admin_cyber-risk-scorecard_analyst-grid.png`                      |

Moments 3, 5, and 8 are pairs; the analyst or diagram half is listed first and SHALL appear first
when stacked. `cyber-risk-scorecard_hero.png` SHALL be used twice: once as the masthead hero and
once as the right half of moment 3.

#### Scenario: Every artifact is present

- **WHEN** a visitor loads the chapter
- **THEN** ten images render across the eight moments, in the blocks listed above

#### Scenario: Analyst half leads each pair

- **WHEN** a pair stacks below `md`
- **THEN** the analyst view (or the state model diagram for moment 8) appears above the client view

### Requirement: Each artifact carries its approved caption

Each of the eight moments SHALL render the caption written for it in the approved artifact list, for
example "The client's headline number, and the only score they see." for moment 1 and "The Update
button is the only path across the boundary. Nothing refreshes on its own." for moment 8.

#### Scenario: Captions match the approved list

- **WHEN** a visitor reads the chapter's captions
- **THEN** all eight match the approved caption text, in order

### Requirement: The chapter states one outcome number

The Later Observations block SHALL state the shipped numbers: 73 customers over four years, 64,589
supplier reports generated, 64,285 delivered.

#### Scenario: Numbers are visible

- **WHEN** a visitor reads Later Observations
- **THEN** the report volume figures appear in the copy
