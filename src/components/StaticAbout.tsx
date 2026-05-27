import { FadeIn } from '@/components/FadeIn'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { Button } from '@/components/primitives/Button'

import { useTransition } from './transition/TransitionContext'

const BEAVER_PARAGRAPHS = [
  `Beavers are one of the only animals besides humans that fundamentally reshape their environment.`,
  `They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built. They transform entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current. They are also, by most accounts, a little feral. They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build. Their teeth are orange because their enamel is reinforced with iron, self-sharpening as they work. That detail feels important.`,
  `Beavers build things that outlast them. That's the kind of work I'm interested in doing.`,
]

const PROFESSIONAL_PARAGRAPHS = [
  `I am a designer and frontend engineer with roots in graphic design and over six years building production web applications. I think in systems and in pixels simultaneously, moving fluidly between brand identity and component architecture without losing the thread of either. I've led full rebrands, built design systems from scratch, and shipped enterprise-grade interfaces for clients who care about the details. I prototype in Figma and in code. I care too much about the feel of interactions and have a hard time leaving details alone when they're not quite right. Some might call it gnawing.`,
  `I work best in small, focused teams where craft is a baseline expectation, designers and engineers finish each other's sentences, and quality is understood to be a competitive advantage, not a nice-to-have.`,
]

const CLOSING = `The beaverhausen doesn't build itself.`

export function StaticAbout() {
  const { transitionTo } = useTransition()

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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <AutoH>
          <BaseT1 className="text-beaver-dark">About</BaseT1>
        </AutoH>

        <FadeIn>
          <Button variant="ghost" onClick={handleDownload}>
            Download resume
          </Button>
        </FadeIn>
      </div>

      <section aria-label="About beavers">
        {BEAVER_PARAGRAPHS.map((p, i) => (
          <FadeIn key={i} delay={i * 100} className="mb-6 last:mb-0">
            {i === 2 ? (
              <p>
                <BaseT3
                  variant="display"
                  className="leading-[1.8] text-beaver-dark italic"
                >
                  {p}
                </BaseT3>
              </p>
            ) : (
              <p>
                <BaseT4 variant="display" className="leading-[1.9] text-beaver">
                  {p}
                </BaseT4>
              </p>
            )}
          </FadeIn>
        ))}
      </section>

      <section aria-label="About me">
        {PROFESSIONAL_PARAGRAPHS.map((p, i) => (
          <FadeIn key={i} delay={i * 100} className="mb-6 last:mb-0">
            <p>
              <BaseT4 className="leading-[1.9] text-beaver">{p}</BaseT4>
            </p>
          </FadeIn>
        ))}
      </section>

      <FadeIn>
        <p>
          <BaseT3
            variant="display"
            className="leading-[1.8] text-beaver-dark italic"
          >
            {CLOSING}
          </BaseT3>
        </p>
      </FadeIn>

      <FadeIn>
        <Button variant="ghost" onClick={() => transitionTo('/portfolio')}>
          View my work
        </Button>
      </FadeIn>
    </div>
  )
}
