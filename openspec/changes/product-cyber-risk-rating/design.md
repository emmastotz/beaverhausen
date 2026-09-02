## Context

`WhiteHawkProducts` links to five stub pages. Cyber Risk Rating is the first with finished copy and
all ten artifacts exported and committed. Four more tier 1 and tier 2 chapters follow the same
template (`src/content/products-template.md`), so the block structure is being built as a shared,
data-driven component set rather than hand-written per chapter.

Existing pieces this leans on: `CaseStudyLayout`, `Paragraph` and `FieldNote` from
`src/components/portfolio/case-studies/`, `AutoH` / `AutoHProvider`, `AppLink`, and the artifact
frame already used inside `Flipbook`.

Constraint from the template's non-negotiables: every artifact gets a caption, every tier 1 chapter
states one number, and no em-dashes appear in copy.

## Goals / Non-Goals

**Goals:**

- One page live at `/portfolio/whitehawk/cyber-risk-rating` with the approved copy and all ten
  artifacts.
- A shared component set at `src/components/portfolio/products/` such that chapters 2 to 5 need only
  a content module and a five-line page.
- Artifacts presented identically to the flipbook, with captions added.
- No new dependencies, no GSAP, no scroll machinery.

**Non-Goals:**

- Trimming the copy, a redirect for the old `platform` URL, a lightbox, or the tier 2 short template.
  Tier 2 gets modeled in the type but is not exercised until chapter 4.

## Decisions

### Chapter is data, rendered by one component

`src/content/product-cyber-risk-rating.ts` exports a `ProductChapter` object. A single
`<ProductChapter chapter={...} />` renders it. The alternative, chapter-specific JSX like
`WhiteHawkCaseStudy`'s `Content` switch, is what the flipbook does and is fine for five chapters of
one case study, but here the whole point of building now is that chapters 2 to 5 become content
edits. The switch approach would need copy-pasting the block scaffolding five times.

Shape, in `src/components/portfolio/products/types.ts`:

```ts
export type Artifact = {
  src: string
  alt: string
}

export type ArtifactSlot =
  | { kind: 'single'; artifact: Artifact; caption: string }
  | { kind: 'pair'; artifacts: [Artifact, Artifact]; caption: string }

export type ChapterBlock = {
  heading: string
  paragraphs: string[]
  artifacts?: ArtifactSlot[]
}

export type ProductChapter = {
  title: string
  masthead: {
    specimen: string
    hypothesis: string
    provenance: string
    hero: Artifact
    heroCaption: string
  }
  blocks: ChapterBlock[]
  fieldNote: string
}
```

`caption` is required on every slot, so an artifact without a caption fails `tsc -b`. That is the
non-negotiable enforced by the type system rather than by review.

Tier 2 needs no separate type: it is a chapter with a shorter `blocks` array and no `masthead` hero
pair layout. Deferring that until chapter 4 rather than adding a `tier` discriminant now, since the
visual treatment tier 2 wants ("no hero container, single column, smaller title") is not yet
designed.

### Component split

Shared, at `src/components/portfolio/products/`:

| File                  | Job                                                                      |
| --------------------- | ------------------------------------------------------------------------ |
| `types.ts`            | The schema above                                                         |
| `ProductChapter.tsx`  | Title, `AutoHProvider`, masthead, blocks in order, field note, back link |
| `ChapterMasthead.tsx` | Two-column copy plus hero at `md`, stacked below                         |
| `ChapterBlock.tsx`    | Heading plus `Paragraph` list plus artifact slots                        |
| `ChapterArtifact.tsx` | The flipbook frame plus caption; handles both `single` and `pair`        |

Chapter-specific, at `src/components/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`:
`CyberRiskRatingChapter.tsx`, which imports the ten assets, builds the `ProductChapter` object from
the content module's strings, and renders `<ProductChapter>`. Asset imports live here rather than in
the content module because content modules elsewhere in the project are strings only, and keeping
Vite asset imports next to the component preserves that.

### Artifact frame copied, not extracted

`ChapterArtifact` reproduces the flipbook's frame classes:

```tsx
<div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
  <img
    src={src}
    alt={alt}
    className="pointer-events-none size-full object-contain"
  />
</div>
```

Not refactoring `WhiteHawkCaseStudy` to use `ChapterArtifact`: the flipbook's usages vary (`max-w-md`
vs `max-w-lg`, `object-contain` vs `object-cover`, with and without `shadow`) and it has no captions,
so extraction would mean a props matrix serving one caller each. If the flipbook frame later drifts
from the chapter frame, that is a visual bug worth one shared component, not before.

`max-w-md` is the flipbook default but reads narrow for a dense compliance grid at desktop width. The
frame takes an optional `width` of `'md' | 'lg' | 'xl'` defaulting to `md`, so the wide grid and the
state model diagram can breathe without each caller writing classes.

### Pair layout

`grid gap-4 md:grid-cols-2`, with `items-start`. Source order is stack order, so listing the analyst
half first satisfies "analyst first on mobile" with no CSS ordering. One `<figcaption>` sits below
the grid inside the same `<figure>`.

### Route swap over rename-in-place

`src/pages/portfolio/whitehawk/platform/` is deleted and
`src/pages/portfolio/whitehawk/cyber-risk-rating/` added. Per the repo's git rules this is a create,
then migrate callers (`App.tsx`, `PRODUCTS`), then delete: three commits, each green.

### Copy stays verbatim

The draft is 600 words, the top of the tier 1 range. Shipping it as-is and trimming later in the
content file keeps this change about structure. The one edit made in transcription: the draft's
markdown headings become the `heading` fields, and the "Artifact list", "state model", and "Open
items" sections at the bottom of the draft are notes to the author, not page copy, so they are
dropped from the content module. The state model facts they contain are already carried by moment 8
and its caption.

## Risks / Trade-offs

- **The shared component set is speculative until chapter 2 lands.** → It is five small presentational
  files with no branching beyond `single` vs `pair`. If chapter 2 wants a different shape, changing
  five files is cheap; nothing else depends on them.
- **`/portfolio/whitehawk/platform` becomes a dead URL and the app has no not-found route.** → Nothing
  links to it and the page was a "coming soon" stub, so the loss is zero. React Router renders its
  default error element. Adding a real 404 is worth its own change.
- **Ten uncompressed PNGs on one page.** → They are Vite-imported, hashed, and fetched normally rather
  than inlined, so they do not enter the JS bundle. If the page feels heavy, `loading="lazy"` on
  everything below the hero is a one-line follow-up.
- **The flipbook frame was designed for a narrow page column; some artifacts are dense screenshots.** →
  The `width` prop covers it. The template's own rule is that an illegible artifact should be cropped
  or rebuilt, which is an asset-side fix if `xl` is still not enough.
- **Captions are required by type but their accuracy is not checkable.** → The spec pins the eight
  caption strings to the approved list so a reviewer can diff them.

## Migration Plan

1. Add the shared component set and the typed content module. Nothing renders them yet; build stays
   green.
2. Add `CyberRiskRatingChapter` and the new page. Add the route alongside the existing `platform`
   route.
3. Point `PRODUCTS` at `cyber-risk-rating` with its thumbnail.
4. Delete the `platform` page and its route.

Rollback is reverting steps 3 and 4, which restores the stub without touching the new components.

## Open Questions

- The draft's "Open items" flags that Products Needed may be a skippable or blocked state rather than
  a linear step. The exported `report-state-model.svg` draws it as a chain. If that is wrong, the SVG
  needs redrawing; nothing in this change depends on which it is.
- Tier 2's visual treatment is described in the template but not designed. Resolved when chapter 4 is
  proposed.
