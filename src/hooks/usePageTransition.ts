import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

export type TransitionState = 'idle' | 'flooding' | 'holding' | 'draining'

const FLOOD_DURATION = 1200
const HOLD_DURATION = 500
const DRAIN_DURATION = 1200

export const usePageTransition = () => {
  const navigate = useNavigate()
  const [state, setState] = useState<TransitionState>('idle')

  const transitionTo = useCallback(
    (path: string) => {
      if (state !== 'idle') return

      // 1. Flood
      setState('flooding')

      setTimeout(() => {
        // 2. Hold — navigate while water is covering the screen
        setState('holding')
        navigate(path)

        setTimeout(() => {
          // 3. Drain
          setState('draining')

          setTimeout(() => {
            // 4. Done
            setState('idle')
          }, DRAIN_DURATION)
        }, HOLD_DURATION)
      }, FLOOD_DURATION)
    },
    [state, navigate],
  )

  return { transitionTo, state }
}
