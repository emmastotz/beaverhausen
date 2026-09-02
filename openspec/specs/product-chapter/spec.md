# product-chapter Specification

## Purpose

Defines the reusable structure behind the product case study pages that sit beneath a brand case
study flipbook. A chapter is typed data rendered by one shared component set, so adding a product
page means writing a content module and a thin page rather than new layout code. Covers block order,
the masthead, how prose and artifacts interleave, artifact framing and captions, and the type and
color rules the pages share.

## Requirements

### Requirement: Chapter data is a typed schema, not markup

A product chapter SHALL be described by exported constants from a content module under
`src/content/`, typed against `ProductChapter` in `src/content/products.ts`. The shared components in
`src/components/portfolio/products/` SHALL render a chapter from that data alone, so adding a chapter
requires a content module and a thin page, not new layout code.

#### Scenario: A chapter renders from content only

- **WHEN** a content module exports a `ProductChapter` with its title, masthead, blocks, and field note
- **THEN** `<ProductChapter chapter={...} />` renders the full page without chapter-specific layout code

#### Scenario: TypeScript rejects a malformed chapter

- **WHEN** a content module omits a required field such as an artifact caption
- **THEN** `tsc -b` fails

### Requirement: Tier 1 block order

A tier 1 chapter SHALL render, in order: the title, an optional subtitle, the masthead, each block in
array order, the closing field note, and a link back to the case study. Each block SHALL render its
heading followed by its content in array order.

#### Scenario: Page order follows the template

- **WHEN** a visitor loads a tier 1 product chapter
- **THEN** title, masthead, blocks, and field note appear in that order

#### Scenario: Subtitle is optional

- **WHEN** a chapter omits `subtitle`
- **THEN** no subtitle element renders and the masthead follows the title directly

### Requirement: The masthead carries three fixed subheads and a hero artifact

The masthead SHALL render the hero artifact followed by three labelled entries in this order:
Specimen, Working Hypothesis, Provenance. The three labels are fixed by the tier 1 template and are
not content fields. `masthead.hero` SHALL be an `ArtifactSlot`, so the hero takes the same width scale
and caption treatment as every other artifact.

#### Scenario: Subheads are present and ordered

- **WHEN** the masthead renders
- **THEN** the headings Specimen, Working Hypothesis, and Provenance appear above their paragraphs, in
  that order

#### Scenario: Hero uses the shared artifact treatment

- **WHEN** the masthead hero specifies a `width`
- **THEN** it renders at that width, in the same frame and with the same caption styling as artifacts
  inside blocks

### Requirement: Blocks interleave prose and artifacts

A block's `content` SHALL be an ordered array whose entries are either `{ kind: 'prose' }` or an
`ArtifactSlot`. Rendering SHALL preserve array order, so a sentence can sit directly above the
artifact it describes.

#### Scenario: A sentence sits above its artifact

- **WHEN** a block lists a prose entry immediately followed by an artifact
- **THEN** that paragraph renders directly above that artifact

#### Scenario: A block may have no artifacts

- **WHEN** a block's content contains only prose entries
- **THEN** the block renders its heading and paragraphs with no figure elements

### Requirement: Prose is capped, artifacts break out

Prose (title, subtitle, block headings, paragraphs, field note, and artifact captions) SHALL be
constrained to `max-w-3xl` and centered. Artifacts SHALL NOT be constrained to the text column: the
`width` scale resolves to `max-w-3xl`, `max-w-4xl`, and the full chapter column, defaulting to the
narrowest.

#### Scenario: A wide artifact exceeds the text column

- **WHEN** an artifact specifies a width above the default
- **THEN** it renders wider than the surrounding paragraphs

#### Scenario: Captions stay in the text column

- **WHEN** a full-width artifact renders
- **THEN** its caption is still capped at the prose width rather than spanning the artifact

### Requirement: Body copy reuses the existing case study prose components

Chapter paragraphs SHALL render through `Paragraph` and the closing aside through `FieldNote`, both
from `src/components/portfolio/case-studies/`. Both SHALL accept a `className` override so a chapter
can set its own text color without changing the default the flipbook relies on.

#### Scenario: Emphasis markers work in chapter copy

- **WHEN** a chapter paragraph wraps a phrase in `*asterisks*`
- **THEN** that phrase renders as `<em>`, the same as in the flipbook

#### Scenario: Flipbook rendering is unchanged

- **WHEN** `Paragraph` or `FieldNote` is used without a `className`
- **THEN** it renders `text-beaver`, exactly as before the override existed

### Requirement: Headings use AutoH

Chapter headings SHALL be emitted by `AutoH` inside `AutoHProvider`. No `<h1>` through `<h6>` tag
SHALL be hardcoded in the chapter components. The type scale SHALL descend down the page: `BaseT1`
for the title, `BaseT2` for block headings, `BaseT3` for masthead subheads.

#### Scenario: Heading levels descend correctly

- **WHEN** a chapter renders its title and its block headings
- **THEN** the title is one level above the block and masthead headings in the document outline

### Requirement: Artifacts render in the flipbook frame

Every artifact SHALL render inside the frame the flipbook uses: a centered container with
`overflow-hidden rounded-md shadow` holding an `<img>` with `pointer-events-none size-full
object-contain`.

#### Scenario: Artifact matches flipbook presentation

- **WHEN** an artifact renders in a chapter
- **THEN** its container and image classes match the flipbook's artifact frame

#### Scenario: Artifacts are not interactive

- **WHEN** a visitor clicks an artifact image
- **THEN** nothing happens; there is no lightbox, zoom, or link

### Requirement: Every artifact has a caption and alt text

Each artifact SHALL render a visible caption below its frame and SHALL carry non-empty `alt` text.
`caption` is a required field on every `ArtifactSlot`, so an artifact without one fails type checking.
A pair SHALL carry one caption for both halves, positioned below them.

#### Scenario: Caption is visible below the artifact

- **WHEN** an artifact renders
- **THEN** a caption is visible directly beneath its frame

#### Scenario: Pair carries a single shared caption

- **WHEN** a pair renders
- **THEN** exactly one caption appears, below both halves, at every viewport width

### Requirement: Pairs are side by side by default and can be stacked

A `pair` SHALL render its two artifacts side by side at `md` and wider and stacked below `md`, with
the first-listed artifact on top. Setting `stacked` SHALL keep them in one column at every width, for
pairs too dense to read at half width. Neither arrangement SHALL introduce horizontal page scrolling.

#### Scenario: Pair is side by side on desktop

- **WHEN** a pair without `stacked` renders at `md` or wider
- **THEN** its two artifacts sit in two columns

#### Scenario: Stacked pair stays in one column

- **WHEN** a pair with `stacked` renders at any width
- **THEN** its two artifacts sit one above the other, first-listed on top, sharing one caption

### Requirement: Chapters render inside CaseStudyLayout with a back link

A product chapter page SHALL use `CaseStudyLayout` and SHALL link back to the parent case study using
`AppLink` or `TransitionLink`.

#### Scenario: Back link fires the water transition

- **WHEN** a visitor clicks the back link on a product chapter
- **THEN** the water-fill transition fires before the case study page renders

### Requirement: Colors come from theme tokens

Chapter components SHALL use Tailwind token utilities for all colors; no raw hex values SHALL appear.
In dark mode headings SHALL render `iron-orange`, body copy `enamel`, and captions `cream`.

#### Scenario: No raw hex in chapter components

- **WHEN** the shared chapter components are inspected
- **THEN** every color class references a `@theme` token
