import '@/components/landing/landing-parallax.css'

import { useEffect, useState } from 'react'

import beaverBackground from '@/assets/landing/beaver-copy-background.svg'
import dawnCloudBg from '@/assets/landscape/dawn-clouds-bg.svg'
import duskCloudBg from '@/assets/landscape/dusk-clouds-bg.svg'
import parallaxLandscape from '@/assets/portfolio/landscape-all.svg'
import { BeaverMark } from '@/components/brand/BeaverMark'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { Hero } from '@/components/landing/Hero'
// import { ParallaxLandscapeV2 as ParallaxLandscape } from '@/components/landing/ParallaxLandscapeV2'
import {
  ScrollRevealText,
  composeScrollSections,
  type ScrollSection,
} from '@/components/landing/ScrollRevealText'
import { Button } from '@/components/primitives/Button'
import { BEAVER_LINES, CLOSING, PROFESSIONAL_LINES } from '@/content/about'
import { useTransition } from '@/context/TransitionContext'

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

const {
  lines: ABOUT_BEAVERS,
  renderText: renderBeaverCopy,
  getLineProps: getBeaverLineProps,
} = composeScrollSections([BEAVER_SECTION])

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
  lines: ABOUT_ME,
  renderText: renderMeCopy,
  getLineProps: getMeLineProps,
} = composeScrollSections([BEAVER_SECTION, PROFESSIONAL_SECTION])

// const SCENE_WIDTH = 3080
// const SCENE_HEIGHT = 1024

export function LandingParallax() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [isScrollComplete, setisScrollComplete] = useState(true)
  const [isCtaInView, setIsCtaInView] = useState(false)
  const { transitionTo } = useTransition()

  const showLandscape =
    viewportWidth >= 1536 || (viewportWidth >= 640 && viewportWidth < 768)
  const sceneCount = 1 + (showLandscape ? 1 : 0)
  const landscapeOffset = showLandscape ? 1 : 0
  const scrollHeight = viewportWidth < 1024 ? 1800 : 3600
  const landingScrollHeight = sceneCount * scrollHeight

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
    <div
      className="landing-parallax-scroll relative flex flex-col"
      style={{ height: landingScrollHeight }}
    >
      <div
        className="landing-parallax sticky top-0 h-screen w-full overflow-clip"
        style={{ '--scene-count': sceneCount } as React.CSSProperties}
      >
        <div
          className={`sun-fade pointer-events-none fixed -bottom-15 left-1/2 size-[25svh] rounded-full bg-dawn blur-xs brightness-120 transition-opacity ease-in will-change-[opacity] md:size-[20svh] dark:bg-iron-orange dark:blur-sm dark:brightness-150 ${isScrollComplete ? 'opacity-0' : 'opacity-100'}`}
        />
        <div
          className="landing-parallax-pan-slow absolute inset-0 bg-bottom bg-repeat-x dark:hidden"
          style={{
            backgroundImage: `url(${dawnCloudBg})`,
            backgroundSize: 'var(--panel-width) auto',
            width: 'var(--panorama-width)',
          }}
        />
        <div
          className="landing-parallax-pan-slow absolute inset-0 bg-bottom bg-repeat-x not-dark:hidden"
          style={{
            backgroundImage: `url(${duskCloudBg})`,
            backgroundSize: 'var(--panel-width) auto',
            width: 'var(--panorama-width)',
          }}
        />
        <div
          className="landing-parallax-pan absolute inset-0"
          style={{ width: 'var(--panorama-width)' }}
        >
          {showLandscape && (
            <div
              className="absolute inset-y-0 bg-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${parallaxLandscape})`,
                backgroundSize: 'var(--panel-width) auto',
                backgroundPosition: 'left bottom',
                left: 0,
                width: 'var(--panel-width)',
              }}
            />
          )}

          <div
            className="absolute inset-y-0 bg-bottom bg-no-repeat"
            style={{
              backgroundImage: `url(${beaverBackground})`,
              backgroundSize: 'var(--panel-width) auto',
              backgroundPosition: 'left bottom',
              left: `calc(${landscapeOffset} * (var(--panel-width)))`,
              width: 'var(--panel-width)',
            }}
          />
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
        </div>
      </div>

      <section id="hero" className="h-svh" aria-label="Hero">
        <Hero />
      </section>

      <section id="about" className="size-full" aria-label="About">
        <div className="relative size-full">
          <ScrollRevealText
            lines={ABOUT_BEAVERS}
            renderText={renderBeaverCopy}
            getLineProps={getBeaverLineProps}
            className="leading-[1.75]"
          />
        </div>

        <div className="relative size-full">
          <ScrollRevealText
            lines={ABOUT_ME}
            renderText={renderMeCopy}
            getLineProps={getMeLineProps}
            className="leading-[1.75]"
          />
          {/* <div className="h-[700svh]"></div> */}
        </div>

        <div className="relative">
          <div className="sticky top-[15svh] flex justify-center sm:top-[25svh] md:top-[18svh]">
            <BeaverMark
              className={`size-[20svh] transition-opacity ease-out md:size-[15svh] ${isScrollComplete ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          <ScrollRevealText
            lines={[CLOSING]}
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
    </div>
  )
}
