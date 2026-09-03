## Why

Cyber Risk Portfolio is the second WhiteHawk product chapter and the first to be written since the
shared chapter components landed. Its copy is drafted and all seven assets are exported, so it can
replace the `engage` stub now. It is also the test of whether the `product-chapter` capability
actually pays off: if this chapter needs no new components, the claim that chapters 3 to 5 are
content-only holds.

## What Changes

- Replace the `engage` stub with a full tier 1 product chapter at
  `/portfolio/whitehawk/cyber-risk-portfolio`. **BREAKING**: `/portfolio/whitehawk/engage` no longer
  resolves. Nothing links to it outside `PRODUCTS`.
- Convert `src/content/product-cyber-risk-portfolio.ts` from commented draft into a typed
  `ProductChapter`, following `src/content/product-cyber-risk-rating.ts`. Copy ships verbatim.
- Title splits into `title: 'Cyber Risk Portfolio'` and `subtitle: 'Where Risk Concentrates'`,
  matching the shipped Cyber Risk Rating chapter.
- Wire the five visual moments across six image files. Moment 2 is the chapter's only `pair`: the
  Cyber Risk Rating gauge first, the portfolio gauge second, side by side at `md` and wider.
- Update the second `PRODUCTS` entry: `id` `engage` becomes `cyber-risk-portfolio`, `name` becomes
  `Cyber Risk Portfolio`, `thumbnail` becomes `portfolio_report-thumbnail.png` instead of `null`.
- **No new shared components.** The `product-chapter` capability already covered everything this
  chapter needed, including the side-by-side pair and the width scale. The artifact frame did lose its
  `overflow-hidden rounded-md shadow` alongside this work, but that is a styling decision applied to
  every chapter and is recorded as a `product-chapter` delta, not as something this chapter forced.

Before:

```ts
{ id: 'engage', name: 'Engage', thumbnail: null },
```

After:

```ts
{
  id: 'cyber-risk-portfolio',
  name: 'Cyber Risk Portfolio',
  thumbnail: portfolioReportThumb,
},
```

## Capabilities

### New Capabilities

- `whitehawk-cyber-risk-portfolio-page`: the Cyber Risk Portfolio chapter. Route, copy blocks,
  artifact-to-block mapping, captions, and the outcome numbers.

### Modified Capabilities

- `whitehawk-product-stub-pages`: the `engage` stub is removed, leaving three stubs (`comply`,
  `client-a`, `client-b`).
- `whitehawk-products-section`: a second grid entry gains a real thumbnail and a renamed id.

## Non-goals

- No changes to `product-chapter` or the components under `src/components/portfolio/products/`. If
  this chapter cannot be built without touching them, that is a finding worth reporting rather than
  a change to make quietly.
- No leadership proof. The products template designates this as the leadership chapter, but that
  claim is moving to a different case study, so this chapter ships as a systems and reuse chapter
  only. Updating the template's chapter map is a separate edit.
- No trim pass on the copy, and no rewriting of the draft captions.
- No redirect from `/portfolio/whitehawk/engage`. The app still has no not-found route.
- No chapters 3 to 5, and no tier 2 treatment.
- No new dependencies and no GSAP. The chapter is static content.

## Impact

- `src/content/product-cyber-risk-portfolio.ts` (rewritten from comments into a typed export)
- `src/content/products.ts` (second `PRODUCTS` entry and its thumbnail import)
- `src/pages/portfolio/whitehawk/engage/` deleted,
  `src/pages/portfolio/whitehawk/cyber-risk-portfolio/` added
- `src/App.tsx` (route swap)
- `openspec/specs/whitehawk-product-stub-pages/spec.md` and
  `openspec/specs/whitehawk-products-section/spec.md` (delta specs)
- Seven image assets already committed under
  `src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-portfolio/`. They are imported
  through Vite, so they are hashed and fetched by the browser rather than inlined.
