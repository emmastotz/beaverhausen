## 1. Implement BaseCard

- [x] 1.1 Implement `src/components/primitives/BaseCard.tsx`: extend `React.HTMLAttributes<HTMLDivElement>`,
      apply `rounded-lg border border-beaver/10 bg-cream/80 shadow-sm backdrop-blur-sm dark:bg-dusk/80`,
      spread remaining props (including `className`) onto the div, render `children` inside

## 2. Update ContactPage

- [x] 2.1 In `src/pages/contact/index.tsx`, replace the raw card `<div>` (line 75) with `<BaseCard>`,
      moving `w-full max-w-xl` to `className` and keeping `px-8 py-10` on the inner content wrapper

## 3. Format

- [x] 3.1 Run `pnpm run format` and confirm no type errors with `tsc -b`
