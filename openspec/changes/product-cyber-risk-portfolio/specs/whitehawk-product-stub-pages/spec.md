## MODIFIED Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`

The router SHALL have stub routes for `/portfolio/whitehawk/comply`, `/portfolio/whitehawk/client-a`,
and `/portfolio/whitehawk/client-b`. Each SHALL render a visible placeholder page and SHALL NOT
return a 404. `/portfolio/whitehawk/platform` and `/portfolio/whitehawk/engage` SHALL NOT exist;
those products now ship as full chapters at `/portfolio/whitehawk/cyber-risk-rating` and
`/portfolio/whitehawk/cyber-risk-portfolio`.

#### Scenario: Each remaining product route resolves

- **WHEN** a visitor navigates (via transition or directly) to any of the three remaining stub URLs
- **THEN** a page renders with at minimum the product name and a "coming soon" or placeholder
  message

#### Scenario: The platform route no longer resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/platform`
- **THEN** no route matches and the app renders its standard not-found state

#### Scenario: The engage route no longer resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/engage`
- **THEN** no route matches and the app renders its standard not-found state

#### Scenario: Unknown whitehawk sub-routes still 404

- **WHEN** a visitor navigates to `/portfolio/whitehawk/unknown-slug`
- **THEN** the app renders its standard not-found state (no route matches)
