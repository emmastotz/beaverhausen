import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export const useScrollReveal = <T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: ScrollRevealOptions = {}) => {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
