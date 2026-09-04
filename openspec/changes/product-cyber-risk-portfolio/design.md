## Context

The `product-chapter` capability shipped with the Cyber Risk Rating chapter and claims that adding a
chapter means writing a content module and a thin page. Cyber Risk Portfolio is the first chapter to
test that claim. Its draft copy and all seven assets are committed; the `engage` stub it replaces is
a "coming soon" page nothing links to except `PRODUCTS`.

The reference implementation is `openspec/changes/archive/2026-09-02-product-cyber-risk-rating/`,
whose main specs now describe the shared components accurately.

## Goals / Non-Goals

**Goals:**

- One page live at `/portfolio/whitehawk/cyber-risk-portfolio` with the drafted copy and all six
  chapter images.
- Zero changes to the shared chapter components or the chapter schema. That is the whole point of
  the exercise, and a deviation is a reportable finding rather than a silent edit.
- The `engage` stub gone, its grid entry repointed.

**Non-Goals:**

- Leadership proof. That claim is moving to a different case study, so the products template's
  chapter map is now out of date; correcting it is a separate edit.
- Copy edits, caption rewrites, an `engage` redirect, and chapters 3 to 5.

## Decisions

### Content module mirrors the Cyber Risk Rating one

`src/content/product-cyber-risk-portfolio.ts` exports `CYBER_RISK_PORTFOLIO: ProductChapter`, with
the six asset imports at the top and the blocks below. Same file shape, same naming, same import
ordering as `product-cyber-risk-rating.ts`. There is no abstraction to introduce here: two content
modules that look alike are easier to read than one parameterized generator.

### The title splits

The draft heading is "Cyber Risk Portfolio: Where Risk Concentrates". The schema has an optional
`subtitle`, and the shipped Rating chapter uses it, so the colon becomes the split point. This keeps
the two chapters visually consistent and lets the subtitle take the `BaseT6` eyebrow treatment
rather than running as a long `BaseT1` line.

### Moment 2 is a side-by-side pair, Rating first

The draft lists the portfolio file first, but the caption reads "One component, two data models. The
wrapper absorbs the difference." The component came from the Cyber Risk Rating, so putting the
Rating on the left makes the sentence track left to right, and the pair stacks with the Rating on
top below `md` because source order is stack order.

Side by side rather than `stacked`: the point of the pairing is direct comparison of the same gauge
under two data models, which stacking defeats. This is the first real use of a non-stacked pair, so
it is also the check on whether half-width is legible for these two crops. If it is not, the fix is
`stacked: true`, one field, no component change.

### Widths

Every slot takes `width: 'lg'`, matching the Rating chapter. The supplier selection table (moment 4)
is the densest artifact and the most likely to want `xl`; that is a one-field change during the
visual pass rather than a decision to make blind.

### Route swap over rename-in-place

`src/pages/portfolio/whitehawk/engage/` is deleted and
`src/pages/portfolio/whitehawk/cyber-risk-portfolio/` added, following the Rating precedent: add the
page and swap the route, delete the orphaned stub, then repoint `PRODUCTS`. Each commit builds green.

### Copy stays verbatim

The trailing "Artifact plan" and "Captions" sections of the draft are notes to the author, not page
copy, and are dropped from the content module. Their caption strings become the slot captions. Same
treatment the Rating chapter's draft received.

## Risks / Trade-offs

- **The chapter may turn out to need a component change after all.** → That is the finding the
  exercise is designed to surface. If it happens, stop and report it rather than editing the shared
  components inside this change; the fix belongs in a `product-chapter` delta.
- **The side-by-side pair may be illegible at half width.** → `stacked: true` is a one-field change.
  Flagged explicitly in the verification tasks.
- **`/portfolio/whitehawk/engage` becomes a dead URL and the app still has no not-found route.** →
  Same trade-off accepted for `platform`. React Router renders its default error element.
- **The products template still names this the leadership chapter.** → Now knowingly stale. Recorded
  as an open question so the template gets corrected rather than quietly diverging from the built
  pages.

## Migration Plan

1. Add the typed content module. Nothing renders it yet; build stays green.
2. Add the page and swap the route from `engage` to `cyber-risk-portfolio`.
3. Delete the orphaned `engage` stub page.
4. Repoint the second `PRODUCTS` entry and give it its thumbnail.

Rollback is reverting steps 3 and 4, which restores the stub.

## Open Questions

- The products template's chapter map assigns leadership proof to Cyber Risk Portfolio and that has
  moved. Which chapter carries it, and does the template's tier 1 table need reordering as a result?
- Whether the cumulative annual risk bar critique in Later Observations should eventually be paired
  with a proposed alternative visualization. The copy names the problem without showing a fix, which
  is honest but leaves the strongest engineering observation in the chapter unillustrated.
