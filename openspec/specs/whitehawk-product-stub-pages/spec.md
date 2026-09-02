# whitehawk-product-stub-pages Specification

## Purpose

Provides resolvable, placeholder pages for the WhiteHawk product routes whose chapters have not been
written yet, so links from the products section have a real destination.

## Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`
The router SHALL have stub routes for `/portfolio/whitehawk/engage`, `/portfolio/whitehawk/comply`,
`/portfolio/whitehawk/client-a`, and `/portfolio/whitehawk/client-b`. Each SHALL render a visible
placeholder page and SHALL NOT return a 404. `/portfolio/whitehawk/platform` SHALL NOT exist; that
product now ships as the full chapter at `/portfolio/whitehawk/cyber-risk-rating`.

#### Scenario: Each remaining product route resolves
- **WHEN** a visitor navigates (via transition or directly) to any of the four remaining stub URLs
- **THEN** a page renders with at minimum the product name and a "coming soon" or placeholder
  message

#### Scenario: The platform route no longer resolves
- **WHEN** a visitor navigates to `/portfolio/whitehawk/platform`
- **THEN** no route matches and the app renders its standard not-found state

#### Scenario: Unknown whitehawk sub-routes still 404
- **WHEN** a visitor navigates to `/portfolio/whitehawk/unknown-slug`
- **THEN** the app renders its standard not-found state (no route matches)

### Requirement: Stub pages use the water-fill transition
Navigation from any stub page back to `/portfolio/whitehawk` or to other internal routes SHALL use
`TransitionLink` / `AppLink`, not a plain `<a>` or React Router `<Link>`.

#### Scenario: Back link on a stub page triggers the transition
- **WHEN** a visitor clicks a back/return link on a product stub page
- **THEN** the water-fill transition fires before the destination page renders
