import type { ReactNode } from 'react'

import '@/components/landing/cinematic-about.css'
import '@/components/landing/scroll-reveal.css'

import { useEffect, useState } from 'react'

import beaverSwimmingGlide from '@/assets/about/beaver-swimming-glide.svg'
import beaverSwimmingPull from '@/assets/about/beaver-swimming-pull.svg'
import underwaterRiverbed from '@/assets/about/underwater-riverbed.svg'
import landscapeBackground from '@/assets/landscape/background.svg'
import dawnCloudsBg from '@/assets/landscape/dawn-clouds-bg.svg'
import duskCloudsBg from '@/assets/landscape/dusk-clouds-bg.svg'
import landscapeForeground from '@/assets/landscape/foreground.svg'
import landscapeMidground from '@/assets/landscape/midground.svg'
import { BeaverMark } from '@/components/brand/BeaverMark'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { BeaverCopyBackground } from '@/components/landing/BeaverCopyBackground'
import { BeaverCopyForeground1 } from '@/components/landing/BeaverCopyForeground1'
import { BeaverCopyForeground2 } from '@/components/landing/BeaverCopyForeground2'
import { BeaverCopyForeground3 } from '@/components/landing/BeaverCopyForeground3'
import { ScrollRevealTextV2 as ScrollRevealText } from '@/components/landing/ScrollRevealTextV2'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { Button } from '@/components/primitives/Button'
import { BEAVER_LINES, CLOSING, PROFESSIONAL_LINES } from '@/content/about'
import { useTransition } from '@/context/TransitionContext'

// ── Helpers ──────────────────────────────────────────────────────────────────

function Sky() {
  return (
    <>
      <img
        src={dawnCloudsBg}
        className="absolute inset-0 h-full w-full object-contain dark:hidden"
        aria-hidden="true"
        alt=""
      />
      <img
        src={duskCloudsBg}
        className="absolute inset-0 hidden h-full w-full object-contain dark:block"
        aria-hidden="true"
        alt=""
      />
    </>
  )
}

function beaverText(i: number): ReactNode {
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
}

function beaverClass(i: number) {
  return i >= 5 ? 'leading-[1.8] text-cream' : 'leading-[1.8] text-beaver-dark'
}

function professionalContent(i: number): ReactNode {
  return i === 5 ? <em>{PROFESSIONAL_LINES[5]}</em> : PROFESSIONAL_LINES[i]
}

// ── Sentence row — shared layout for all sentence divs ────────────────────────

function Sentence({
  timelineClass,
  children,
}: {
  timelineClass: string
  children: ReactNode
}) {
  return (
    <div
      className={`${timelineClass} z-raised relative flex h-svh w-full items-center justify-center`}
    >
      <div className="mx-auto flex h-full max-w-2xl items-start justify-center text-center">
        <span className="reveal flex h-[48svh] items-end sm:h-[55svh] md:h-[40svh]">
          {children}
        </span>
      </div>
    </div>
  )
}

// ── CinematicAbout ────────────────────────────────────────────────────────────

const CLOSING_LINES = [CLOSING]

