import { useEffect, useRef, useState } from 'react'

import type { SceneConfig } from '@/components/portfolio/Scenes.config'

import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT5 } from '@/components/primitives/BaseT5'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { TransitionLink } from '@/components/primitives/TransitionLink'

interface Props {
  scene: SceneConfig
}

function ArrowCue({
  visible,
  available,
}: {
  visible: boolean
  available: boolean
}) {
  return (
    <div
      className={`flex min-h-12 flex-col items-center gap-2 transition-opacity duration-100 ease-in sm:hidden md:flex lg:min-h-18 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <BaseT6 className="text-beaver uppercase dark:text-beaver-dark">
        {available ? 'Click to explore' : 'Work in progress'}
      </BaseT6>
      {available && (
        <div
          className={`w-px origin-top bg-iron-orange transition-[height] delay-200 duration-200 ease-linear dark:bg-cream ${visible ? 'h-6 lg:h-10' : 'h-px'}`}
        />
      )}
    </div>
  )
}

export function LandmarkScene({ scene }: Props) {
  const [active, setActive] = useState(false)
  const { bottom, left, width, height } = scene.hitArea
  const hitAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hitAreaRef.current
    if (!el) return

    const checkVisibility = () => {
      const { left: x, right } = el.getBoundingClientRect()
      const centerX = (x + right) / 2
      setActive(centerX > 0 && centerX < window.innerWidth)
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    checkVisibility()
    return () => window.removeEventListener('scroll', checkVisibility)
  }, [])

  return (
    <section
      className="relative w-full"
      aria-label={scene.title}
      style={{
        filter: active ? 'brightness(1.1)' : 'none',
        transition: 'filter 300ms ease',
      }}
    >
      {scene.landmark}

      <div
        ref={hitAreaRef}
        className="absolute"
        style={{ bottom, left, width, height }}
      >
        {scene.available && (
          <TransitionLink
            to={scene.href}
            className="block size-full rounded-md outline-none focus-visible:ring-2 focus-visible:ring-iron-orange/50"
            onFocus={() => setActive(true)}
            aria-label={`View ${scene.title} case study`}
            aria-describedby={`scene-${scene.id}`}
          />
        )}
      </div>

      <div
        id={`scene-${scene.id}`}
        className={`pointer-events-auto absolute bottom-full mb-[22svh] flex w-[var(--scene-width)] flex-col gap-4 text-center transition-all duration-700 ease-out sm:w-[calc(var(--scene-width)*3)] sm:-translate-x-1/3 sm:gap-0 md:mb-[22svh] md:w-[var(--scene-width)] md:translate-none md:gap-4 lg:gap-6 ${
          active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        } `}
        style={{ left, '--scene-width': width } as React.CSSProperties}
      >
        {scene.wordmark ? (
          <>
            <AutoH className="sr-only">{scene.title}</AutoH>
            {scene.wordmark}
          </>
        ) : (
          <AutoH>
            <BaseT1 className="text-beaver-dark dark:text-cream">
              {scene.title}
            </BaseT1>
          </AutoH>
        )}

        <p className="mx-auto max-w-2xs text-pretty sm:max-w-none md:max-w-xs">
          <BaseT5 className="leading-relaxed tracking-[0.12em] text-beaver sm:leading-none md:leading-relaxed dark:text-beaver-dark">
            {scene.description}
          </BaseT5>
        </p>
        <p>
          <BaseT6 className="text-iron-orange uppercase">{scene.role}</BaseT6>
        </p>
      </div>

      <div
        className="absolute flex items-center justify-center"
        style={{ bottom: `calc(${bottom} + 100%)`, left, width }}
      >
        <ArrowCue visible={active} available={scene.available} />
      </div>
    </section>
  )
}
