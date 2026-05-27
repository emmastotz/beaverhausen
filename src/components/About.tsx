import { useEffect, useState } from 'react'

import { SectionLayout } from '@/layouts/SectionLayout'
import { BeaverMark } from '@/components/brand/BeaverMark'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { Button } from '@/components/primitives/Button'
import {
  composeScrollSections,
  ScrollJackTypewriter,
} from '@/components/ScrollJackTypewriter'
import type { ScrollSection } from '@/components/ScrollJackTypewriter'
import { useTransition } from '@/context/TransitionContext'

const BEAVER_SECTION: ScrollSection = {
  lines: [
    'Beavers are one of the only animals besides humans that fundamentally reshape their environment.',
    "They are nature's engineers: tireless, systems-minded, and constitutionally incapable of leaving something half-built.",
    'They reshape entire environments not through brute force but through accumulated craft; one precise cut at a time, one carefully placed log, one structure that holds against the current.',
    'They are also, by most accounts, a little feral.',
    'They work in the dark, they bite through things most animals would walk around, and they take a kind of unreasonable pride in the structural integrity of what they build.',
    'Their teeth are orange because their enamel is reinforced with iron, self-sharpening as they work.',
    'That detail feels important.',
    'Beavers build things that outlast them.',
    "That's the kind of work I'm interested in doing.",
  ],
  variant: 'display',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(displayed, i) {
    if (i !== 5) return displayed
    const word = 'orange'
    const idx = displayed.indexOf(word)
    if (idx === -1) return displayed
    return (
      <>
        {displayed.slice(0, idx)}
        <span className="text-iron-orange">
          {displayed.slice(idx, idx + word.length)}
        </span>
        {displayed.slice(idx + word.length)}
      </>
    )
  },
}

const PROFESSIONAL_SECTION: ScrollSection = {
  lines: [
    'I am a designer and frontend engineer with roots in graphic design and over six years building production web applications.',
    'I think in systems and in pixels simultaneously, moving fluidly between brand identity and component architecture without losing the thread of either.',
    "I've led full rebrands, built design systems from scratch, and shipped enterprise-grade interfaces for clients who care about the details.",
    'I prototype in Figma and in code.',
    "I care too much about the feel of interactions and have a hard time leaving details alone when they're not quite right.",
    'Some might call it gnawing.',
    "I work best in small, focused teams where craft is a baseline expectation, designers and engineers finish each other's sentences, and quality is understood to be a competitive advantage, not a nice-to-have.",
  ],
  variant: 'body',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(displayed, i) {
    if (i === 5) return <em>{displayed}</em>
    return displayed
  },
}

const { lines: ABOUT_LINES, renderText: renderAboutText, getLineProps: getAboutLineProps } =
  composeScrollSections([BEAVER_SECTION, PROFESSIONAL_SECTION])

const CLOSING_COPY: React.ReactNode[] = [
  "The beaverhausen doesn't build itself.",
]

export function About() {
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

  const { transitionTo } = useTransition()

  const [isCtaInView, setIsCtaInView] = useState(false)
  useEffect(() => {
    const cta = document.getElementById('about-cta')
    if (!cta) return
    const observer = new IntersectionObserver(([entry]) =>
      setIsCtaInView(!entry.isIntersecting),
    )
    observer.observe(cta)
    return () => observer.disconnect()
  }, [])

  const handleSkip = () => {
    const about = document.getElementById('about')
    if (!about) return
    const bottom = about.offsetTop + about.offsetHeight
    window.scrollTo({ top: bottom, behavior: 'smooth' })
  }

  return (
    <SectionLayout id="about" className="w-full" aria-label="About">
      <div
        className={`fixed bottom-[1vh] left-1/2 z-30 -translate-x-1/2 ${isCtaInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          onClick={handleSkip}
          className="cursor-pointer text-iron-orange hover:text-beaver"
          aria-label="Skip to end of about section"
        >
          <BaseT6 className="uppercase">Skip</BaseT6>
        </button>
      </div>

      <ScrollJackTypewriter
        lines={ABOUT_LINES}
        renderText={renderAboutText}
        getLineProps={getAboutLineProps}
      />

      <div className="relative">
        <div className="sticky top-[calc(35vh-8rem)] flex justify-center sm:top-[calc(40vh-8rem)] md:top-[calc(35vh)] lg:top-[calc(40vh-8rem)]">
          <BeaverMark className="size-24 lg:size-36" />
        </div>

        <ScrollJackTypewriter
          lines={CLOSING_COPY}
          variant="display"
          className="relative leading-[1.8] text-iron-orange italic"
          persistLast
        />

        <div
          id="about-cta"
          className="absolute top-4/5 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col justify-center gap-1 sm:gap-3">
            <Button onClick={handleDownload}>Download my resume</Button>

            <Button variant="ghost" onClick={() => transitionTo('/portfolio')}>
              Continue the journey
            </Button>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}