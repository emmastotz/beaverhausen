import { useEffect, useState } from 'react'

import { SectionLayout } from '../layouts/SectionLayout'
import { Wordmark } from './brand/Wordmark'
import { BaseT8 } from './primitives/BaseT8'
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Typewriter
            text={FULL_TEXT}
            onComplete={() => {
              setTimeout(() => setShowWordmark(true), WORDMARK_DELAY)
              setTimeout(() => setShowScroll(true), SCROLL_DELAY)
            }}
            className="mb-8 min-h-[4.5em] font-display text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.75] tracking-[0.01em] text-beaver-dark antialiased sm:my-4 md:mt-0 md:mb-16"
            renderText={(displayed) => renderDefinition(displayed)}
          />

          {/* Wordmark reveal */}
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

          {/* Tagline */}
          <p
            className={[
              'mt-3 md:mt-6 transition-opacity duration-[800ms] delay-300',
              showWordmark ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            <BaseT8 className="text-beaver uppercase">
              Designing systems. Engineering experiences.
            </BaseT8>
          </p>
        </div>

        <button
          className={[
            'hidden sm:flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-[800ms] bg-transparent border-none p-0 md:hidden',
            showScroll && !scrolled ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() =>
            document
              .getElementById('work')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to work"
        >
          <BaseT8 className="text-beaver uppercase sm:pb-0">scroll</BaseT8>
          <div className="animate-grow hidden h-10 w-px origin-top bg-iron-orange md:flex" />
        </button>
      </div>

      <button
        className={[
          'absolute bottom-1/5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-[800ms] bg-transparent border-none p-0 sm:hidden md:flex',
          showScroll && !scrolled ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={() =>
          document
            .getElementById('work')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Scroll to work"
      >
        <span className="pb-6 font-body text-[0.7rem] tracking-[0.2em] text-beaver uppercase sm:pb-0 md:mb-8">
          scroll
        </span>
        <div className="animate-grow hidden h-10 w-px origin-top bg-iron-orange lg:flex" />
      </button>
    </SectionLayout>
  )
}
