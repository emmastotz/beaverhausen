import { ScrollJackTypewriter } from './ScrollJackTypewriter'

const BEAVER_LINES: React.ReactNode[] = [
  'Beavers are one of the only animals besides humans that fundamentally reshape their environment.',
  "They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built.",
  'They reshape entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current.',
  'They are also, by most accounts, a little feral.',
  'They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build.',
  <span key="teeth">
    Their teeth are <span className="text-iron-orange">orange</span> because
    their enamel is reinforced with iron, self-sharpening as they work.
  </span>,
  'That detail feels important.',
  'Beavers build things that outlast them.',
  "That's the kind of work I'm interested in doing.",
]

export function AboutBeavers() {
  return (
    <ScrollJackTypewriter
      lines={BEAVER_LINES}
      className="font-display text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.8] tracking-[0.01em] text-beaver-dark antialiased"
    />
  )
}
