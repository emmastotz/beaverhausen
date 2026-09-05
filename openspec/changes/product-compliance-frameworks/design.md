## Context

Two product chapters have shipped from the `product-chapter` capability. The second, Cyber Risk
Portfolio, needed no new components, which is the first evidence the capability does what it claims.
Compliance Frameworks is the third and the last of the tier 1 set, and its layout is the least like
the other two: four moments rather than five or seven, two pairs rather than one, and a Later
Observations block with no artifact at all.

The reference implementations are the two archived changes under `openspec/changes/archive/`. Their
main specs describe the shared components accurately as of the frame simplification.

## Goals / Non-Goals

**Goals:**

- One page live at `/portfolio/whitehawk/compliance-frameworks` with the completed copy and all six
  chapter images.
- Zero changes to the shared chapter components or the chapter schema, for the second chapter running.
- The `comply` stub gone, its grid entry repointed.

**Non-Goals:**

- Tier 2. `client-a` and `client-b` keep their stubs; the short-form template is undesigned.
- Copy edits, caption rewrites, a `comply` redirect, and correcting the stale products template.

## Decisions

### Content module mirrors the two shipped chapters

`src/content/product-compliance-frameworks.ts` exports `COMPLIANCE_FRAMEWORKS: ProductChapter`, with
the six asset imports at the top and the blocks below. Third instance of the same file shape. Still no
abstraction to introduce: three content modules that look alike remain easier to read than one
generator, and nothing is shared between them but the type.

### The title splits, and the alternate is dropped

The draft offered "Shared Language, Different Rules" or "Structure Carries Meaning". The first states
what the chapter actually found, that the interaction generalized and the model did not, and it is
falsifiable in a way the second is not. Split at the colon as the other two chapters are, so the
subtitle takes the `BaseT6` eyebrow treatment.

### Both pairs lead with CMMC

The draft's moment 2 description reads "Essential 8 beside CMMC" while its file column lists CMMC
first; moment 4 lists CMMC first in both. Leading both pairs with CMMC makes the left column mean the
same thing twice, so the reader learns the convention once. It also tracks the Provenance copy, where
CMMC was built first and Essential 8 was the addition that exposed the boundary.

Side by side rather than `stacked`, for the same reason the Portfolio pair is: the whole point is
direct comparison of the same slot under two frameworks, which stacking defeats. Both pairs are
header-and-control crops rather than dense tables, so half width should hold. If either does not,
`stacked: true` is one field.

### Later Observations carries no artifact

Every other block in every chapter so far pairs prose with at least one artifact. This block does not,
because the artifact plan does not list one and the block's content is a count and a retrospective
judgment, neither of which a screenshot illustrates. The schema already allows a block of pure prose,
so this needs nothing new. It is worth noting only because it is the first time a chapter exercises
that path.

### Widths

Every slot takes `width: 'lg'`, matching both shipped chapters. Moment 1 (the full CMMC practices
view) and moment 3 (three maturity columns) are the widest content and the most likely to want `xl`;
that is a one-field change during the visual pass rather than a decision to make blind.

### Route swap over rename-in-place

`src/pages/portfolio/whitehawk/comply/` is deleted and
`src/pages/portfolio/whitehawk/compliance-frameworks/` added, following both precedents: add the page
and swap the route, delete the orphaned stub, then repoint `PRODUCTS`. Each commit builds green.

### Copy stays verbatim

The trailing "Artifacts" table and "Captions" list are notes to the author, not page copy, and are
dropped from the content module. Their caption strings become the slot captions. The status note on
moment 3, "needs reseed", is stale and the asset ships as is.

## Risks / Trade-offs

- **The chapter may need a component change after all.** → That is what the exercise is for. If it
  happens, stop and report rather than editing the shared components inside this change; the fix
  belongs in a `product-chapter` delta.
- **Two pairs at half width, four crops total.** → More surface for a legibility problem than the
  Portfolio chapter's single pair. `stacked: true` per slot is the fallback, checked explicitly in the
  verification tasks.
- **`/portfolio/whitehawk/comply` becomes a dead URL and the app still has no not-found route.** →
  Third time this trade-off is accepted. Three dead product URLs now exist. A real not-found route is
  overdue and worth its own change.
- **The products template is stale in two ways.** → It names this chapter "Maturity Roadmap" and still
  assigns leadership proof to Cyber Risk Portfolio, which moved. Recorded as an open question so the
  template gets corrected rather than quietly diverging from three built pages.

## Migration Plan

1. Add the typed content module. Nothing renders it yet; build stays green.
2. Add the page and swap the route from `comply` to `compliance-frameworks`.
3. Delete the orphaned `comply` stub page.
4. Repoint the third `PRODUCTS` entry and give it its thumbnail.

Rollback is reverting steps 3 and 4, which restores the stub.

## Open Questions

- `products-template.md` is now stale on two counts: this chapter's name, and the leadership proof
  assignment. Which chapter carries leadership, and does the tier 1 table need reordering?
- Three product routes have been deleted with no not-found route in the app. Worth deciding whether
  `/portfolio/whitehawk/platform`, `/engage`, and `/comply` should redirect to their chapters or
  whether a real 404 page is the answer.
- Tier 2's visual treatment is still undesigned, and it is now the only thing standing between this
  and a complete WhiteHawk product set.
