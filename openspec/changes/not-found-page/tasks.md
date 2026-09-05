## 1. The page

- [ ] 1.1 Add `src/pages/not-found/index.tsx`. Compose `DefaultLayout` and `Header`, then a centered
      `BaseCard` inside a `min-h-svh` grid, following `src/pages/contact/index.tsx`. No local state.
- [ ] 1.2 Copy the landscape scene markup from the contact page: the dawn and dusk cloud layers, the
      landscape SVG, the water ripple, and the swimming beaver, all inside a `pointer-events-none`
      `aria-hidden` container. Import `@/components/contact/contact.css` for the animation classes.
- [ ] 1.3 Add a comment at the top of the file recording that the scene is duplicated on purpose,
      because the not-found design is expected to diverge from contact, and that extracting a shared
      component now would make the first divergence harder rather than easier.
- [ ] 1.4 Add the copy: `AutoH` + `BaseT1` reading "Nothing built here", then a `BaseT4` display
      paragraph reading "No structure at this address. Either it moved, or it was never built." Match
      the contact page's colour classes.
- [ ] 1.5 Add one `AppLink` to `/portfolio`, and nothing else. No search, no suggested links, no
      second call to action.

## 2. The route

- [ ] 2.1 In `src/App.tsx`, import the page and add `{ path: '*', element: <NotFoundPage /> }` as the
      last child route.

## 3. Checks

- [ ] 3.1 Format and lint only the files this change touched: `pnpm exec oxfmt <paths>` and
      `pnpm exec eslint <paths>`. Do not run the repo-wide `pnpm run format` or `lint --fix`.
- [ ] 3.2 `pnpm build` (`tsc -b && vite build`) passes.
- [ ] 3.3 Confirm `src/pages/contact/index.tsx` and `src/components/contact/contact.css` are
      unmodified in the diff.
- [ ] 3.4 Load `/portfolio/typo` and confirm the not-found page renders with the scene, copy, and
      link, rather than React Router's error screen.
- [ ] 3.5 Load `/portfolio/whitehawk/platform`, `/engage`, and `/comply` and confirm each falls
      through to the not-found page.
- [ ] 3.6 Click through every named route in `App.tsx` and confirm none of them now render the
      not-found page.
- [ ] 3.7 Confirm the link back fires the water transition and lands on `/portfolio`.
- [ ] 3.8 Check the page in dark mode, at a narrow viewport, and with `prefers-reduced-motion: reduce`
      set, confirming the scene stills and nothing scrolls horizontally.
