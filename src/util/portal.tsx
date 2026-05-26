import { useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { createDependency } from '@/util/dependency'

interface PortalContextValue {
  setTarget: (el: HTMLElement | null) => void
  target: HTMLElement | null
}

export function createPortalPair() {
  const { Context, useDependency: usePortal } =
    createDependency<PortalContextValue>('Portal')

  function PortalProvider({ children }: { children: ReactNode }) {
    const [target, setTarget] = useState<HTMLElement | null>(null)
    return (
      <Context.Provider value={{ target, setTarget }}>
        {children}
      </Context.Provider>
    )
  }

  function Source({ children }: { children: ReactNode }) {
    const { target } = usePortal()
    if (!target) return null
    return createPortal(children, target)
  }

  function Target({ className }: { className?: string }) {
    const { setTarget } = usePortal()
    return <div ref={setTarget} className={className} />
  }

  return { PortalProvider, Source, Target }
}

// Example usage:

// const { PortalProvider, Source, Target } = createPortalPair()

// <PortalProvider>
//   <Target className="fixed top-0 right-0" /> {/* where content appears */}
//   <main>
//     <Source>
//       <Notification>Hello from inside main</Notification>
//     </Source>
//   </main>
// </PortalProvider>
