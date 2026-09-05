## MODIFIED Requirements

### Requirement: The masthead carries three fixed subheads and a hero artifact

The masthead SHALL render three labelled entries in this order: Specimen, Working Hypothesis,
Provenance. The three labels are fixed by the tier 1 template and are not content fields.
`masthead.hero` SHALL be an `ArtifactSlot`, so the hero takes the same width scale and caption
treatment as every other artifact.

The hero SHALL render before the three entries by default. Setting `masthead.heroBelow` SHALL render
it after them instead, for a hero tall enough that leading with it pushes the copy off the screen.

#### Scenario: Subheads are present and ordered

- **WHEN** the masthead renders
- **THEN** the headings Specimen, Working Hypothesis, and Provenance appear above their paragraphs, in
  that order

#### Scenario: Hero uses the shared artifact treatment

- **WHEN** the masthead hero specifies a `width`
- **THEN** it renders at that width, in the same frame and with the same caption styling as artifacts
  inside blocks

#### Scenario: Hero leads by default

- **WHEN** a chapter omits `heroBelow`
- **THEN** the hero renders above the three entries

#### Scenario: A tall hero follows the copy

- **WHEN** a chapter sets `heroBelow`
- **THEN** the three entries render first and the hero after them, at every width

### Requirement: Pairs are side by side by default and can be stacked

A `pair` SHALL render its two artifacts side by side at `md` and wider and stacked below `md`, with
the first-listed artifact on top. Setting `stacked` SHALL keep them in one column at every width, for
pairs too dense to read at half width. Neither arrangement SHALL introduce horizontal page scrolling.

An artifact MAY carry its own `width`, which narrows it inside the slot. This is for a stacked pair
whose two halves want different widths; without it both halves inherit the slot's width.

#### Scenario: Pair is side by side on desktop

- **WHEN** a pair without `stacked` renders at `md` or wider
- **THEN** its two artifacts sit in two columns

#### Scenario: Stacked pair stays in one column

- **WHEN** a pair with `stacked` renders at any width
- **THEN** its two artifacts sit one above the other, first-listed on top, sharing one caption

#### Scenario: One half of a stacked pair is narrowed

- **WHEN** an artifact inside a slot specifies its own `width`
- **THEN** that image renders at that width, centered, while the other inherits the slot's width

### Requirement: Artifacts render in the flipbook frame

Every artifact SHALL render inside a centered, `object-contain` frame that scales the image to the
slot's width without cropping it. The frame SHALL NOT add a border, rounded corners, a shadow, or any
other decoration of its own: these screenshots carry their own chrome, and a second frame around it
reads as a frame within a frame.

The frame SHALL NOT carry its own vertical margins. Every container that holds artifacts already
spaces its children, so margins on the figure double-space against them. Vertical rhythm belongs to
the container.

#### Scenario: Artifact is presented undecorated

- **WHEN** an artifact renders in a chapter
- **THEN** the image scales to the slot width with no border, corner radius, or shadow around it

#### Scenario: Spacing comes from the container

- **WHEN** an artifact renders between two paragraphs in a block
- **THEN** the gaps above and below it match the block's own spacing, with no extra margin from the
  figure

#### Scenario: Artifacts are not interactive

- **WHEN** a visitor clicks an artifact image
- **THEN** nothing happens; there is no lightbox, zoom, or link

### Requirement: Tier 1 block order

A tier 1 chapter SHALL render, in order: the title, an optional subtitle, the masthead, each block in
array order, the closing field note, and a link back to the case study. Each block SHALL render its
heading followed by its content in array order.

The masthead, the blocks, and the field note SHALL share one spaced container, so the gap before the
field note does not depend on whether the last block happened to end with an artifact. The back link
sits outside that container.

#### Scenario: Page order follows the template

- **WHEN** a visitor loads a tier 1 product chapter
- **THEN** title, masthead, blocks, and field note appear in that order

#### Scenario: Subtitle is optional

- **WHEN** a chapter omits `subtitle`
- **THEN** no subtitle element renders and the masthead follows the title directly

#### Scenario: The field note is spaced like a block

- **WHEN** a chapter's last block ends with a paragraph rather than an artifact
- **THEN** the gap before the field note matches the gap between blocks
