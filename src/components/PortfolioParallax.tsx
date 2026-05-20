import { useEffect, useRef, useState } from 'react'

import damClouds from '../assets/landscape/portfolio/dam-landmark-cloud-background.svg'
import damScene from '../assets/landscape/portfolio/dam-landmark-scene.svg'
import { BeaverDamLandmark } from './BeaverDamLandmark'
import { Wordmark } from './brand/Wordmark'
import { BaseT5 } from './primitives/BaseT5'
import { BaseT6 } from './primitives/BaseT6'
import { useTransition } from './transition/TransitionContext'

const SCENE_WIDTH = 3342
const NUM_SCENES = 1
const SCROLL_HEIGHT_PER_SCENE = 6000

// Single source of truth for scene scale — adjust this to resize everything
const SCENE_SCALE = 0.9
const RENDERED_SCENE_WIDTH = SCENE_WIDTH * SCENE_SCALE

export const PORTFOLIO_SCROLL_HEIGHT = NUM_SCENES * SCROLL_HEIGHT_PER_SCENE

const SCENES = [
  {
    id: 'dam',
    clouds: damClouds,
    scene: damScene,
    title: 'Beaverhausen',
    description:
      'Brand identity, design system, and portfolio site. Built from scratch.',
    role: 'Designer & Engineer',
    href: '/portfolio/beaverhausen',
    available: true,
  },
]

export function PortfolioParallax() {
  const [offset, setOffset] = useState(0)
  const [hoveredScene, setHoveredScene] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { transitionTo } = useTransition()

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const { top, height } = container.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const scrolled = Math.max(0, -top)
      const progress = Math.min(scrolled / scrollable, 1)

      const totalPanoramaWidth = SCENE_WIDTH * NUM_SCENES - window.innerWidth
      setOffset(progress * totalPanoramaWidth)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalWidth = `${SCENE_WIDTH * NUM_SCENES + window.innerWidth}px`

  // Scale by width (not height) so all layers render at the same x-width
  // as the dam SVG, keeping everything aligned.
  // repeat-x on clouds so they tile across as more scenes are added.
  const baseLayerStyle = (
    src: string,
    extraOffset = 0,
    repeatX = false,
  ): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundRepeat: repeatX ? 'repeat-x' : 'no-repeat',
    backgroundPosition: 'bottom left',
    backgroundSize: `${RENDERED_SCENE_WIDTH}px auto`,
    position: 'absolute',
    inset: 0,
    width: totalWidth,
    transform: `translateX(-${offset + extraOffset}px)`,
  })

  return (
    <div
      ref={containerRef}
      style={{ height: PORTFOLIO_SCROLL_HEIGHT }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1 — Clouds (parallax, slowest) */}
        <div style={baseLayerStyle(damClouds, offset * -0.4, true)} />

        {/* Layer 2 — Static scene */}
        <div
          style={{
            ...baseLayerStyle(damScene),
            transform: `translateX(-${offset}px)`,
          }}
        />

        {/* Layer 3 — Dam landmark (interactive) */}
        {SCENES.map((scene) => (
          <div
            key={scene.id}
            className="absolute bottom-0"
            style={{
              transform: `translateX(-${offset}px)`,
              width: totalWidth,
            }}
          >
            <div
              className="absolute bottom-0 left-0"
              style={{
                width: `${RENDERED_SCENE_WIDTH}px`,
                filter: hoveredScene === scene.id ? 'brightness(1.1)' : 'none',
                transition: 'filter 300ms ease',
              }}
            >
              <BeaverDamLandmark />

              {/* Invisible hit area over the dam */}
              <div
                className="absolute bottom-[20%] left-[57%] h-[92%] w-[21%] cursor-pointer"
                onMouseEnter={() => setHoveredScene(scene.id)}
                onMouseLeave={() => setHoveredScene(null)}
                onClick={() => scene.available && transitionTo(scene.href)}
                role="button"
                aria-label={`View ${scene.title} case study`}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  scene.available &&
                  transitionTo(scene.href)
                }
              />

              {/* Title + description — fades in on hover */}
              <div
                className={`pointer-events-none absolute bottom-full left-[57%] mb-60 w-[21%] text-center transition-all duration-300 ease-out ${
                  hoveredScene === scene.id
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-0'
                } `}
              >
                <Wordmark className="mx-auto mb-4 w-2/3" />
                <p className="mx-auto mb-2 max-w-sm">
                  <BaseT5 className="leading-relaxed tracking-[0.12em] text-beaver">
                    {scene.description}
                  </BaseT5>
                </p>
                <p>
                  <BaseT6 className="mt-2 text-iron-orange uppercase">
                    {scene.role}
                  </BaseT6>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
