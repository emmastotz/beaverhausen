import '@/components/landing/parallax-landscape.css'

import { useEffect } from 'react'

import landscapeBackground from '@/assets/landscape/landscape-background.svg'
import landscapeForeground from '@/assets/landscape/landscape-foreground.svg'
import landscapeMidground from '@/assets/landscape/landscape-midground.svg'

const LAYERS = [
  {
    src: landscapeBackground,
    className: 'animate-parallax-landscape-background',
  },
  {
    src: landscapeMidground,
    className: 'animate-parallax-landscape-midground',
  },
  {
    src: landscapeForeground,
    className: 'animate-parallax-landscape-foreground',
  },
] as const

export const ParallaxLandscape = () => {
  useEffect(() => {
    const update = () => {
      document.documentElement.style.setProperty(
        '--page-scroll-max',
        `${document.documentElement.scrollHeight - window.innerHeight}px`,
      )
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 h-full overflow-clip"
      aria-hidden="true"
    >
      {LAYERS.map(({ src, className }) => (
        <div
          key={src}
          className={`${className} absolute inset-0 bg-bottom bg-repeat-x`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  )
}
