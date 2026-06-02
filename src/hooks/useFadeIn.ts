import { useRef } from 'react'
import { gsap, useGSAP } from '@/deps/gsap'

interface FadeInOptions {
  once?: boolean
  delay?: number
}

export function useFadeIn({
  once = true,
  delay = 0,
}: FadeInOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    gsap.from(ref.current, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      delay: delay / 1000,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        once,
      },
    })
  }, [once, delay])

  return { ref }
}
