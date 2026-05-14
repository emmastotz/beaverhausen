import { useEffect, useState } from 'react'

export const useFixedInSection = (sectionId: string) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionId])

  return isVisible
}
