import { Button } from '../components/primitives/Button'
import { FadeIn } from './FadeIn'
import { AutoH } from './primitives/AutoH'
import { BaseT1 } from './primitives/BaseT1'

const BEAVER_PARAGRAPHS = [
  `Beavers are one of the only animals besides humans that fundamentally reshape their environment.`,
  `They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built. They transform entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current. They are also, by most accounts, a little feral. They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build. Their teeth are orange because the enamel is reinforced with iron, and self-sharp as they work. That detail feels important.`,
  `Beavers build things that outlast them. That's the kind of work I'm interested in doing.`,
]

const PROFESSIONAL_PARAGRAPHS = [
  `I am a designer and frontend engineer with roots in graphic design and over six years building production web applications. I think in systems and in pixels simultaneously, moving fluidly between brand identity and component architecture without losing the thread of either. I've led full rebrands, built design systems from scratch, and shipped enterprise-grade interfaces for clients who care about the details. I prototype in Figma and in code. I care too much about the feel of interactions and have a hard time leaving details alone when they're not quite right. Some might call it gnawing.`,
  `I work best in small, focused teams where craft is a baseline expectation, designers and engineers finish each other's sentences, and quality is understood to be a competitive advantage, not a nice-to-have.`,
]

const CLOSING = `The beaverhausen doesn't build itself.`

export function StaticAbout() {
  const handleDownload = async () => {
    const response = await fetch(
      'https://beaverhausen-worker.beaverhausen.workers.dev/resume',
    )
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Emma-Stotz-Resume-2026.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <AutoH>
        <BaseT1 className="mb-20 text-beaver-dark">About</BaseT1>
      </AutoH>
      {/* Beaver copy */}
      <section aria-label="About beavers" className="mb-20">
        {BEAVER_PARAGRAPHS.map((p, i) => (
          <FadeIn key={i} delay={i * 100} className="mb-6">
            <p
              className={`font-display leading-[1.8] tracking-[0.01em] antialiased ${
                i === 2
                  ? 'text-[clamp(1.05rem,2.2vw,1.3rem)] text-iron-orange italic'
                  : 'text-[clamp(0.95rem,1.8vw,1.1rem)] text-beaver-dark'
              }`}
            >
              {p}
            </p>
          </FadeIn>
        ))}
      </section>

      {/* Professional copy */}
      <section aria-label="About me" className="mb-20">
        {PROFESSIONAL_PARAGRAPHS.map((p, i) => (
          <FadeIn key={i} delay={i * 100} className="mb-6">
            <p className="font-body text-[clamp(0.95rem,1.8vw,1.1rem)] leading-[1.9] text-beaver-dark opacity-80">
              {p}
            </p>
          </FadeIn>
        ))}
      </section>

      {/* Resume download */}
      <FadeIn className="mb-24">
        <Button onClick={handleDownload}>Download résumé</Button>
      </FadeIn>

      {/* Closing line */}
      <FadeIn>
        <p className="font-display text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.8] tracking-[0.01em] text-iron-orange italic antialiased">
          {CLOSING}
        </p>
      </FadeIn>
    </>
  )
}
