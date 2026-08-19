## Why

The frosted card surface used on the contact page has no abstraction -- its visual styles live inline on
a `<div>` and would need to be duplicated anywhere else a card is needed. Extracting it into `BaseCard`
makes the surface reusable and keeps the design consistent.

## What Changes

- Implement `src/components/primitives/BaseCard.tsx` (currently an empty file) with the card surface
  styles extracted from `ContactPage`.
- Replace the raw `<div>` in `src/pages/contact/index.tsx` with `<BaseCard>`.
- Padding, and sizing should be intentionally excluded from `BaseCard`; callers apply it on their content wrappers.

## Capabilities

### New Capabilities

- `base-card`: A primitives-layer card surface component with frosted glass appearance, accepting
  arbitrary children via a slot.

### Modified Capabilities

<!-- none -->

## Impact

- `src/components/primitives/BaseCard.tsx` -- new implementation
- `src/pages/contact/index.tsx` -- replace inline card div with `<BaseCard>`
- No new dependencies, no API changes, no breaking changes
