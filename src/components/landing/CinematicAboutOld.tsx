import type { ReactNode } from 'react'

import '@/components/landing/cinematic-about.css'
import '@/components/landing/scroll-reveal.css'

import { useEffect, useState } from 'react'

import beaverSwimmingGlide from '@/assets/about/beaver-swimming-glide.svg'
import beaverSwimmingPull from '@/assets/about/beaver-swimming-pull.svg'
import underwaterRiverbed from '@/assets/about/underwater-riverbed.svg'
import beaverAboveGlide from '@/assets/landing/beaver-swimming-above-glide.svg'
import beaverAbovePull from '@/assets/landing/beaver-swimming-above-pull.svg'
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
import { ScrollRevealText } from '@/components/landing/ScrollRevealText'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { Button } from '@/components/primitives/Button'
import { BEAVER_LINES, CLOSING, PROFESSIONAL_LINES } from '@/content/about'
import { useTransition } from '@/context/TransitionContext'

// ── Shared scene helpers ─────────────────────────────────────────────────────

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

function SwimmerPair({
  glide,
  pull,
  direction,
}: {
  glide: string
  pull: string
  direction: 'left' | 'right'
}) {
  return (
    <div
      className={`scene-beaver-swim-${direction} absolute bottom-1/4 size-28 md:size-36`}
    >
      <img
        src={glide}
        className="beaver-swim-glide absolute inset-0 h-full w-full object-contain"
        aria-hidden="true"
        alt=""
      />
      <img
        src={pull}
        className="beaver-swim-pull absolute inset-0 h-full w-full object-contain"
        aria-hidden="true"
        alt=""
      />
    </div>
  )
}

// ── CinematicBeat ────────────────────────────────────────────────────────────
//
// One sticky scene that pins while N sentences scroll over it.
//
// Layout math (N sentences):
//   outer div height = N × 100svh (from in-flow sentences after -100svh pull-up)
//   sticky range     = N × 100svh − 100svh = (N−1) × 100svh
//   scene visible for N full viewports ✓

type SentenceSpec = {
  content: ReactNode
  className?: string
  variant?: 'display' | 'body'
}

