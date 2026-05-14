import { useEffect, useState } from 'react'

interface UseHorizontalParallaxOptions {
  speed?: number
  maxOffset?: number
}

export const useHorizontalParallax = ({
  speed = 0.3,
  maxOffset,
}: UseHorizontalParallaxOptions = {}) => {
  const [offsetX, setOffsetX] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const raw = window.scrollY * speed
      setOffsetX(maxOffset ? raw % maxOffset : raw)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, maxOffset])

  return offsetX
}
