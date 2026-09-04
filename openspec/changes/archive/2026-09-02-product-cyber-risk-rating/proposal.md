## Why

The five WhiteHawk product routes are "coming soon" stubs. Cyber Risk Rating is the first tier 1
chapter with finished copy and all ten artifacts exported, so it can become a real page now. Four
more chapters follow the same template, so the block structure is worth building once rather than
five times.

## What Changes

- Replace the `platform` stub with a full tier 1 product chapter at
  `/portfolio/whitehawk/cyber-risk-rating`. **BREAKING**: `/portfolio/whitehawk/platform` no longer
  resolves. Nothing links to it outside `PRODUCTS`.
- Add a reusable product chapter component set at `src/components/portfolio/products/`, driven by a
  typed schema so chapters 2 to 5 are content-only. Anything specific to this chapter lives in
  `src/components/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`.
- Reuse the existing `Paragraph` and `FieldNote` components for body copy and the closing aside
  rather than introducing new prose primitives.
- Render every artifact with the same frame the `Flipbook` uses, plus a caption below it.
- Convert `src/content/product-cyber-risk-rating.ts` from commented draft into a typed content
  module exporting the chapter data. Copy ships verbatim from the draft; the trim pass is a later
  editorial edit to that file only.
- Wire the ten artifacts in `src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`
  into the chapter, including three analyst/client composite pairs that stack vertically below `md`
  with the analyst half first.
- Update the `PRODUCTS` entry: `id` `platform` becomes `cyber-risk-rating`, `name` becomes
  `Cyber Risk Rating`, `thumbnail` becomes the real `cyber-risk-scorecard_thumbnail.png` instead of
  `null`.

Before:

```ts
export const PRODUCTS: Product[] = [
  { id: 'platform', name: 'Platform', thumbnail: null },
  // ...
]
```

After:

```ts
export const PRODUCTS: Product[] = [
  {
    id: 'cyber-risk-rating',
    name: 'Cyber Risk Rating',
    thumbnail: cyberRiskRatingThumb,
  },
  // ...
]
```

The artifact frame is the one already used inside the flipbook, with a caption appended:

```tsx
<div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
  <img
    src={src}
    alt={alt}
    className="pointer-events-none size-full object-contain"
  />
</div>
```

## Capabilities

### New Capabilities

- `product-chapter`: the reusable tier 1 / tier 2 chapter structure. Block ordering, heading
  hierarchy, artifact and artifact-pair rendering, caption requirements, responsive stacking.
- `whitehawk-cyber-risk-rating-page`: the Cyber Risk Rating chapter itself. Route, copy blocks,
  artifact-to-block mapping, captions.

### Modified Capabilities

- `whitehawk-product-stub-pages`: the `platform` stub is removed, so the spec no longer claims five
  stub routes. It now covers the four remaining stubs.
- `whitehawk-products-section`: the products grid now has one entry with a real thumbnail and a
  renamed id, so the "trivially swappable placeholder" requirement gains a concrete case.

## Non-goals

- No trim pass on the copy. 600 words is inside the 450 to 600 tier 1 range; editing is a separate
  pass on the content file.
- No chapters 2 to 5. The component set is built to serve them, but no content or routes are added.
- No redirect from `/portfolio/whitehawk/platform`. The app has no not-found route today and adding
  one is out of scope.
- No live interactive component in place of a screenshot (the deferred upgrade noted in the draft).
  WhiteHawk is Vue 3; rebuilding in React is its own change.
- No branch in the report state model diagram for the "Products Needed" open item. The exported SVG
  ships as-is.
- No lightbox, zoom, or click-to-enlarge on artifacts. The flipbook frame sets `pointer-events-none`
  and this follows it.
- No new dependencies and no GSAP work. The chapter is static content.

## Impact

- `src/content/product-cyber-risk-rating.ts` (rewritten from comments into typed exports)
- `src/content/case-study-whitehawk.ts` (`PRODUCTS` entry)
- `src/components/portfolio/products/` (new shared chapter components)
- `src/components/portfolio/case-studies/whitehawk/products/cyber-risk-rating/` (chapter-specific
  composition; directory already exists and is empty)
- `src/pages/portfolio/whitehawk/platform/` deleted,
  `src/pages/portfolio/whitehawk/cyber-risk-rating/` added
- `src/App.tsx` (route swap)
- `openspec/specs/whitehawk-product-stub-pages/spec.md` and
  `openspec/specs/whitehawk-products-section/spec.md` (delta specs)
- Ten image assets already committed under
  `src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`. They are imported
  through Vite, so they are hashed and fetched by the browser rather than inlined.