export function CinematicAbout() {
  const [isScrollComplete, setIsScrollComplete] = useState(true)
  const [isCtaInView, setIsCtaInView] = useState(false)
  const { transitionTo } = useTransition()

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight
      setIsScrollComplete(window.scrollY === scrollMax)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Skip-to-work button — appears once user enters the cinematic section */}
      <div
        className={`z-floating fixed bottom-[0.5vh] left-1/2 -translate-x-1/2 transition-opacity sm:bottom-px md:bottom-[1vh] ${isCtaInView ? 'opacity-100' : 'opacity-0'}`}
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

      {/* ── S1–S9: above-ground ────────────────────────────────────────────────
          One persistent sticky canvas. All SVG layers pre-rendered.
          Sentence divs define view timelines (ca-s1…ca-s9); ca-above-ground
          exposes them via timeline-scope so the canvas layers can reference
          them with animation-timeline: --ca-sN.                            */}
      <div className="ca-above-ground relative">
        {/* Sticky canvas */}
        <div
          className="pointer-events-none sticky top-0 h-svh overflow-clip"
          aria-hidden="true"
        >
          <Sky />
          {/* Background: fills viewport with xMidYMid slice (see BeaverCopyBackground) */}
          <div className="ca-bg absolute inset-0">
            <BeaverCopyBackground className="h-full w-full" />
          </div>
          {/* Zoom container: scale(1)→scale(2) on S2, head-zoom on S6.
              transform-origin: center bottom keeps the ground line anchored.
              Contains all three foreground layers so they scale together.   */}
          <div className="ca-zoom absolute inset-0">
            {/* fg1: translates in from right on S1, fades out on S3 */}
            <div className="ca-fg1 absolute bottom-0 left-0">
              <BeaverCopyForeground1 className="h-[30svh] w-auto" />
            </div>
            {/* fg2: fades in on S3 (simultaneous with fg1 exit), fades out on S8 */}
            <div className="ca-fg2 absolute bottom-0 left-0">
              <BeaverCopyForeground2 className="h-[30svh] w-auto" />
            </div>
            {/* fg3 container: fades in on S4, wood chips activate on S5,
                glimmer activates on S7, fades out on S8                    */}
            <div className="ca-fg3-container absolute bottom-0 left-0">
              <BeaverCopyForeground3 className="h-[30svh] w-auto" />
            </div>
          </div>
          {/* Dark gradient: fades in on S8, held through S9 */}
          <div className="ca-dark-gradient absolute inset-0 bg-gradient-to-t from-beaver-dark via-beaver-dark to-beaver" />
        </div>

        {/* Sentence divs — pulled up to overlay the sticky canvas */}
        <div style={{ marginTop: '-100svh' }}>
          {BEAVER_LINES.map((_, i) => (
            <Sentence key={i} timelineClass={`ca-s${i + 1}`}>
              <BaseT3 className={beaverClass(i)} variant="display">
                {beaverText(i)}
              </BaseT3>
            </Sentence>
          ))}
        </div>
      </div>

      {/* ── P1–P6: underwater ──────────────────────────────────────────────────
          One sticky canvas. Riverbed, three beaver swimmers, bubbles, light.
          Background gradient is on the section wrapper (in-flow, not sticky)
          so it persists below the canvas for the full scroll range.        */}
      <div className="ca-underwater relative bg-gradient-to-t from-dusk via-water-dark to-water">
        {/* Sticky canvas */}
        <div
          className="pointer-events-none sticky top-0 h-svh overflow-clip"
          aria-hidden="true"
        >
          {/* Riverbed: descends on P1, held through P2, exits on P3 */}
          <img
            src={underwaterRiverbed}
            className="ca-riverbed absolute bottom-0 h-[30svh] w-auto"
            aria-hidden="true"
            alt=""
          />

          {/* Beaver swimmers — each has its own CSS class tied to its sentence */}
          <div className="ca-beaver-p2 absolute bottom-1/4 size-28 md:size-36">
            <img
              src={beaverSwimmingGlide}
              className="beaver-swim-glide absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
            <img
              src={beaverSwimmingPull}
              className="beaver-swim-pull absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
          </div>
          <div className="ca-beaver-p4 absolute bottom-1/4 size-28 md:size-36">
            <img
              src={beaverSwimmingGlide}
              className="beaver-swim-glide absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
            <img
              src={beaverSwimmingPull}
              className="beaver-swim-pull absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
          </div>
          <div className="ca-beaver-p6 absolute bottom-1/4 size-28 md:size-36">
            <img
              src={beaverSwimmingGlide}
              className="beaver-swim-glide absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
            <img
              src={beaverSwimmingPull}
              className="beaver-swim-pull absolute inset-0 h-full w-full object-contain"
              aria-hidden="true"
              alt=""
            />
          </div>

          {/* Bubbles — tied to P5 */}
          {(
            [
              { size: 16, left: '12%' },
              { size: 22, left: '33%' },
              { size: 12, left: '54%' },
              { size: 18, left: '71%' },
              { size: 14, left: '88%' },
            ] as const
          ).map(({ size, left }, idx) => (
            <div
              key={idx}
              className="ca-bubble absolute bottom-0 rounded-full border border-water/60 bg-water/20"
              style={{ width: size, height: size, left }}
            />
          ))}

          {/* Diffused light — fades in during P6 */}
          <div
            className="ca-light-diffuse absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(183,196,202,0.4) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Sentence divs */}
        <div style={{ marginTop: '-100svh' }}>
          {PROFESSIONAL_LINES.slice(0, 6).map((_, i) => (
            <Sentence key={i} timelineClass={`ca-p${i + 1}`}>
              <BaseT3 className="leading-[1.8] text-cream" variant="body">
                {professionalContent(i)}
              </BaseT3>
            </Sentence>
          ))}
        </div>
      </div>

      {/* ── S16: landscape transition ──────────────────────────────────────────
          Landscape layers descend from above, become sticky at the bottom,
          and persist into the closing section.                              */}
      <div className="ca-landscape-section relative bg-gradient-to-t from-dusk via-water-dark to-water">
        {/* Sticky canvas */}
        <div
          className="pointer-events-none sticky top-0 h-svh overflow-clip"
          aria-hidden="true"
        >
          <img
            src={landscapeBackground}
            className="ca-landscape-layer absolute bottom-0 h-[30svh] w-auto"
            aria-hidden="true"
            alt=""
          />
          <img
            src={landscapeMidground}
            className="ca-landscape-layer absolute bottom-0 h-[30svh] w-auto"
            aria-hidden="true"
            alt=""
          />
          <img
            src={landscapeForeground}
            className="ca-landscape-layer absolute bottom-0 h-[30svh] w-auto"
            aria-hidden="true"
            alt=""
          />
        </div>

        {/* One sentence */}
        <div style={{ marginTop: '-100svh' }}>
          <Sentence timelineClass="ca-l1">
            <BaseT3 className="leading-[1.8] text-cream" variant="body">
              {PROFESSIONAL_LINES[6]}
            </BaseT3>
          </Sentence>
        </div>
      </div>

      {/* ── Closing ────────────────────────────────────────────────────────────
          BeaverMark rises and persists. ScrollRevealText for the closing
          line. CTA appears once the BeaverMark section is scrolled past.   */}
      <div className="relative">
        <div className="sticky top-[15svh] flex justify-center sm:top-[25svh] md:top-[18svh]">
          <BeaverMark
            className={`size-[20svh] transition-opacity ease-out md:size-[15svh] ${isScrollComplete ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <ScrollRevealText
          lines={CLOSING_LINES}
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
