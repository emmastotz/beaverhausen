## Context

`src/components/primitives/BaseCard.tsx` was created as an empty file. The card surface styles it
should encapsulate currently live inline on a `<div>` in `ContactPage`. The component sits in the
`primitives/` layer alongside `Button`, `AppLink`, and the typography scale.

## Goals / Non-Goals

**Goals:**

- Implement `BaseCard` as a thin wrapper that applies the frosted card surface appearance.
- Accept a `className` prop for caller overrides (width, max-width, etc.).
- Replace the raw card `<div>` in `ContactPage` with `<BaseCard>`.

**Non-Goals:**

- No padding baked in -- callers control their own spacing.
- No variants, no size props -- one surface, one look.
- No animations or hover states on the card itself.

## Decisions

**Extend `React.HTMLAttributes<HTMLDivElement>`** rather than defining a custom props interface.
This gives callers the full set of div attributes (including `className`, `style`, `id`, `role`,
etc.) for free with no extra code.

**Use `cn()` / Tailwind class merging** if a utility already exists in the project; otherwise
concatenate with a space and let Tailwind's atomic model handle conflicts. The project does not
currently use `clsx` or `cn` -- simple string concatenation is sufficient for one optional prop.

## Risks / Trade-offs

- Padding and sizing exclusion is a deliberate constraint. If a caller forgets to add padding and sizing, content will
  sit flush against the card edge. The spec is explicit, so this is a caller responsibility.
