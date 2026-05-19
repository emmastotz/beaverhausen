import { useEffect, useState } from 'react'

import { SectionLayout } from '../layouts/SectionLayout'
import { AboutBeavers } from './AboutBeavers'
import { AboutMe } from './AboutMe'
import { BeaverMark } from './brand/BeaverMark'
import { Button } from './primitives/Button'
import { ScrollJackTypewriter } from './ScrollJackTypewriter'
import { useTransition } from './transition/TransitionContext'

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

  const [isAboutInView, setIsAboutInView] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById('about')
      const cta = document.getElementById('about-cta')
      if (!about || !cta) return

      const scrolledToAbout =
        window.scrollY >= about.offsetTop - window.innerHeight * 0.1
      const ctaInView = cta.getBoundingClientRect().top < window.innerHeight

      setIsAboutInView(scrolledToAbout && !ctaInView)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSkip = () => {
    const about = document.getElementById('about')
    if (!about) return
    const bottom = about.offsetTop + about.offsetHeight
    window.scrollTo({ top: bottom, behavior: 'smooth' })
  }

  return (
    <SectionLayout id="about" className="w-full" aria-label="About">
      <button
        onClick={handleSkip}
        className="fixed bottom-[1vh] left-1/2 z-30 -translate-x-1/2 cursor-pointer border-none bg-transparent font-body text-xs tracking-[0.2em] text-water uppercase transition-opacity duration-700 hover:text-iron-orange"
        style={{ opacity: isAboutInView ? 1 : 0 }}
        aria-label="Skip to end of about section"
      >
        skip
      </button>

      <AboutBeavers />

      <AboutMe />

      <div className="relative">
        <div className="sticky top-[calc(35vh-8rem)] flex justify-center sm:top-[calc(40vh-8rem)] md:top-[calc(35vh)] lg:top-[calc(40vh-8rem)]">
          <BeaverMark
            className="size-24 lg:size-36"
            bgColor="#3c3127"
            bColor="#fff5e3"
          />
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
          <div className="flex flex-col justify-center gap-4">
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
