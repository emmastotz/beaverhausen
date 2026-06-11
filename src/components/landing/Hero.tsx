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
      className="flex min-h-[65svh] flex-col items-center justify-between sm:min-h-[60svh] lg:min-h-[65svh]"
    >
      <div className="flex w-full max-w-2xl flex-1 flex-col items-start justify-evenly lg:justify-center lg:gap-16">
        <div className="min-h-30 sm:min-h-15 md:min-h-17 lg:min-h-27">
          <Typewriter
            text={FULL_TEXT}
            onComplete={() => setTypewriterDone(true)}
            className="w-full"
            renderText={(displayed) => renderDefinition(displayed)}
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-2 lg:gap-8">
          <div className="flex w-full flex-col gap-2 sm:gap-1 lg:gap-2">
            <div
              className={`will-change-[transform,opacity] transition-[opacity,transform] duration-800 ease-in ${
                showWordmark
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-3 opacity-0'
              }`}
            >
              <Wordmark className="h-auto w-full sm:max-w-sm md:max-w-md lg:max-w-none" />
            </div>

            <p
              className={[
                'will-change-[opacity] transition-opacity duration-800 ease-linear delay-500',
                showWordmark ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              <BaseT6 className="flex text-beaver uppercase lg:leading-7 dark:text-iron-orange">
                Designing systems. Engineering experiences.
              </BaseT6>
            </p>
          </div>

          <div
            className={[
              'will-change-[opacity] transition-opacity duration-800 ease-linear delay-700',
              showWordmark ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            <DownloadResumeButton variant="ghost" />
          </div>
        </div>
      </div>

      <button
        className={`flex min-h-12 flex-col items-center gap-2 border-none bg-transparent p-0 transition-opacity delay-800 duration-800 ease-in sm:hidden lg:flex lg:min-h-16 ${showWordmark && !scrolled ? 'cursor-pointer opacity-100' : 'pointer-events-none opacity-0'}`}
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
          className={`w-px origin-top bg-iron-orange transition-[height] delay-1000 duration-200 ease-linear dark:bg-beaver-dark ${showWordmark && !scrolled ? 'h-6 lg:h-10' : 'h-px'}`}
        />
      </button>
    </section>
  )
}
