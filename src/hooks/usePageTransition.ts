import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export type TransitionState = 'idle' | 'flooding' | 'holding' | 'draining'

const FLOOD_DURATION = 1200
const HOLD_DURATION = 500
const DRAIN_DURATION = 1200

export const usePageTransition = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [state, setState] = useState<TransitionState>('idle')
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  const transitionTo = useCallback(
    (path: string) => {
      if (state !== 'idle') return
      if (path === pathname) return

      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []

      setState('flooding')

      const t1 = setTimeout(() => {
        setState('holding')
        navigate(path)

        const t2 = setTimeout(() => {
          setState('draining')

          const t3 = setTimeout(() => {
            setState('idle')
          }, DRAIN_DURATION)

          timeoutRefs.current.push(t3)
        }, HOLD_DURATION)

        timeoutRefs.current.push(t2)
      }, FLOOD_DURATION)

      timeoutRefs.current.push(t1)
    },
    [state, navigate, pathname],
  )

  return { transitionTo, state }
}
