## ADDED Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/compliance-frameworks` SHALL render the Compliance Frameworks tier 1 chapter.
The page component SHALL live at
`src/pages/portfolio/whitehawk/compliance-frameworks/index.tsx` and SHALL be thin: it composes
`CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/compliance-frameworks`
- **THEN** the Compliance Frameworks chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Compliance Frameworks entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

### Requirement: Chapter copy lives in a typed content module

`src/content/product-compliance-frameworks.ts` SHALL export `COMPLIANCE_FRAMEWORKS` as a
`ProductChapter` rather than commented draft text. It SHALL carry the title "Compliance Frameworks",
the subtitle "Shared Language, Different Rules", the three masthead entries, three blocks (Field
Guide, Divergence, Later Observations), and the closing field note.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text is in exported constants, not in `//` comments

#### Scenario: The alternate heading is dropped

- **WHEN** the chapter renders its heading area
- **THEN** the subtitle reads "Shared Language, Different Rules" and "Structure Carries Meaning" does
  not appear

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about the next framework being the first one not built renders last

### Requirement: Four visual moments appear, mapped to their blocks

The chapter SHALL render four artifact slots across six image files, using the assets under
`src/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/`:

| # | Block         | Kind   | File(s)                                              |
| - | ------------- | ------ | ---------------------------------------------------- |
| 1 | Masthead hero | single | `frameworks_hero.png`                                |
| 2 | Field Guide   | pair   | `frameworks_2_cmmc.png` then `frameworks_2_au-e8.png` |
| 3 | Field Guide   | single | `frameworks_3.png`                                   |
| 4 | Divergence    | pair   | `frameworks_4_cmmc.png` then `frameworks_4_au-e8.png` |

Later Observations carries no artifact.

#### Scenario: Every artifact is present

- **WHEN** a visitor loads the chapter
- **THEN** six images render across the four moments, in the blocks listed above

#### Scenario: Later Observations is prose only

- **WHEN** the Later Observations block renders
- **THEN** it contains paragraphs and no figure elements

### Requirement: Both pairs lead with CMMC

Moments 2 and 4 SHALL each be a `pair` whose first artifact is the CMMC view and whose second is the
Essential 8 view. Both SHALL render side by side at `md` and wider so the two frameworks can be
compared directly, and stack below `md` with CMMC on top.

#### Scenario: CMMC leads on desktop

- **WHEN** moment 2 or moment 4 renders at `md` or wider
- **THEN** the CMMC view sits left of the Essential 8 view

#### Scenario: CMMC leads when stacked

- **WHEN** moment 2 or moment 4 renders below `md`
- **THEN** the CMMC view sits above the Essential 8 view, sharing one caption

#### Scenario: The two pairs are ordered consistently

- **WHEN** a visitor reads both pairs
- **THEN** the same framework occupies the same position in each

### Requirement: Every artifact carries a caption and alt text

Each of the four moments SHALL render the caption drafted for it and SHALL carry non-empty alt text
on every image. No caption SHALL be an empty string. Each pair SHALL carry one caption for both
halves.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each of the four moments has a visible, non-empty caption beneath it

### Requirement: The chapter states its outcome numbers

The Later Observations block SHALL state what shipped: Essential 8 live in full, CMMC live at Level 1
with Levels 2 and 3 modeled, 14 further frameworks planned, and the assessments shipping with every
account, 162 at the time of writing. It SHALL also state plainly that completion rates are not yet
measured.

#### Scenario: Numbers are visible

- **WHEN** a visitor reads Later Observations
- **THEN** the account and framework counts appear in the copy

#### Scenario: The unmeasured outcome is not dressed up

- **WHEN** a visitor reads the account count
- **THEN** the copy says how many accounts have the assessments, not how many completed one

### Requirement: The chapter needs no new shared components

The chapter SHALL be buildable from the existing `product-chapter` component set and schema. No new
component, prop, or schema field SHALL be added to support it, and no type in
`src/content/products.ts` SHALL change beyond the `PRODUCTS` entry.

#### Scenario: No new components or schema fields

- **WHEN** the diff for this change is inspected
- **THEN** it adds no component, prop, or field to the shared chapter set, and changes no type in the
  chapter schema

#### Scenario: Shared styling changes are specified separately

- **WHEN** a shared component's appearance changes alongside this chapter
- **THEN** that change is recorded as a `product-chapter` delta, not as a requirement of this page
