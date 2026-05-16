import { useEffect, useRef, useState } from 'react'

interface FadeInOptions {
  threshold?: number
  once?: boolean
}

export function useFadeIn({
  threshold = 0.2,
  once = true,
}: FadeInOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, isVisible }
}
