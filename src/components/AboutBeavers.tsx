import { ScrollJackTypewriter } from './ScrollJackTypewriter'

const BEAVER_LINES: React.ReactNode[] = [
  'Beavers are one of the only animals besides humans that fundamentally reshape their environment.',
  "They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built.",
  'They reshape entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current.',
  'They are also, by most accounts, a little feral.',
  'They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build.',
  'Their teeth are orange because their enamel is reinforced with iron, self-sharpening as they work.',
  'That detail feels important.',
  'Beavers build things that outlast them.',
  "That's the kind of work I'm interested in doing.",
]

function highlightOrange(displayed: string, lineIndex: number) {
  if (lineIndex !== 5) return displayed
  const word = 'orange'
  const idx = displayed.indexOf(word)
  if (idx === -1) return displayed
  return (
    <>
      {displayed.slice(0, idx)}
      <span className="text-iron-orange">{displayed.slice(idx, idx + word.length)}</span>
      {displayed.slice(idx + word.length)}
    </>
  )
}

export function AboutBeavers() {
  return (
    <ScrollJackTypewriter
      lines={BEAVER_LINES}
      variant="display"
      className="leading-[1.8] text-beaver-dark"
      renderText={highlightOrange}
    />
  )
}
