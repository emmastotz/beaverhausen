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

function ArrowCue({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute flex flex-col items-center gap-0.5 text-iron-orange transition-all duration-200 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
      aria-hidden="true"
    >
      <BaseT6 className="mb-1 uppercase">Click to explore</BaseT6>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className={`size-6 animate-bounce`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
        />
      </svg>
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
        className={`pointer-events-auto absolute bottom-full mb-40 text-center transition-all duration-700 ease-out sm:mb-60 ${
          active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        } `}
        style={{ left, width }}
      >
        {!scene.available && (
          <BaseT6 className="text-iron-orange uppercase">
            Work in progress
          </BaseT6>
        )}
        {scene.wordmark ? (
          <>
            <AutoH className="sr-only">{scene.title}</AutoH>
            {scene.wordmark}
          </>
        ) : (
          <AutoH className="mb-4">
            <BaseT1 className="text-beaver-dark">{scene.title}</BaseT1>
          </AutoH>
        )}

        <p className="mx-auto mb-2 max-w-2xs text-pretty sm:max-w-xs">
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

      {scene.available && (
        <div
          className="absolute flex items-center justify-center"
          style={{ bottom: `calc(${bottom} + 100%)`, left, width }}
        >
          <ArrowCue visible={active} />
        </div>
      )}
    </section>
  )
}
