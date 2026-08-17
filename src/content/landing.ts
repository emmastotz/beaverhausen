// Each inner array is one paragraph's worth of sentences.
// .flat()         → individual lines for ScrollJackTypewriter (About.tsx)
// .map(g.join)    → joined paragraphs for static rendering (StaticAbout.tsx)

const BEAVER_SENTENCE_GROUPS = [
  [
    'Beavers are one of the only animals besides humans that fundamentally reshape their environment.',
  ],
  [
    "They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built.",
    'They transform entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current.',
    'They are also, by most accounts, a little feral.',
    'They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build.',
    'Their teeth are orange because their enamel is reinforced with iron, self-sharpening as they work.',
    'That detail feels important.',
  ],
  [
    'Beavers build things that outlast them.',
    "That's the kind of work I'm interested in doing.",
  ],
]

const PROFESSIONAL_SENTENCE_GROUPS = [
  [
    'I am a designer and frontend engineer with roots in graphic design and over six years building production web applications.',
    'I think in systems and in pixels simultaneously, moving fluidly between brand identity and component architecture without losing the thread of either.',
    "I've led full rebrands, built design systems from scratch, and shipped enterprise-grade interfaces for clients who care about the details.",
    'I prototype in Figma and in code.',
    "I care too much about the feel of interactions and have a hard time leaving details alone when they're not quite right.",
    'Some might call it gnawing.',
  ],
  [
    "I work best in small, focused teams where craft is a baseline expectation, designers and engineers finish each other's sentences, and quality is understood to be a competitive advantage, not a nice-to-have.",
  ],
]

export const BEAVER_LINES = BEAVER_SENTENCE_GROUPS.flat()
export const BEAVER_PARAGRAPHS = BEAVER_SENTENCE_GROUPS.map((g) => g.join(' '))

export const PROFESSIONAL_LINES = PROFESSIONAL_SENTENCE_GROUPS.flat()
export const PROFESSIONAL_PARAGRAPHS = PROFESSIONAL_SENTENCE_GROUPS.map((g) =>
  g.join(' '),
)

export const CLOSING = "The beaverhausen doesn't build itself."
