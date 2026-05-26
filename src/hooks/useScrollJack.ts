import { useEffect, useRef, useState } from 'react'

import { gsap, ScrollTrigger } from '@/deps/gsap'

type ScrollJackOptions = {
  totalLines: number
  windowsPerLine?: number
  extraWindows?: number
}

export const useScrollJack = ({
  totalLines,
  windowsPerLine = 1,
  extraWindows = 0,
}: ScrollJackOptions) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const pinned = pinnedRef.current
    if (!container || !pinned) return

    const totalWindows = totalLines * windowsPerLine + extraWindows

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${(totalWindows - 1) * window.innerHeight}`,
        pin: pinned,
        pinSpacing: true,
        snap: {
          snapTo: 1 / (totalWindows - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.15,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * totalLines),
            totalLines - 1,
          )
          setActiveIndex(index)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [totalLines, windowsPerLine, extraWindows])

  return { containerRef, pinnedRef, activeIndex }
}
