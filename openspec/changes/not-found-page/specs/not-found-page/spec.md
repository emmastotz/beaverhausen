## ADDED Requirements

### Requirement: Any unmatched URL renders the not-found page

The router SHALL define a `path: '*'` route rendering `NotFoundPage`. It SHALL be declared last, so
every named route still wins. No unmatched URL SHALL reach React Router's built-in error screen.

#### Scenario: A mistyped path renders the page

- **WHEN** a visitor navigates to a URL matching no route, such as `/portfolio/typo`
- **THEN** the not-found page renders in the site's own design

#### Scenario: A retired product URL renders the page

- **WHEN** a visitor navigates to `/portfolio/whitehawk/platform`, `/engage`, or `/comply`
- **THEN** the not-found page renders rather than a redirect or an error screen

#### Scenario: Named routes still win

- **WHEN** a visitor navigates to any route the app defines
- **THEN** that route's page renders, not the not-found page

#### Scenario: Deep links survive the GitHub Pages redirect

- **WHEN** a visitor loads an unmatched URL directly, so `public/404.html` redirects into the app
- **THEN** the not-found page renders once the app boots

### Requirement: The page mirrors the contact page's composition

The not-found page SHALL use `DefaultLayout` with `Header`, render the landscape scene behind the
content, and center a `BaseCard` holding the copy, matching `/contact`. It SHALL be thin: composition
and copy only, with no local state.

#### Scenario: The page is recognisably part of the site

- **WHEN** the not-found page renders
- **THEN** the header, landscape scene, and card surface match those on `/contact`

#### Scenario: Heading uses the shared heading machinery

- **WHEN** the page renders its heading
- **THEN** it is emitted by `AutoH`, not a hardcoded `<h1>`

### Requirement: Copy states the situation without apologising

The page SHALL carry the heading "Nothing built here" and the line "No structure at this address.
Either it moved, or it was never built." It SHALL NOT use an error code as its heading, an apology, or
an exclamation.

#### Scenario: Copy is present

- **WHEN** a visitor reads the page
- **THEN** the heading and the single explanatory sentence appear, in the contact page's type
  treatment

### Requirement: One way back, through the page transition

The page SHALL offer exactly one navigation affordance in its content: an `AppLink` (or
`TransitionLink`) to `/portfolio`, so leaving fires the water transition. It points at the portfolio
rather than the landing page because the header already links home, and a visitor who reached a dead
URL was most likely after the work.

#### Scenario: The link returns to the portfolio

- **WHEN** a visitor clicks the link
- **THEN** the water-fill transition fires and the portfolio page renders

#### Scenario: The header still offers full navigation

- **WHEN** the page renders
- **THEN** the site header is present with its usual links, so the visitor is not stranded if they
  ignore the in-content link

#### Scenario: No competing affordances

- **WHEN** the page renders
- **THEN** it offers no search field, suggested links, or second call to action

### Requirement: The scene is duplicated on purpose, not extracted

The page SHALL duplicate the contact page's scene markup and import
`src/components/contact/contact.css` rather than share a component with it. A comment in the page
SHALL record that this is deliberate, because the not-found design is expected to diverge from
contact.

#### Scenario: The duplication is explained where it lives

- **WHEN** a reader opens the not-found page
- **THEN** a comment explains why the scene is copied rather than shared

#### Scenario: The contact page is unchanged

- **WHEN** this change is inspected
- **THEN** `src/pages/contact/index.tsx` and `contact.css` have no modifications

### Requirement: The scene respects reduced motion

The scene's animations SHALL honour `prefers-reduced-motion: reduce`, which `contact.css` already
implements for the clouds, the swimming beaver, its frame cycling, and the water ripple.

#### Scenario: Motion is stilled when the visitor asks

- **WHEN** a visitor with `prefers-reduced-motion: reduce` loads the page
- **THEN** the clouds, beaver, and ripple render without animation
