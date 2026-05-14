import { useEffect, useRef, useState } from 'react'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(true)
  const [progress, setProgress] = useState(0)

  // Total scroll height = one viewport per line * windowsPerLine
  const scrollHeight = `${(totalLines * windowsPerLine + extraWindows) * 100}vh`

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const { top, height } = el.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const p = Math.min(Math.max(-top / scrollable, 0), 1)
      setProgress(p)
      const index = Math.min(Math.floor(p * totalLines), totalLines - 1)
      setActiveIndex(index)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.01 },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    observer.observe(el)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [totalLines])

  return { containerRef, activeIndex, scrollHeight, isInView, progress }
}
