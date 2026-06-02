import { useEffect, useState } from 'react'

import type { ScrollSection } from '@/components/ScrollJackTypewriter'

import { BeaverMark } from '@/components/brand/BeaverMark'
import {
  BEAVER_LINES,
  CLOSING,
  PROFESSIONAL_LINES,
} from '@/content/about'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { Button } from '@/components/primitives/Button'
import {
  composeScrollSections,
  ScrollJackTypewriter,
} from '@/components/ScrollJackTypewriter'
import { useTransition } from '@/context/TransitionContext'
import { SectionLayout } from '@/layouts/SectionLayout'

const BEAVER_SECTION: ScrollSection = {
  lines: BEAVER_LINES,
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
  lines: PROFESSIONAL_LINES,
  variant: 'body',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(displayed, i) {
    if (i === 5) return <em>{displayed}</em>
    return displayed
  },
}

const {
  lines: ABOUT_LINES,
  renderText: renderAboutText,
  getLineProps: getAboutLineProps,
} = composeScrollSections([BEAVER_SECTION, PROFESSIONAL_SECTION])

const CLOSING_COPY: React.ReactNode[] = [CLOSING]

export function About() {
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
    <SectionLayout id="about" className="w-full" aria-label="About">
      <div
        className={`fixed bottom-[0.5vh] left-1/2 z-30 -translate-x-1/2 ${isCtaInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <Button
          onClick={() => transitionTo('/portfolio/beaverhausen')}
          variant="ghost"
          size="sm"
          aria-label="Skip to end of about section"
        >
          Skip to work
        </Button>
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
            <DownloadResumeButton variant="ghost" />

            <Button onClick={() => transitionTo('/portfolio')}>
              Continue the journey
            </Button>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
