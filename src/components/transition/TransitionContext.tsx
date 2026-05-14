import type { ReactNode } from 'react'

import {
  usePageTransition,
  type TransitionState,
} from '../../hooks/usePageTransition'
import { createDependency } from '../../util/dependency'

interface TransitionContextValue {
  transitionTo: (path: string) => void
  state: TransitionState
}

const { Context: TransitionContext, useDependency: useTransition } =
  createDependency<TransitionContextValue>('TransitionContext')

export { TransitionContext, useTransition }

export function TransitionProvider({ children }: { children: ReactNode }) {
  const { transitionTo, state } = usePageTransition()

  return (
    <TransitionContext.Provider value={{ transitionTo, state }}>
      {children}
    </TransitionContext.Provider>
  )
}
