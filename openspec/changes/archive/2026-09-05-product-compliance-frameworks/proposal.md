## Why

Compliance Frameworks is the third WhiteHawk product chapter and the last of the tier 1 set. Its copy
is complete and all seven assets are exported, so it can replace the `comply` stub now. It is the
constraint chapter: the one that argues a boundary, that the interaction generalized across two
standards while the framework model deliberately did not.

It is also the second consecutive test of the `product-chapter` capability. Cyber Risk Portfolio
needed no new components; if this chapter does not either, the claim that chapters are content-only
holds across three very different layouts.

## What Changes

- Replace the `comply` stub with a full tier 1 product chapter at
  `/portfolio/whitehawk/compliance-frameworks`. **BREAKING**: `/portfolio/whitehawk/comply` no longer
  resolves. Nothing links to it outside `PRODUCTS`.
- Convert `src/content/product-compliance-frameworks.ts` from commented draft into a typed
  `ProductChapter`, following the two shipped chapters. Copy ships verbatim.
- Title splits into `title: 'Compliance Frameworks'` and
  `subtitle: 'Shared Language, Different Rules'`. The draft's alternate heading, "Structure Carries
  Meaning", is dropped.
- Wire four visual moments across six image files. Moments 2 and 4 are `pair` slots, both leading
  with CMMC so the reader meets the two frameworks in the same order twice.
- Update the third `PRODUCTS` entry: `id` `comply` becomes `compliance-frameworks`, `name` becomes
  `Compliance Frameworks`, `thumbnail` becomes `frameworks_thumbnail.png` instead of `null`.
- **No new shared components expected.** The `product-chapter` capability should already cover this
  chapter. If it does not, that is a finding to report rather than a change to make quietly.

Before:

```ts
{ id: 'comply', name: 'Comply', thumbnail: null },
```

After:

```ts
{
  id: 'compliance-frameworks',
  name: 'Compliance Frameworks',
  thumbnail: frameworksThumb,
},
```

## Capabilities

### New Capabilities

- `whitehawk-compliance-frameworks-page`: the Compliance Frameworks chapter. Route, copy blocks,
  artifact-to-block mapping, pair ordering, captions, and the outcome numbers.

### Modified Capabilities

- `whitehawk-product-stub-pages`: the `comply` stub is removed, leaving two stubs (`client-a`,
  `client-b`), both tier 2.
- `whitehawk-products-section`: a third grid entry gains a real thumbnail and a renamed id.

## Non-goals

- No changes to `product-chapter` or the components under `src/components/portfolio/products/`.
- No trim pass on the copy, and no rewriting of the drafted captions.
- No redirect from `/portfolio/whitehawk/comply`. The app still has no not-found route.
- No tier 2 chapters. `client-a` and `client-b` remain stubs and need the short-form treatment the
  template describes, which is not yet designed.
- No correction to `products-template.md`, which still calls this chapter "Maturity Roadmap (CMMC and
  Essential 8)" and still assigns leadership proof to Cyber Risk Portfolio. Both are stale; fixing
  the template is a separate edit.
- No new dependencies and no GSAP. The chapter is static content.

## Impact

- `src/content/product-compliance-frameworks.ts` (rewritten from comments into a typed export)
- `src/content/products.ts` (third `PRODUCTS` entry and its thumbnail import)
- `src/pages/portfolio/whitehawk/comply/` deleted,
  `src/pages/portfolio/whitehawk/compliance-frameworks/` added
- `src/App.tsx` (route swap)
- `openspec/specs/whitehawk-product-stub-pages/spec.md` and
  `openspec/specs/whitehawk-products-section/spec.md` (delta specs)
- Seven image assets already committed under
  `src/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/`. They are imported
  through Vite, so they are hashed and fetched by the browser rather than inlined.
