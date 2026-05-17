import { useEffect, useState } from 'react'

import { SectionLayout } from '../layouts/SectionLayout'
import { Wordmark } from './brand/Wordmark'
import { BaseT6 } from './primitives/BaseT6'
import { Typewriter } from './Typewriter'

type DefinitionPart = {
  text: string
  className: string
}

const DEFINITION_PARTS: DefinitionPart[] = [
  {
    text: 'The dwelling of an assiduous creature suspended somewhere between design instinct and engineering precision;',
    className: 'text-beaver-dark',
  },
  {
    text: ' ecosystem modifications considered routine maintenance.',
    className: 'italic text-beaver',
  },
]
const FULL_TEXT = DEFINITION_PARTS.map((p) => p.text).join('')
const WORDMARK_DELAY = 600
const SCROLL_DELAY = WORDMARK_DELAY + 1200

export const Hero = () => {
  const [showWordmark, setShowWordmark] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [typewriterDone, setTypewriterDone] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!typewriterDone) return
    const t1 = setTimeout(() => setShowWordmark(true), WORDMARK_DELAY)
    const t2 = setTimeout(() => setShowScroll(true), SCROLL_DELAY)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [typewriterDone])

  const renderDefinition = (displayed: string) => {
    let charsRendered = 0

    return DEFINITION_PARTS.map((part, i) => {
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
    <SectionLayout
      id="hero"
      ariaLabel="Beaverhausen hero"
      className="flex min-h-svh flex-col items-center justify-center px-8 pb-24 sm:px-5 sm:py-12 md:pt-0 md:pb-36"
    >
      <div className="flex w-full max-w-2xl flex-col items-center justify-between sm:gap-6">
        <div className="mb-16 flex w-full max-w-2xl flex-1 flex-col items-start sm:mb-0">
          <div className="mb-8 min-h-[4.5em] sm:my-4 md:mt-0 md:mb-16">
            <Typewriter
              text={FULL_TEXT}
              onComplete={() => setTypewriterDone(true)}
              className="leading-[1.75] text-beaver-dark"
              variant="display"
              renderText={(displayed) => renderDefinition(displayed)}
            />
          </div>

          <div
            className={[
              'w-full transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] outline-none',
              showWordmark
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3',
            ].join(' ')}
          >
            <Wordmark className="h-auto w-full max-w-2xl" />
          </div>

          <p
            className={[
              'mt-3 md:mt-6 transition-opacity duration-[800ms] delay-300',
              showWordmark ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            <BaseT6 className="text-beaver uppercase">
              Designing systems. Engineering experiences.
            </BaseT6>
          </p>
        </div>

        <button
          className={[
            'hidden sm:flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-[800ms] bg-transparent border-none p-0 md:hidden',
            showScroll && !scrolled ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() =>
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to about"
        >
          <BaseT6 className="text-beaver uppercase sm:pb-0">scroll</BaseT6>
          <div className="animate-grow h-10 w-px origin-top bg-iron-orange md:flex" />
        </button>
      </div>

      <button
        className={[
          'absolute bottom-1/5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-[800ms] bg-transparent border-none p-0 sm:hidden md:flex',
          showScroll && !scrolled ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Scroll to about"
      >
        <BaseT6 className="text-beaver uppercase sm:pb-0">scroll</BaseT6>
        <div className="animate-grow h-10 w-px origin-top bg-iron-orange lg:flex" />
      </button>
    </SectionLayout>
  )
}
