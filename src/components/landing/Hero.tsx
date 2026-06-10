import { useEffect, useState } from 'react'

import { Wordmark } from '@/components/brand/Wordmark'
import { Typewriter } from '@/components/landing/Typewriter'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { HERO_COPY } from '@/content/hero'

import { DownloadResumeButton } from '../DownloadResumeButton'

const FULL_TEXT = HERO_COPY.map((p) => p.text).join('')
const WORDMARK_DELAY = 600

export const Hero = () => {
  const [showWordmark, setShowWordmark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [typewriterDone, setTypewriterDone] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!typewriterDone) return
    const t1 = setTimeout(() => setShowWordmark(true), WORDMARK_DELAY)
    return () => {
      clearTimeout(t1)
    }
  }, [typewriterDone])

  const renderDefinition = (displayed: string) => {
    let charsRendered = 0

    return HERO_COPY.map((part, i) => {
      const start = charsRendered
      charsRendered += part.text.length

      const visible = displayed.slice(start, charsRendered)

      if (!visible) {
        return null
      }

      return (
        <span key={i} className={part.className}>
          {visible}
        </span>
      )
    })
  }

  return (
    <section
      id="hero"
      aria-label="Beaverhausen hero"
      className="flex min-h-[70svh] flex-col items-center justify-center py-12 sm:pt-4 md:py-0"
    >
      <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-5 md:min-h-[65svh] md:gap-0">
        <div className="flex w-full max-w-2xl flex-1 flex-col items-start gap-4 sm:gap-2 md:justify-center md:gap-6">
          <div className="min-h-35 sm:min-h-0 md:min-h-21">
            <Typewriter
              text={FULL_TEXT}
              onComplete={() => setTypewriterDone(true)}
              className="sm:leading-none md:leading-normal lg:leading-[1.75]"
              variant="display"
              renderText={(displayed) => renderDefinition(displayed)}
            />
          </div>

          <div className="flex w-full flex-col gap-2 sm:gap-0">
            <div
              className={`transition-all duration-800 ease-in outline-none ${
                showWordmark
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-3 opacity-0'
              }`}
            >
              <Wordmark className="h-auto w-full sm:max-w-xs md:max-w-xl lg:max-w-2xl" />
            </div>

            <p
              className={[
                'transition-all duration-800 ease-linear delay-500',
                showWordmark ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              <BaseT6 className="text-beaver uppercase md:leading-none dark:text-iron-orange">
                Designing systems. Engineering experiences.
              </BaseT6>
            </p>
          </div>

          <div
            className={[
              'transition-opacity duration-800 ease-linear delay-700',
              showWordmark ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            <DownloadResumeButton variant="ghost" />
          </div>
        </div>

        <button
          className={`flex min-h-12 flex-col items-center gap-2 border-none bg-transparent p-0 transition-opacity delay-800 duration-800 ease-in sm:hidden md:flex md:min-h-16 ${showWordmark && !scrolled ? 'cursor-pointer opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() =>
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to about"
        >
          <BaseT6 className="text-beaver uppercase dark:text-beaver-dark">
            scroll
          </BaseT6>
          <div
            className={`w-px origin-top bg-iron-orange transition-[height] delay-1000 duration-200 ease-linear dark:bg-beaver-dark ${showWordmark && !scrolled ? 'h-6 md:h-10' : 'h-px'}`}
          />
        </button>
      </div>
    </section>
  )
}
