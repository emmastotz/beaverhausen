import type { ReactNode } from 'react'

import { TransitionContext } from '@/context/TransitionContext'
import { usePageTransition } from '@/hooks/usePageTransition'

export function TransitionProvider({ children }: { children: ReactNode }) {
  const { transitionTo, state } = usePageTransition()

  return (
    <TransitionContext.Provider value={{ transitionTo, state }}>
      {children}
    </TransitionContext.Provider>
  )
}
