## MODIFIED Requirements

### Requirement: Thumbnail placeholder is trivially swappable
A product entry with `thumbnail: null` SHALL render a styled placeholder rectangle. Setting
`thumbnail` to a non-null imported asset SHALL render that image with identical dimensions. The
Cyber Risk Rating entry SHALL use `cyber-risk-scorecard_thumbnail.png`; the remaining four entries
stay `null` until their chapters ship.

#### Scenario: Null thumbnail renders a placeholder
- **WHEN** a product's `thumbnail` field is `null`
- **THEN** the entry renders a grey/muted rectangle in place of the image

#### Scenario: Non-null thumbnail renders the image
- **WHEN** a product's `thumbnail` field is a non-null imported asset
- **THEN** the entry renders an `<img>` with `src` set to that asset

#### Scenario: Cyber Risk Rating shows its real thumbnail
- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** the Cyber Risk Rating entry shows the scorecard thumbnail and the other four show
  placeholders, all at the same size

### Requirement: Product entries link to individual product pages
Each product entry SHALL link to `/portfolio/whitehawk/<id>` via `TransitionLink` (or `AppLink`)
so the water-fill transition fires on navigation. The first entry's `id` SHALL be
`cyber-risk-rating`.

#### Scenario: Clicking a product entry navigates with transition
- **WHEN** a visitor clicks a product entry
- **THEN** the water-fill page transition fires and the visitor is taken to
  `/portfolio/whitehawk/<id>`

#### Scenario: Cyber Risk Rating entry targets its chapter
- **WHEN** a visitor clicks the Cyber Risk Rating entry
- **THEN** they are taken to `/portfolio/whitehawk/cyber-risk-rating`

#### Scenario: Middle-click or right-click opens the URL directly
- **WHEN** a visitor middle-clicks or right-clicks a product entry
- **THEN** the browser opens `/portfolio/whitehawk/<id>` in a new tab without triggering the
  water-fill transition

### Requirement: Products section renders below the flipbook
The WhiteHawk page SHALL render a products section below the flipbook (`WhiteHawkCaseStudy`) and
above `CaseStudyNav`. The section SHALL display exactly five product entries sourced from `PRODUCTS`
in `src/content/case-study-whitehawk.ts`. The first entry SHALL be named `Cyber Risk Rating`.

#### Scenario: Products section is present in document flow
- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** a grid of five product entries is visible below the flipbook content

#### Scenario: Each entry shows a name and thumbnail area
- **WHEN** the products section is rendered
- **THEN** each of the five entries shows the product name and a thumbnail area (image or
  placeholder rectangle)