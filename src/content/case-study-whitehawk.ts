import type { Chapter } from '@/components/gsap/Flipbook'

export const CHAPTERS: Array<Chapter> = [
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
  paragraphs: Array<string>
  fieldNotes: Array<string>
}

export const CHAPTER_COPY: Record<string, ChapterCopy> = {
  habitat: {
    paragraphs: [
      'WhiteHawk is a cybersecurity company operating at the intersection of risk intelligence and enterprise software. The engagement spans six years and covers more ground than most projects get in a decade: a design system built from scratch, a company-wide rollout across marketing and product surfaces, and lead frontend engineering across the public site through two major migrations.',
      'The brief came with a constraint that turned out to be a useful one. The core brand elements were already established: logo, colors, fonts. A baseline existed, even if it was bare bones. The work was not to invent a new identity, but to take what was there and build something coherent and scalable from it. To find the system inside the starting point.',
      "That distinction matters. It shifts the question from what should this brand be to what does this brand want to become. In some ways the harder problem, because the answer has to respect what's already there.",
    ],
    fieldNotes: [
      "six years is long enough to watch a brand grow into itself. Long enough to know which decisions were right, which ones you'd revisit, and which ones you'd make exactly the same way again.",
    ],
  },

  sketches: {
    paragraphs: [
      "Starting from an existing brand means your first job is forensic. What was intentional, and what just accumulated? What holds up at scale, and what only worked because the surface area was small enough that inconsistency didn't show yet?",
      "What existed was functional but unconsolidated. Every white paper, slide deck, and page of the site had arrived at its own interpretation of the brand. It wasn't chaos, but it wasn't a system either. The visual language had the texture of something that had grown organically over time: functional for its moment, but not the story WhiteHawk wanted to tell anymore.",
      "The work was extension and systematization rather than invention. Taking the existing logo, colors, and fonts and building out everything that wasn't there: the rules for how they behave together, the decisions that hadn't been made yet, the language for what the brand is and isn't allowed to do. The decisions that make a brand repeatable rather than approximate.",
      "The teal didn't disappear in the process; it found its job. In the original site it highlighted a single word in a headline: decorative, slightly arbitrary. In the updated system it became the primary action color in dark mode: buttons, links, interactive states. The same color, a completely different role. That kind of reassignment is what a design system is for.",
      "The messaging shifted too. *Empowering a Fearless Internet* is aspirational and broad. *Simplifying Cyber Risk. Empowering Resilience.* is direct and specific. The brand didn't change its values; it got better at stating them.",
    ],
    fieldNotes: [
      "the original mark was always good. It just hadn't been given permission to be confident yet.",
    ],
  },

  taxonomy: {
    paragraphs: [
      "A design system built on an existing brand is less about invention and more about excavation. The raw materials were already there: the logo, the colors, the fonts. The system was the work of deciding what they meant, how they behaved, and what happened when they had to do something they'd never been asked to do before.",
      'The color system landed at seven tokens with defined roles: two primaries (a saturated blue and a deep navy), three secondaries covering the neutral range, and two accents (teal for interactive and digital highlights, indigo for visual emphasis). None of those roles existed before. The colors did, but not the rules.',
      "Typography was one area where the baseline held up. Core Sans had been in use on the site from the start, with Arial as its fallback: a sensible pairing that didn't need to change. What did need work was how the type system lived in the code. The existing components had no separation of concerns between sizing and semantic tags: presentation and meaning tangled together in ways that made the system brittle and hard to extend. Reworking that was less visible than a font swap, but more durable. A type system that knows what it is at the code level is one that can actually scale.",
      "The guidelines extended beyond the site to govern how partners use the brand: logo clear space, minimum sizes, approved taglines, what can't be changed. A brand that only exists on your own surfaces isn't really a system. It's a style. The partner portal guidelines are where it became something other people had to follow.",
    ],
    fieldNotes: [
      "working within constraints you didn't set is its own discipline. You spend less time asking what the brand should be and more time understanding what it already is. That turns out to be the more interesting question.",
      "the contact for brand approvals on the partner guidelines is listed as a software developer. That's either a sign of a small team, or a sign of how much the role expanded. Probably both.",
    ],
  },

  construction: {
    paragraphs: [
      "WhiteHawk's site has been rebuilt twice. The first migration moved the codebase from PHP to Vue 2: not an arbitrary technology choice, but a practical one. The WordPress/PHP build handling the marketing site UI didn't offer the customization the site needed. Vue was already in use on the portal platform, which made it the natural extension of a decision already made. The second migration, from Vue 2 to Vue 3 with TypeScript, was driven by something quieter: maintainability. The libraries were moving, and the codebase needed to move with them.",
      "The more significant architectural evolution came later. What had been a single codebase was split into a monorepo with three distinct repos: the marketing site, the client portal, and the admin portal, managed with Turborepo. The separation is partly organizational, but more importantly it's a security boundary that didn't exist before: one that closed gaps that are easy to miss until you're looking for them.",
      "Owning a codebase across both rewrites means inheriting your own decisions. The monorepo structure held up. The architecture underneath it less so. Successive migrations and rebrands have left it in a state that could use significant attention. That's not a failure, exactly. It's the expected output of a codebase that kept moving while also keeping the lights on. But it's the thing you'd do differently, and knowing that is its own kind of knowledge.",
      'The current frontend stack is Vue 3, TypeScript, Vite, Tailwind, TanStack Query and Table, and Turborepo. Protobuf handles the frontend-backend contract; the backend runs on Java/Maven with AWS DynamoDB. The architecture reflects the same principle the design system does: built to scale, built to be handed off, built to last longer than the sprint it was finished in. Whether it fully lives up to that is a work in progress.',
    ],
    fieldNotes: [
      "there is a particular kind of wisdom that only comes from staying; from watching a codebase age; from being the person who wrote the comment you're now debugging. It's surreal in the moment and clarifying in retrospect.",
    ],
  },

  study: {
    paragraphs: [
      "Most projects have a clear edge: a handoff, a launch, a moment where your involvement ends and someone else's begins. WhiteHawk never had that. The rebrand fed the design system. The design system fed the site. The site kept evolving. Six years in, it still is.",
      "WhiteHawk is where the work became real. What a small team demands is range. You wear the hat that needs wearing. Sometimes that's engineer, sometimes designer, sometimes project manager, sometimes the person who wrote the brand guidelines and is also the person implementing them in code. That breadth becomes clarifying over time. It has taught not just how to develop, but how to think about architecture: how decisions made at the identity level echo in the component library, how consistency isn't a design preference but an engineering requirement.",
      "Working across every layer of the same product means understanding how decisions in one layer ripple into the others. The choice to stick with Core Sans rather than introduce a new typeface wasn't just aesthetic, it informed the type system rework that came later. The monorepo split had implications for how the brand rolled out across surfaces. These things compound over time. A typical engagement doesn't give you enough runway to see it happen, let alone to course-correct when it doesn't.",
    ],
    fieldNotes: [
      "the longest projects don't feel long from the inside. They feel like a series of reasonable next steps.",
    ],
  },
}
