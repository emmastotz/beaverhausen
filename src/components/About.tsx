import { SectionLayout } from '../layouts/SectionLayout'
import { AboutBeavers } from './AboutBeavers'
import { AboutMe } from './AboutMe'
import { BeaverMark } from './brand/BeaverMark'
import { Button } from './primitives/Button'
import { ScrollJackTypewriter } from './ScrollJackTypewriter'
import { useTransition } from './transition/TransitionContext'

const CLOSING_COPY: React.ReactNode[] = [
  "The beaverhausen doesn't build itself.",
]
// ─── Component ────────────────────────────────────────────────────────────────

export function About() {
  const { transitionTo } = useTransition()
  return (
    <SectionLayout id="about" className="w-full" aria-label="About">
      <AboutBeavers />

      <AboutMe />

      <div className="relative">
        <div className="sticky top-[calc(35vh-8rem)] flex justify-center sm:top-[calc(40vh-8rem)] md:top-[calc(35vh)] lg:top-[calc(40vh-8rem)]">
          <BeaverMark
            className="size-24 lg:size-36"
            bgColor="#3c3127"
            bColor="#fff5e3"
          />
        </div>

        <ScrollJackTypewriter
          lines={CLOSING_COPY}
          className="relative font-display text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.8] tracking-[0.01em] text-iron-orange italic antialiased"
          showProgress={false}
          persistLast
        />

        <div className="absolute bottom-1/5 left-1/2 -translate-x-1/2">
          <Button onClick={() => transitionTo('/portfolio')}>
            Enter the lodge
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}
