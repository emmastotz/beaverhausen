import { useEffect } from 'react'

import landscapeBackground from '@/assets/landscape/landscape-background.svg'
import landscapeForeground from '@/assets/landscape/landscape-foreground.svg'
import landscapeMidground from '@/assets/landscape/landscape-midground.svg'
import { useFixedInSection } from '@/hooks/useFixedInSection'

const LAYERS = [
  { src: landscapeBackground, speed: 0.03, size: '18%' },
  { src: landscapeMidground, speed: 0.08, size: '17.5%' },
  { src: landscapeForeground, speed: 0.18, size: '22%' },
] as const

export const ParallaxLandscape = () => {
  const isVisible = useFixedInSection('about')

  useEffect(() => {
    const onScroll = () =>
      document.documentElement.style.setProperty(
        '--landing-scroll-y',
        `${window.scrollY}px`,
      )
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed inset-0 h-full overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      {LAYERS.map(({ src, speed, size }) => (
        <div
          key={src}
          className="absolute inset-0 bg-bottom bg-repeat-x"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `auto calc(${size} + 3px)`,
            backgroundPositionX: `calc(var(--landing-scroll-y, 0px) * -${speed})`,
          }}
        />
      ))}
    </div>
  )
}
