import beaverBackground from '@/assets/landing/beaver-copy-background.svg'
import dawnCloudsBg from '@/assets/landscape/dawn-clouds-bg.svg'
import duskCloudsBg from '@/assets/landscape/dusk-clouds-bg.svg'
import {
  ScrollRevealText,
  composeScrollSections,
  type ScrollSection,
} from '@/components/landing/ScrollRevealText'
import { BEAVER_LINES } from '@/content/about'

const BEAVER_SECTION: ScrollSection = {
  lines: BEAVER_LINES,
  variant: 'display',
  className: 'leading-[1.8] text-beaver-dark',
  renderText(i) {
    if (i !== 5) return BEAVER_LINES[i]
    const text = BEAVER_LINES[5]
    const word = 'orange'
    const idx = text.indexOf(word)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-iron-orange">
          {text.slice(idx, idx + word.length)}
        </span>
        {text.slice(idx + word.length)}
      </>
    )
  },
}

const {
  lines: ABOUT_BEAVERS,
  renderText: renderBeaverCopy,
  getLineProps: getBeaverLineProps,
} = composeScrollSections([BEAVER_SECTION])

export function BeaverCopy() {
  return (
    <div className="relative size-full">
      <div className="relative">
        <ScrollRevealText
          lines={ABOUT_BEAVERS}
          renderText={renderBeaverCopy}
          getLineProps={getBeaverLineProps}
          className="leading-[1.75]"
        />
      </div>
      <div
        className="pointer-events-none relative h-svh overflow-x-clip [grid-area:1/1]"
        aria-hidden="true"
      >
        <div
          className="parallax-landscape-clouds absolute inset-0 h-full w-[200%] bg-scroll bg-repeat-x lg:bg-bottom dark:hidden"
          style={{
            backgroundImage: `url(${dawnCloudsBg})`,
            backgroundSize: 'auto calc(50%)',
            backgroundPosition: 'center 70%',
          }}
        />
        <div
          className="parallax-landscape-clouds absolute inset-0 hidden h-full w-[200%] bg-scroll bg-repeat-x lg:bg-bottom dark:flex"
          style={{
            backgroundImage: `url(${duskCloudsBg})`,
            backgroundSize: 'auto calc(50%)',
            backgroundPosition: 'center 70%',
          }}
        />
        <div
          className="absolute inset-0 h-full border-b border-water-dark bg-scroll bg-bottom bg-repeat-x"
          style={{
            backgroundImage: `url(${beaverBackground})`,
            backgroundSize: 'auto calc(80% + 0.5px)',
          }}
        />
      </div>
      <div className="h-[700svh]">{/* Scrolling assets? */}</div>
    </div>
  )
}
