import { useEffect, useState } from 'react'

import { BeaverMark } from '@/components/brand/BeaverMark'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { ScrollRevealText } from '@/components/landing/ScrollRevealText'
import { Button } from '@/components/primitives/Button'
import { BEAVER_LINES, CLOSING, PROFESSIONAL_LINES } from '@/content/landing'
import { useTransition } from '@/context/TransitionContext'
import {
  composeScrollSections,
  type ScrollSection,
} from '@/util/scrollSections'

const BEAVER_SECTION: ScrollSection = {
  lines: BEAVER_LINES,
  variant: 'display',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(i) {
    if (i !== 5) return BEAVER_LINES[i]
    const text = BEAVER_LINES[5]
    const word = 'orange'
    const idx = text.indexOf(word)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-iron-orange">
          {text.slice(idx, idx + word.length)}
        </span>
        {text.slice(idx + word.length)}
      </>
    )
  },
}

const PROFESSIONAL_SECTION: ScrollSection = {
  lines: PROFESSIONAL_LINES,
  variant: 'body',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(i) {
    if (i === 5) return <em>{PROFESSIONAL_LINES[5]}</em>
    return PROFESSIONAL_LINES[i]
  },
}

const {
  lines: ABOUT_LINES,
  renderText: renderAboutText,
  getLineProps: getAboutLineProps,
} = composeScrollSections([BEAVER_SECTION, PROFESSIONAL_SECTION])

const CLOSING_COPY = [CLOSING]

export function About() {
  const [isScrollComplete, setisScrollComplete] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight
      setisScrollComplete(window.scrollY === scrollMax)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <section id="about" className="w-full" aria-label="About">
      <div
        className={`z-floating fixed bottom-[0.5vh] left-1/2 -translate-x-1/2 sm:bottom-px md:bottom-[1vh] ${isCtaInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <Button
          onClick={() => transitionTo('/portfolio/whitehawk')}
          variant="ghost"
          size="sm"
          aria-label="Skip to end of about section"
        >
          Skip to work
        </Button>
      </div>

      <ScrollRevealText
        lines={ABOUT_LINES}
        renderText={renderAboutText}
        getLineProps={getAboutLineProps}
        className="leading-[1.75]"
      />

      <div className="relative">
        <div className="sticky top-[15svh] flex justify-center sm:top-[25svh] md:top-[18svh]">
          <BeaverMark
            className={`size-[20svh] transition-opacity ease-out md:size-[15svh] ${isScrollComplete ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <ScrollRevealText
          lines={CLOSING_COPY}
          variant="display"
          className="relative leading-[1.75] text-iron-orange italic dark:text-beaver-dark"
          persistLast
        />

        <div
          id="about-cta"
          className="z-floating absolute inset-x-0 top-[75svh] flex justify-center sm:top-[77svh] md:top-[70svh]"
        >
          <div className="inline-flex flex-col justify-center gap-2 sm:gap-0 md:gap-3">
            <div className="place-self-center">
              <DownloadResumeButton variant="ghost" />
            </div>

            <Button onClick={() => transitionTo('/portfolio')}>
              Continue the journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
