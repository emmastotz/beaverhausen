import { useEffect, useRef, useState } from 'react'

import type { SceneConfig } from '@/components/portfolio/Scenes.config'

import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT5 } from '@/components/primitives/BaseT5'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { useTransition } from '@/components/transition/TransitionContext'

interface Props {
  scene: SceneConfig
}

function ArrowCue({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute flex flex-col items-center gap-0.5 transition-all duration-200 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className="size-6 animate-bounce text-iron-orange"
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
  const [hovered, setHovered] = useState(false)
  const { transitionTo } = useTransition()
  const { bottom, left, width, height } = scene.hitArea
  const hitAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hitAreaRef.current
    if (!el) return

    const checkVisibility = () => {
      const { left: x, right } = el.getBoundingClientRect()
      const centerX = (x + right) / 2
      setHovered(centerX > 0 && centerX < window.innerWidth)
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    checkVisibility()
    return () => window.removeEventListener('scroll', checkVisibility)
  }, [])

  const handleClick = () => {
    if (scene.available) transitionTo(scene.href)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && scene.available) transitionTo(scene.href)
  }

  return (
    <div
      className="relative w-full"
      style={{
        filter: hovered ? 'brightness(1.1)' : 'none',
        transition: 'filter 300ms ease',
      }}
    >
      {scene.landmark}

      <div
        ref={hitAreaRef}
        className="absolute cursor-pointer"
        style={{ bottom, left, width, height }}
        onFocus={() => setHovered(true)}
        onClick={handleClick}
        role="button"
        aria-label={`View ${scene.title} case study`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />

      <div
        className={`pointer-events-auto absolute bottom-full mb-40 text-center transition-all duration-700 ease-out sm:mb-60 ${
          hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        } `}
        style={{ left, width }}
      >
        {scene.available ? (
          ''
        ) : (
          <BaseT6 className="text-iron-orange uppercase">
            Work in progress
          </BaseT6>
        )}
        {scene.wordmark ? (
          scene.wordmark
        ) : (
          <p className="mb-4">
            <BaseT1 className="text-beaver-dark">{scene.title}</BaseT1>
          </p>
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

      <div
        className="absolute flex items-center justify-center"
        style={{ bottom: `calc(${bottom} + 100% + 2rem)`, left, width }}
      >
        <ArrowCue visible={hovered} />
      </div>
    </div>
  )
}
