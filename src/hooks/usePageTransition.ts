import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { gsap } from '@/deps/gsap'

export type TransitionState = 'idle' | 'flooding' | 'holding' | 'draining'

export const FLOOD_DURATION = 1200
const HOLD_DURATION = 500
export const DRAIN_DURATION = 1200

export const usePageTransition = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [state, setState] = useState<TransitionState>('idle')
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(
    () => () => {
      tl.current?.kill()
    },
    [],
  )

  const transitionTo = useCallback(
    (path: string) => {
      if (state !== 'idle') return
      if (path === pathname) return

      tl.current?.kill()
      setState('flooding')

      tl.current = gsap
        .timeline()
        .call(
          () => {
            setState('holding')
            navigate(path)
          },
          [],
          FLOOD_DURATION / 1000,
        )
        .call(
          () => setState('draining'),
          [],
          (FLOOD_DURATION + HOLD_DURATION) / 1000,
        )
        .call(
          () => setState('idle'),
          [],
          (FLOOD_DURATION + HOLD_DURATION + DRAIN_DURATION) / 1000,
        )
    },
    [state, navigate, pathname],
  )

  return { transitionTo, state }
}
