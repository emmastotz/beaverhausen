import type { Chapter } from '@/components/gsap/Flipbook'

export const CHAPTERS: Chapter[] = [
  {
    id: 'habitat',
    tab: 'I',
    title: 'Habitat Survey',
    subtitle: 'Context & Brief',
  },
  {
    id: 'sketches',
    tab: 'II',
    title: 'Field Sketches',
    subtitle: 'Exploration & Identity',
  },
  {
    id: 'taxonomy',
    tab: 'III',
    title: 'Taxonomy',
    subtitle: 'The Design System',
  },
  {
    id: 'construction',
    tab: 'IV',
    title: 'Construction',
    subtitle: 'The Build',
  },
  {
    id: 'study',
    tab: 'V',
    title: 'Ongoing Study',
    subtitle: 'Reflections',
  },
]

// Wrap words in *asterisks* to render as <em> in the component.
export type ChapterCopy = {
  paragraphs: string[]
  fieldNotes: string[]
}

export const CHAPTER_COPY: Record<string, ChapterCopy> = {
  habitat: {
    paragraphs: [
      'Every portfolio is, at its core, a hypothesis. Followed quickly by an analysis of oneself.',
      'This one began with a simple observation: most designer/engineer portfolios look like neither. They are either too sparse to show range or too cluttered to show taste. The brief was to avoid both failure modes.',
      'The constraints were real. No off-the-shelf template. No borrowed identity. Everything had to be built from first principles: name, mark, palette, type system, site. The subject matter: me. Someone who builds things that last, and wants a portfolio that does the same.',
      'The beaver, it turned out, was not a joke. It was an observation. A creature known for precision engineering. For working alone, or in small teams, in conditions that are not ideal for everyone. For building structures that reshape the landscape, and doing so without fanfare. For having extremely strong teeth.',
      'The question shifted: not what should I call myself but rather, how do I elevate the beaver, make it worthy of a brand? Which is, if you think about it, exactly the kind of problem a designer/engineer should be solving.',
    ],
    fieldNotes: [
      'the name came before the logo. Something about compound nouns. Something German. Something with teeth. It started as a funny pseudonym, a joke I had with myself. But jokes have a way of becoming serious when you sit with them long enough.',
    ],
  },

  sketches: {
    paragraphs: [
      'The beaver was the *only* choice for the logo. Refining that into a mark that could hold both precision and personality was where the real work began.',
      'The first sketches were too simplistic: a line art beaver, clean and friendly, that explained the joke instead of landing it. Predictably, I overcomplicated it. Too much detail in the beaver, too much trying to say everything at once.',
      'The right direction came from reduction; pulling back until only the essential gesture remained. Not a highly detailed beaver, but a silhouette with just enough precision to disappear into something larger. The mark of something that builds with intention.',
      "The beaver silhouette is embedded within the B, completing the lower bowl of the letterform; visible if you're looking, invisible if you're not. The kind of thing that rewards a second glance.",
      'The logo is a small argument that precision and playfulness are not opposites, just different tools for the same job.',
    ],
    fieldNotes: [],
  },

  taxonomy: {
    paragraphs: [
      'A design system for yourself is a strange thing to build. It is, in some sense, overkill. But the discipline of naming things, of deciding what *iron-orange* is and why it is not just orange, produces clarity that informal work rarely achieves. It also came naturally. When your brand is named after an animal, the taxonomy writes itself.',
      "The warm browns are lifted directly from a beaver's coat, while the burnt orange is more specific: beaver tooth enamel is reinforced with iron, which turns it a deep, hard orange. The same orange that makes their teeth self-sharpening. It felt like the right color for a brand built on precision.",
      "The Beaverhausen wordmark is built on a deliberate tension. *Beaver* is set in a high-contrast, organic serif with curves that have opinions, a personality that earns attention. *hausen* follows in a clean, geometric sans-serif: structured, precise, and completely sure of itself. The two halves shouldn't work together. They do.",
      "Magic Retro earns its place in display settings: headlines, the wordmark, moments that call for character. At smaller sizes the contrast becomes a liability, so Fraunces steps in as the workhorse serif: rounder, more legible, better suited to running text. They don't share the same personality, but they share a warmth that keeps the system coherent.",
      'The result is a system that knows what it is: warm but structured, playful but precise. The kind of thing that only works if you commit to both halves equally.',
    ],
    fieldNotes: [
      'the color system named itself. The type system required an argument.',
    ],
  },

  construction: {
    paragraphs: [
      'The stack was chosen for nostalgia as much as longevity. Working primarily in Vue day-to-day, this was an opportunity to dust off React, to build something outside the norm, on purpose. Vite, React, TypeScript, Tailwind. Solid and a little boring, which left room for the interesting problems. With a familiar stack, the learning curve lives not in where things go right, *but in where they go wrong*.',
      'The SVG landmark components are animated inline: cattails swaying, each scene with its own keyframe set to avoid conflicts across simultaneously mounted components. Hover states reveal wordmarks and navigate to case studies.',
      'Z-index management became its own discipline. Absolutely positioned elements interact in ways that are hard to predict and harder to debug.',
      'Some problems found more elegant solutions than others. GSAP was added late, initially for the page flip on this case study. It stayed because it belongs here: the water flood transition, the landmark animations, eventually the parallax itself. It is a large library with a learning curve that demands respect. Learning it was the point.',
      'The file structure was a deliberate departure from the architecture used in client work. In larger projects, dependencies are separated from application code with the aim of keeping the codebase framework agnostic: Vue in, React out, without touching business logic. For a portfolio site, that abstraction is overkill. The default Vite scaffolding is enough structure to find things without making the structure a project in itself.',
      "The ambition behind all of it was simple, if a little earnest: this site exists to showcase things that don't come up in a typical client sprint. The harder question throughout was not technical. It was whether a lay user would find any of this intuitive: is it obvious that the landmarks are clickable? Is it clear that the parallax can be skipped? Does the experience communicate what it is, or does it just look interesting? These are questions without clean answers, and they stayed open longer than the code did.",
    ],
    fieldNotes: [
      "when everything is layered, the hardest bugs are the ones you can't see.",
      "the goal throughout was restraint. Microanimations that enhance without announcing themselves. A site that moves, but doesn't perform.",
    ],
  },

  study: {
    paragraphs: [
      'A portfolio is never truly finished. It is a living document of what you know how to do, which means it evolves as you do. This version is not the first iteration, but thorough enough to show range, and honest enough to show process.',
      'What still needs work is a long list. Mobile responsiveness on the portfolio pages. Deeper accessibility for the parallax, a visual-heavy interaction that currently asks too much of keyboard and screen reader users. Dark mode. An HTML semantics audit. Tests.',
      'Landing on this site, you are met with a cinematic experience rather than a wall of text. The parallax makes it a journey, an exploration, and somewhere in there, a fairly unsubtle love letter to an animal that deserves more credit than it gets.',
      'The design system held up. Naming things early: tokens, components, the type scale. It all paid off in ways that are hard to quantify but easy to feel. The tension that runs through it: precise but warm, structured but playful, was not invented for the brand. It was observed. The beaver was a convenient mirror. The design system was a way of formalizing something that was already true.',
      'Beaverhausen is, in the end, a portrait as much as a portfolio.',
    ],
    fieldNotes: [
      'the gap between a thing that works and a thing that is done, it turns out, is quite wide.',
    ],
  },
}
