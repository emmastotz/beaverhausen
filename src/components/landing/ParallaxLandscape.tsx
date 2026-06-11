import '@/components/landing/parallax-landscape.css'

import { useEffect } from 'react'

import landscapeBackground from '@/assets/landscape/background.svg'
import dawnLandscapeClouds from '@/assets/landscape/dawn-clouds-bg.svg'
import duskLandscapeClouds from '@/assets/landscape/dusk-clouds-bg.svg'
import landscapeForeground from '@/assets/landscape/foreground.svg'
import landscapeMidground from '@/assets/landscape/midground.svg'

const LAYERS = [
  {
    src: landscapeBackground,
    className: 'parallax-landscape-background',
  },
  {
    src: landscapeMidground,
    className: 'parallax-landscape-midground',
  },
  {
    src: landscapeForeground,
    className: 'parallax-landscape-foreground',
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
      <div
        className="parallax-landscape-clouds absolute inset-0 bg-bottom bg-repeat-x dark:hidden"
        style={{
          backgroundImage: `url(${dawnLandscapeClouds})`,
        }}
      />
      <div
        className="parallax-landscape-clouds absolute inset-0 hidden bg-bottom bg-repeat-x dark:block"
        style={{
          backgroundImage: `url(${duskLandscapeClouds})`,
        }}
      />

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
