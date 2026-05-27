import { useEffect, useRef, useState } from 'react'

import cloudBg from '@/assets/landscape/portfolio/portfolio-cloud-background.svg'
import { LandmarkScene } from '@/components/portfolio/LandmarkScene'
import { SCENES } from '@/components/portfolio/Scenes.config'
import { gsap } from '@/deps/gsap'

const SCENE_WIDTH = 3342
const SCENE_HEIGHT = 866
const SCROLL_HEIGHT = 6000
export const PORTFOLIO_SCROLL_HEIGHT = SCENES.length * SCROLL_HEIGHT

export function PortfolioParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
  const usingKeyboard = useRef(false)

  const widthBasedWidth =
    SCENE_WIDTH * (viewportWidth < 640 ? 0.4 : viewportWidth < 1024 ? 0.6 : 0.9)
  const aspectRatio = viewportHeight / viewportWidth
  const multiplier =
    aspectRatio <= 0.75 ? 1 : 1 - 0.5 * ((aspectRatio - 0.75) / 0.25)
  const heightBasedWidth =
    multiplier * aspectRatio * viewportHeight * (SCENE_WIDTH / SCENE_HEIGHT)
  const renderedWidth =
    heightBasedWidth > 0 ? Math.min(widthBasedWidth, heightBasedWidth) : widthBasedWidth

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const totalPanorama = renderedWidth * SCENES.length - viewportWidth

    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = PORTFOLIO_SCROLL_HEIGHT - window.innerHeight
      const progress = Math.min(scrolled / maxScroll, 1)
      setOffset(progress * totalPanorama)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [viewportWidth, viewportHeight])

  useEffect(() => {
    const onKey = () => {
      usingKeyboard.current = true
    }
    const onPointer = () => {
      usingKeyboard.current = false
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const scrollToHitAreaCenter = (target: HTMLElement) => {
    const totalPanorama = renderedWidth * SCENES.length - viewportWidth
    if (totalPanorama <= 0) return
    const { left, right } = target.getBoundingClientRect()
    const deltaX = (left + right) / 2 - viewportWidth / 2
    const maxScroll = PORTFOLIO_SCROLL_HEIGHT - window.innerHeight
    gsap.to(window, {
      scrollTo: Math.max(
        0,
        window.scrollY + (deltaX / totalPanorama) * maxScroll,
      ),
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }

  const panoramaWidth = renderedWidth * SCENES.length + viewportWidth

  return (
    <div style={{ height: PORTFOLIO_SCROLL_HEIGHT }}>
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-clip"
      >
        <div
          className="absolute inset-0 bg-bottom bg-repeat-x"
          style={{
            backgroundImage: `url(${cloudBg})`,
            backgroundSize: `${renderedWidth}px auto`,
            width: panoramaWidth,
            transform: `translateX(-${offset * 0.2}px)`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            width: panoramaWidth,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {SCENES.map((scene, i) => (
            <div
              key={scene.id}
              className="absolute inset-y-0 bg-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${scene.scene})`,
                backgroundSize: `${renderedWidth}px auto`,
                backgroundPosition: `left bottom`,
                left: i * renderedWidth - i,
                width: renderedWidth,
              }}
            />
          ))}
        </div>

        <div
          className="absolute bottom-0"
          style={{
            width: panoramaWidth,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {SCENES.map((scene, i) => (
            <div
              key={scene.id}
              className="absolute bottom-0"
              style={{ left: i * renderedWidth, width: renderedWidth }}
              onFocus={(e) => {
                if (usingKeyboard.current)
                  scrollToHitAreaCenter(e.target as HTMLElement)
              }}
            >
              <LandmarkScene scene={scene} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
