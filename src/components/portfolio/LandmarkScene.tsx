import { useState } from 'react'

import type { SceneConfig } from './Scenes.config'

import { BaseT1 } from '../primitives/BaseT1'
import { BaseT5 } from '../primitives/BaseT5'
import { BaseT6 } from '../primitives/BaseT6'
import { useTransition } from '../transition/TransitionContext'

interface Props {
  scene: SceneConfig
}

export function LandmarkScene({ scene }: Props) {
  const [hovered, setHovered] = useState(false)
  const { transitionTo } = useTransition()
  const { bottom, left, width, height } = scene.hitArea

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

      {/* Invisible hit area */}
      <div
        className="absolute cursor-pointer"
        style={{ bottom, left, width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        role="button"
        aria-label={`View ${scene.title} case study`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />

      {/* Scene info */}
      <div
        className={`pointer-events-none absolute bottom-full mb-60 text-center transition-all duration-300 ease-out ${
          hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        } `}
        style={{ left, width }}
      >
        {scene.wordmark ? (
          scene.wordmark
        ) : (
          <p className="mb-4">
            <BaseT1 className="text-beaver-dark">{scene.title}</BaseT1>
          </p>
        )}

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
  )
}
