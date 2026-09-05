## Context

`createBrowserRouter` in `src/App.tsx` declares eleven named routes and nothing else: no `path: '*'`,
no `errorElement`. An unmatched URL therefore falls to React Router's default error boundary, which
renders an unstyled developer screen.

On GitHub Pages the path is longer than it looks. A direct request to an unknown URL hits
`public/404.html`, which encodes the path into `?p=` and redirects to `index.html`; the app boots,
restores the path, and only then fails to match. So the fix has to live in the router, not in
`404.html`.

The contact page is the closest existing precedent for a single-purpose page: `DefaultLayout`, a
`Header`, a full-bleed landscape scene, and one centered `BaseCard` carrying all the content.

## Goals / Non-Goals

**Goals:**

- No route in the app can reach React Router's error screen.
- The not-found page reads as part of the site, using the contact page's composition and the site's
  voice.
- One way out, through the water transition.

**Non-Goals:**

- Redirects for the three retired product URLs, a real HTTP 404 status, search or suggestions, and
  any shared scene abstraction.

## Decisions

### A catch-all route, not an errorElement

`path: '*'` declared last. React Router ranks static segments above wildcards regardless of order, so
correctness does not depend on position, but declaring it last matches how the file reads.

`errorElement` was the alternative. It is the wrong tool: it catches thrown errors and loader
failures as well as no-match, so a genuine runtime error would render "Nothing built here", which is
a lie. A catch-all route means only an unmatched URL gets the not-found page.

### The scene is duplicated, deliberately

The scene is roughly fifty lines of JSX plus `contact.css`. Two consumers would normally justify
extracting a `PondScene` component, and the first instinct here was to do that.

Not doing it. The not-found page's design is expected to change, and probably away from contact's
rather than toward it. Extracting now would mean the first divergence has to either fork the shared
component or add props to it, which is more work than the duplication saves. The page imports
`contact.css` for the animation classes, so only the markup is copied, and a comment at the top of
the file records the reasoning where someone will actually find it.

The cost is real and worth stating: an edit to contact's scene will not reach the not-found page.
That is acceptable precisely because they are expected to diverge. If they turn out to stay identical
through a redesign, that is the signal to extract.

### Copy

Heading "Nothing built here", then "No structure at this address. Either it moved, or it was never
built."

The site's voice is short plain heading followed by one dry sentence: "Leave a note" then "If you've
made it this far, you probably have something worth saying." The heading leans on the landing page's
central claim, that beavers build things that outlast them, so an empty address is a structural
absence rather than an error. The second sentence covers both real cases without guessing which one
applies.

Rejected: "404" as a heading (a status code is not a sentence), anything apologetic, and "Dammed up",
which reads as a pun the rest of the site would not make.

### Copy lives in the page, not in `src/content/`

The contact page holds its own strings inline. Two sentences that exist in one place do not need a
content module; adding one would be consistency for its own sake, against the local precedent.

## Risks / Trade-offs

- **The scene drifts from contact.** → Accepted and expected, since the designs are meant to diverge.
  Recorded in the spec so it reads as a decision rather than an oversight.
- **A catch-all can mask a genuine routing bug.** → A mistyped `path` in `App.tsx` would now render a
  polished not-found page instead of an obvious error. Mitigated by the spec requiring every named
  route to still win, which is what the verification tasks check.
- **`contact.css` is now imported by two pages.** → It is plain CSS with no `animation-timeline`
  rules, so the polyfill constraint about `@layer` does not apply. Class names keep their `contact-`
  prefix, which will read oddly from the not-found page until one of the two is redesigned.
- **No real 404 status for crawlers.** → Unavoidable on static hosting, and the consequence is only
  that a search engine may index the not-found view. Out of scope for a portfolio site.

## Migration Plan

1. Add the not-found page. Nothing routes to it yet; build stays green.
2. Add the catch-all route.

Rollback is removing the route, which restores the previous behaviour exactly.

## Open Questions

- The `contact-` prefixed class names now serve two pages. Worth renaming when either page is
  redesigned, but renaming now would touch a shipped page for no visual gain.
- The two tier 2 stubs (`client-a`, `client-b`) still render "coming soon" pages. Once their chapters
  ship, the same retire-and-fall-through pattern applies, and at that point every product URL either
  resolves to a chapter or lands here.
