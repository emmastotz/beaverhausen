## Why

The router has no catch-all and no `errorElement`, so any unmatched URL renders React Router's
built-in error screen: unstyled, developer-facing, and titled "Unexpected Application Error!". On a
portfolio whose whole argument is craft, that is the worst possible page to serve by accident.

Three product URLs were retired as their chapters shipped (`/platform`, `/engage`, `/comply`), which
is what surfaced the gap. Those specific links were never shared, so they need no redirects. The
general case is the reason to fix it: every typo, every stale link, every crawler probing a path.

## What Changes

- Add a not-found page at `src/pages/not-found/index.tsx`, rendered by a `path: '*'` catch-all route
  in `src/App.tsx`.
- Mirror the contact page's composition: `DefaultLayout`, `Header`, and the landscape scene behind.
  The copy sits directly on the scene rather than on a `BaseCard`; contact needs a card because it
  carries a form, this page carries three centered lines.
- Copy in the site's voice, following the contact page's shape of a short plain heading and one dry
  sentence:

  > **Nothing built here**
  > No structure at this address. Either it moved, or it was never built.

- A single `AppLink` to `/portfolio`, so the visitor leaves through the water transition rather than
  the browser's back button. It points at the portfolio, not home, because the header already links
  home and a dead product URL suggests the visitor wanted the work.
- Duplicate the scene markup and import the existing `contact.css` rather than extracting a shared
  component. Deliberate, and commented as such: the not-found page's design is expected to diverge
  from contact, and coupling them now would make that harder rather than easier.

Before, in `App.tsx`:

```tsx
{ path: '/portfolio/whitehawk/client-b', element: <WhiteHawkClientBPage /> },
// nothing catches anything else
```

After:

```tsx
{ path: '/portfolio/whitehawk/client-b', element: <WhiteHawkClientBPage /> },
{ path: '*', element: <NotFoundPage /> },
```

## Capabilities

### New Capabilities

- `not-found-page`: what an unmatched URL renders. Route precedence, composition, copy, the way back,
  and reduced-motion behaviour.

### Modified Capabilities

- `whitehawk-product-stub-pages`: three scenarios currently assert that a retired product URL matches
  no route. A catch-all changes that, so they need to describe the not-found page instead.

## Non-goals

- No redirects from `/portfolio/whitehawk/platform`, `/engage`, or `/comply`. Those links were never
  shared; a redirect would preserve URLs nobody holds.
- No shared scene component. Explicitly deferred, with a comment in the code saying why.
- No real HTTP 404 status. The site is a static SPA on GitHub Pages, so `public/404.html` already
  redirects into the app and the status code is out of our hands. This is a client-side not-found
  view, not a server response.
- No search, no suggested links, no "did you mean". One way back is enough.
- No new dependencies, no GSAP, and no new assets. The scene reuses what contact already ships.

## Impact

- `src/pages/not-found/index.tsx` (new)
- `src/App.tsx` (catch-all route)
- `src/components/contact/contact.css` (imported by a second page; unchanged)
- `openspec/specs/whitehawk-product-stub-pages/spec.md` (delta spec)
- No asset changes. The landscape, cloud, and beaver SVGs are already in the bundle for `/contact`,
  so the not-found page adds markup only.
