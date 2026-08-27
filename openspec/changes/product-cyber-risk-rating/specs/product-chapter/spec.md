## ADDED Requirements

### Requirement: Chapter data is a typed schema, not markup
A product chapter SHALL be described by exported constants from a content module under
`src/content/`. The shared components in `src/components/portfolio/products/` SHALL render a chapter
from that data alone, so adding a chapter requires a content module and a thin page, not new
layout code.

#### Scenario: A chapter renders from content only
- **WHEN** a content module exports a chapter's title, blocks, artifacts, and captions
- **THEN** the shared chapter components render the full page without chapter-specific layout code

#### Scenario: TypeScript rejects a malformed chapter
- **WHEN** a content module omits a required field such as an artifact caption
- **THEN** `tsc -b` fails

### Requirement: Tier 1 block order
A tier 1 chapter SHALL render its blocks in this order: title, masthead stack (Specimen, Working
Hypothesis, Provenance, plus the hero artifact), Field Guide, Divergence, Later Observations, and a
closing field note.

#### Scenario: Blocks appear in template order
- **WHEN** a visitor loads a tier 1 product chapter
- **THEN** the six named sections appear in the order above, each with its heading

#### Scenario: Masthead pairs copy with the hero artifact
- **WHEN** the masthead stack renders at `md` and wider
- **THEN** the three copy paragraphs sit in a left column and the hero artifact sits to their right

#### Scenario: Masthead stacks on narrow viewports
- **WHEN** the masthead stack renders below `md`
- **THEN** the copy column and the hero artifact stack in a single column with copy first

### Requirement: Body copy reuses the existing case study prose components
Chapter paragraphs SHALL render through `Paragraph` and the closing aside SHALL render through
`FieldNote` from `src/components/portfolio/case-studies/`. No parallel prose primitives SHALL be
introduced.

#### Scenario: Emphasis markers work in chapter copy
- **WHEN** a chapter paragraph wraps a phrase in `*asterisks*`
- **THEN** that phrase renders as `<em>`, the same as in the flipbook

#### Scenario: Field note matches the flipbook
- **WHEN** the closing field note renders
- **THEN** it uses the same `iron-orange` left rule and italic display type as flipbook field notes

### Requirement: Headings use AutoH
Chapter headings SHALL be emitted by `AutoH` inside `AutoHProvider`. No `<h1>` through `<h6>` tag
SHALL be hardcoded in the chapter components.

#### Scenario: Heading levels descend correctly
- **WHEN** a chapter renders its title and its block headings
- **THEN** the title is one level above the block headings in the document outline

### Requirement: Artifacts render in the flipbook frame
Every artifact SHALL render inside the same frame the flipbook uses: a centered, max-width,
`overflow-hidden rounded-md shadow` container holding an `<img>` with `pointer-events-none
size-full object-contain`.

#### Scenario: Artifact matches flipbook presentation
- **WHEN** an artifact renders in a chapter
- **THEN** its container and image classes match the flipbook's artifact frame

#### Scenario: Artifacts are not interactive
- **WHEN** a visitor clicks an artifact image
- **THEN** nothing happens; there is no lightbox, zoom, or link

### Requirement: Every artifact has a caption and alt text
Each artifact SHALL render a visible caption below its frame and SHALL carry non-empty `alt` text.
An artifact pair SHALL carry one caption for the pair, positioned below both halves. A chapter with
an artifact missing either SHALL fail type checking.

#### Scenario: Caption is visible below the artifact
- **WHEN** an artifact renders
- **THEN** a caption is visible directly beneath its frame

#### Scenario: Pair carries a single shared caption
- **WHEN** an artifact pair renders
- **THEN** exactly one caption appears, below both halves, at every viewport width

### Requirement: Artifact pairs stack on narrow viewports
An artifact pair SHALL render side by side at `md` and wider, and stack into a single column below
`md` with the first-listed half on top. The pair SHALL NOT introduce horizontal page scrolling at
any width.

#### Scenario: Pair is side by side on desktop
- **WHEN** an artifact pair renders at `md` or wider
- **THEN** its two halves sit in two columns

#### Scenario: Pair stacks in listed order on mobile
- **WHEN** an artifact pair renders below `md`
- **THEN** the first-listed half appears above the second, in one column

### Requirement: Chapters render inside CaseStudyLayout with a back link
A product chapter page SHALL use `CaseStudyLayout` and SHALL provide a link back to
`/portfolio/whitehawk` using `AppLink` or `TransitionLink`.

#### Scenario: Back link fires the water transition
- **WHEN** a visitor clicks the back link on a product chapter
- **THEN** the water-fill transition fires before `/portfolio/whitehawk` renders

### Requirement: Colors come from theme tokens
Chapter components SHALL use Tailwind token utilities for all colors. No raw hex values SHALL
appear, and `iron-orange` SHALL be used only for interactive affordances and the field note rule.

#### Scenario: No raw hex in chapter components
- **WHEN** the shared chapter components are inspected
- **THEN** every color class references a `@theme` token