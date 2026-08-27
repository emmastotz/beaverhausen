## 1. Shared chapter components

Each task in this group is its own commit (`feat`). Build stays green throughout: nothing renders
these until group 3.

- [ ] 1.1 Add `src/content/products.ts`: move `Product` and `PRODUCTS` out of
      `case-study-whitehawk.ts`, and add the chapter schema (`Artifact`, `ArtifactWidth`,
      `ArtifactSlot`, `ChapterBlock`, `ProductChapter`). `caption` is required on every slot. Update
      the `WhiteHawkProducts` import.
- [ ] 1.2 Add `src/components/portfolio/products/ChapterArtifact.tsx`. Renders a `<figure>` using the
      flipbook frame classes (`mx-auto mt-2 mb-8 aspect-auto overflow-hidden rounded-md shadow` on the
      container, `pointer-events-none size-full object-contain` on the `<img>`) plus a
      `<figcaption>`. Handles `kind: 'single'` and `kind: 'pair'`; pair uses
      `grid gap-4 items-start md:grid-cols-2` with source order as stack order and one shared caption
      below both halves. Optional `width` prop `'md' | 'lg' | 'xl'` defaulting to `md`.
- [ ] 1.3 Add `src/components/portfolio/products/ChapterBlock.tsx`. Heading via `AutoH`, paragraphs
      via the existing `Paragraph` component, then artifact slots via `ChapterArtifact`.
- [ ] 1.4 Add `src/components/portfolio/products/ChapterMasthead.tsx`. Specimen, hypothesis, and
      provenance paragraphs in a left column with the hero artifact to their right at `md` and wider;
      single column with copy first below `md`.
- [ ] 1.5 Add `src/components/portfolio/products/ProductChapter.tsx`. Title via `AutoH`, then
      `AutoHProvider` around `ChapterMasthead`, the blocks in order, the closing `FieldNote`, and an
      `AppLink` back to `/portfolio/whitehawk`.
- [ ] 1.6 Verify no raw hex values and no hardcoded `<h1>`-`<h6>` in the five new files.

## 2. Chapter content

- [ ] 2.1 Rewrite `src/content/product-cyber-risk-rating.ts` as a typed `ProductChapter` export:
      title, the six body blocks, and the field note, copied verbatim from the draft comments. Drop
      the draft's "Artifact list", "state model", and "Open items" trailing sections; they are author
      notes, not page copy. Confirm no em-dashes survive transcription.
- [ ] 2.2 Import the ten assets in the same module and wire them into the blocks per the
      artifact-to-block table in the spec, with the eight approved captions and alt text.
      `cyber-risk-scorecard_hero.png` is used twice.

## 3. Cyber Risk Rating chapter

- [ ] 3.1 Give the wide artifacts (compliance grid, state model pair, analyst grid) a `width` above
      `md` so they are legible at published size.
- [ ] 3.2 Add `src/pages/portfolio/whitehawk/cyber-risk-rating/index.tsx`: `CaseStudyLayout` wrapping
      `<ProductChapter chapter={CYBER_RISK_RATING} />`, no local state.
- [ ] 3.3 Register `/portfolio/whitehawk/cyber-risk-rating` in `src/App.tsx`, leaving the `platform`
      route in place for now.

## 4. Swap the products grid entry

- [ ] 4.1 In `src/content/products.ts`, change the first `PRODUCTS` entry to
      `{ id: 'cyber-risk-rating', name: 'Cyber Risk Rating', thumbnail: <imported thumbnail> }`.
      Widen `Product['thumbnail']` if the imported asset type does not already satisfy
      `string | null`.
- [ ] 4.2 Confirm the other four entries still render placeholders at the same dimensions.

## 5. Remove the platform stub

- [ ] 5.1 Remove the `platform` route and its import from `src/App.tsx`.
- [ ] 5.2 Delete `src/pages/portfolio/whitehawk/platform/index.tsx`.

## 6. Verify

- [ ] 6.1 `pnpm run format` and `pnpm run lint --fix`.
- [ ] 6.2 `pnpm build` (`tsc -b && vite build`) passes.
- [ ] 6.3 Load `/portfolio/whitehawk/cyber-risk-rating` and check: all ten images render, all eight
      captions are present and match the approved list, the back link fires the water transition.
- [ ] 6.4 At a narrow viewport, confirm each pair stacks with the analyst or diagram half on top and
      the page has no horizontal scroll. Check the same in dark mode.
- [ ] 6.5 Confirm `/portfolio/whitehawk` shows the Cyber Risk Rating thumbnail and that its entry
      navigates to the new route.