function CinematicBeat({
  scene,
  sentences,
}: {
  scene: ReactNode
  sentences: SentenceSpec[]
}) {
  return (
    <div className="relative">
      {/* Sticky scene — pins while sentences scroll */}
      <div
        className="pointer-events-none sticky top-0 h-svh overflow-clip"
        aria-hidden="true"
      >
        {scene}
      </div>
      {/* Text layer — pulled up to overlay the sticky scene */}
      <div style={{ marginTop: '-100svh' }}>
        {sentences.map((s, i) => (
          <div
            key={i}
            className="z-raised relative flex h-svh w-full items-center justify-center"
          >
            <div className="mx-auto flex h-full max-w-2xl items-start justify-center text-center">
              <span className="reveal flex h-[48svh] items-end sm:h-[55svh] md:h-[40svh]">
                <BaseT3
                  className={s.className ?? ''}
                  variant={s.variant ?? 'body'}
                >
                  {s.content}
                </BaseT3>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Sentence spec helpers ────────────────────────────────────────────────────

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

function beaverSentence(i: number): SentenceSpec {
  return {
    content: beaverText(i),
    className:
      i >= 5 ? 'leading-[1.8] text-cream' : 'leading-[1.8] text-beaver-dark',
    variant: 'display',
  }
}

function professionalSentence(i: number): SentenceSpec {
  return {
    content: i === 5 ? <em>{PROFESSIONAL_LINES[5]}</em> : PROFESSIONAL_LINES[i],
    className: 'leading-[1.8] text-cream',
    variant: 'body',
  }
}

// ── CinematicAbout ───────────────────────────────────────────────────────────

// SVG components (inline via vite-plugin-svgr) do not respond to CSS
// `position: absolute` via className the way HTML elements do. Wrap them in a
// positioned <div> instead and let the SVG fill that div naturally.

const CLOSING_COPY = [CLOSING]

export function CinematicAbout() {
  const [isScrollComplete, setisScrollComplete] = useState(true)
  const [isCtaInView, setIsCtaInView] = useState(false)
  const { transitionTo } = useTransition()

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight
      setisScrollComplete(window.scrollY === scrollMax)
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

      {/* ── Beaver beats: S1–S9 (above-ground) ─────────────────────────── */}

      {/* S1: landscape slides in from right; beaver fades in */}
      <CinematicBeat
        scene={
          <>
            <Sky />
            <div className="scene-translate-in-left absolute inset-0">
              <BeaverCopyBackground className="h-full w-full" />
            </div>
            <div className="scene-fade absolute bottom-0 w-full">
              <BeaverCopyForeground1 className="w-full" />
            </div>
          </>
        }
        sentences={[beaverSentence(0)]}
      />

      {/* S2: zoom in on the full scene */}
      <CinematicBeat
        scene={
          <>
            <Sky />
            <div className="scene-scale-zoom absolute inset-0">
              <div className="absolute inset-0">
                <BeaverCopyBackground className="h-full w-full" />
              </div>
              <div className="absolute bottom-0 w-full">
                <BeaverCopyForeground1 className="w-full" />
              </div>
            </div>
          </>
        }
        sentences={[beaverSentence(1)]}
      />

      {/* S3: dam interior (FG2) fades in */}
      <CinematicBeat
        scene={
          <>
            <Sky />
            <div className="absolute inset-0">
              <BeaverCopyBackground className="h-full w-full" />
            </div>
            <div className="scene-fade absolute bottom-0 w-full">
              <BeaverCopyForeground2 className="w-full" />
            </div>
          </>
        }
        sentences={[beaverSentence(2)]}
      />

      {/* S4: chewing beaver (FG3) fades in over dam interior */}
      <CinematicBeat
        scene={
          <>
            <Sky />
            <div className="absolute inset-0">
              <BeaverCopyBackground className="h-full w-full" />
            </div>
            <div className="absolute bottom-0 w-full">
              <BeaverCopyForeground2 className="w-full" />
            </div>
            <div className="scene-fade absolute bottom-0 w-full">
              <BeaverCopyForeground3 className="w-full" />
            </div>
          </>
        }
        sentences={[beaverSentence(3)]}
      />

      {/* S5: wood chips fall */}
      <CinematicBeat
        scene={
          <>
            <Sky />
            <div className="absolute inset-0">
              <BeaverCopyBackground className="h-full w-full" />
            </div>
            <div className="absolute bottom-0 w-full">
              <BeaverCopyForeground2 className="w-full" />
            </div>
            <div className="wood-chip-fall absolute bottom-0 w-full">
              <BeaverCopyForeground3 className="w-full" />
            </div>
          </>
        }
        sentences={[beaverSentence(4)]}
      />

      {/* S6–S7: head zoom — scene persists across two sentences */}
      <CinematicBeat
        scene={
          <div
            className="absolute inset-0 overflow-clip"
            style={{
              transform: 'scale(2.5) translate(-18%, -12%)',
              transformOrigin: '80% 100%',
            }}
          >
            <div className="absolute bottom-0 w-full">
              <BeaverCopyForeground3 className="w-full" />
            </div>
          </div>
        }
        sentences={[beaverSentence(5), beaverSentence(6)]}
      />

      {/* S8–S9: stillness — dark gradient persists across two sentences */}
      <CinematicBeat
        scene={
          <div className="scene-fade absolute inset-0 bg-gradient-to-t from-beaver-dark via-beaver-dark to-beaver" />
        }
        sentences={[beaverSentence(7), beaverSentence(8)]}
      />

      {/* ── Professional beats: S10–S16 (underwater) ────────────────────── */}
      <div className="bg-gradient-to-t from-dusk via-water-dark to-water">
        {/* S10: riverbed descends from above */}
        <CinematicBeat
          scene={
            <img
              src={underwaterRiverbed}
              className="scene-riverbed-descend absolute bottom-0 w-full"
              aria-hidden="true"
              alt=""
            />
          }
          sentences={[professionalSentence(0)]}
        />

        {/* S11: beaver swims left */}
        <CinematicBeat
          scene={
            <SwimmerPair
              glide={beaverSwimmingGlide}
              pull={beaverSwimmingPull}
              direction="left"
            />
          }
          sentences={[professionalSentence(1)]}
        />

        {/* S12: riverbed exits downward */}
        <CinematicBeat
          scene={
            <img
              src={underwaterRiverbed}
              className="scene-riverbed-exit absolute bottom-0 w-full"
              aria-hidden="true"
              alt=""
            />
          }
          sentences={[professionalSentence(2)]}
        />

        {/* S13: beaver swims right */}
        <CinematicBeat
          scene={
            <SwimmerPair
              glide={beaverSwimmingGlide}
              pull={beaverSwimmingPull}
              direction="right"
            />
          }
          sentences={[professionalSentence(3)]}
        />

        {/* S14: CSS bubbles rise */}
        <CinematicBeat
          scene={
            <>
              {[
                { size: 16, left: '12%' },
                { size: 22, left: '33%' },
                { size: 12, left: '54%' },
                { size: 18, left: '71%' },
                { size: 14, left: '88%' },
              ].map(({ size, left }, idx) => (
                <div
                  key={idx}
                  className="scene-bubble-rise absolute bottom-0 rounded-full border border-water/60 bg-water/20"
                  style={{ width: size, height: size, left }}
                />
              ))}
            </>
          }
          sentences={[professionalSentence(4)]}
        />

        {/* S15: diffused light overhead + beaver swims left */}
        <CinematicBeat
          scene={
            <>
              <div className="scene-light-diffuse absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(183,196,202,0.4)_0%,transparent_70%)]" />
              <SwimmerPair
                glide={beaverSwimmingGlide}
                pull={beaverSwimmingPull}
                direction="left"
              />
            </>
          }
          sentences={[professionalSentence(5)]}
        />

        {/* S16: landscape layers descend + above-water beaver enters from right */}
        <CinematicBeat
          scene={
            <>
              <img
                src={landscapeBackground}
                className="scene-landscape-descend absolute bottom-0 w-full"
                aria-hidden="true"
                alt=""
              />
              <img
                src={landscapeMidground}
                className="scene-landscape-descend absolute bottom-0 w-full"
                aria-hidden="true"
                alt=""
              />
              <img
                src={landscapeForeground}
                className="scene-landscape-descend absolute bottom-0 w-full"
                aria-hidden="true"
                alt=""
              />
              <SwimmerPair
                glide={beaverAboveGlide}
                pull={beaverAbovePull}
                direction="right"
              />
            </>
          }
          sentences={[professionalSentence(6)]}
        />
      </div>

      {/* ── Closing beat ─────────────────────────────────────────────────── */}
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
