import landscapeBackground from '../assets/landscape/landscape-background.svg'
import landscapeForeground from '../assets/landscape/landscape-foreground.svg'
import landscapeMidground from '../assets/landscape/landscape-midground.svg'
import { useFixedInSection } from '../hooks/useFixedInSection'
import { useHorizontalParallax } from '../hooks/useHorizontalParallax'

export const ParallaxLandscape = () => {
  const isVisible = useFixedInSection('about')
  const backgroundOffset = useHorizontalParallax({
    speed: 0.03,
    maxOffset: 1671,
  })
  const midgroundOffset = useHorizontalParallax({
    speed: 0.08,
    maxOffset: 1671,
  })
  const foregroundOffset = useHorizontalParallax({
    speed: 0.18,
    maxOffset: 1671,
  })

  const layerStyle = (
    url: string,
    offset: number,
    backgroundSize: string,
  ): React.CSSProperties => ({
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'bottom',
    backgroundSize: `auto calc(${backgroundSize} + 3px)`,
    transform: `translateX(-${offset}px)`,
    width: `calc(100% + ${1671}px)`,
    left: 0,
  })

  return (
    <div
      className="pointer-events-none fixed inset-0 h-full overflow-hidden transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={layerStyle(landscapeBackground, backgroundOffset, '18%')}
      />
      <div
        className="absolute inset-0"
        style={layerStyle(landscapeMidground, midgroundOffset, '17.5%')}
      />
      <div
        className="absolute inset-0"
        style={layerStyle(landscapeForeground, foregroundOffset, '22%')}
      />
    </div>
  )
}
