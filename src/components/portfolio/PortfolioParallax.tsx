import { useEffect, useRef, useState } from 'react'

import cloudBg from '../../assets/landscape/portfolio/portfolio-cloud-background.svg'
import { LandmarkScene } from './LandmarkScene'
import { SCENES } from './Scenes.config'

const SCENE_WIDTH = 3342
const SCENE_SCALE = 0.9
const SCROLL_HEIGHT = 6000
const RENDERED_WIDTH = SCENE_WIDTH * SCENE_SCALE
export const PORTFOLIO_SCROLL_HEIGHT = SCENES.length * SCROLL_HEIGHT

export function PortfolioParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const totalPanorama = RENDERED_WIDTH * SCENES.length - viewportWidth

    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = PORTFOLIO_SCROLL_HEIGHT - window.innerHeight
      const progress = Math.min(scrolled / maxScroll, 1)
      setOffset(progress * totalPanorama)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [viewportWidth])

  const panoramaWidth = RENDERED_WIDTH * SCENES.length + viewportWidth

  return (
    <div style={{ height: PORTFOLIO_SCROLL_HEIGHT }}>
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-bottom bg-repeat-x"
          style={{
            backgroundImage: `url(${cloudBg})`,
            backgroundSize: `${RENDERED_WIDTH}px auto`,
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
                backgroundSize: `${RENDERED_WIDTH}px auto`,
                backgroundPosition: `left bottom`,
                left: i * RENDERED_WIDTH - i,
                width: RENDERED_WIDTH,
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
              style={{ left: i * RENDERED_WIDTH, width: RENDERED_WIDTH }}
            >
              <LandmarkScene scene={scene} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
