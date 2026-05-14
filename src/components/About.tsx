import { SectionLayout } from '../layouts/SectionLayout'
import { AboutBeavers } from './AboutBeavers'
import { AboutMe } from './AboutMe'
import { BeaverMark } from './brand/BeaverMark'
import { ScrollJackTypewriter } from './ScrollJackTypewriter'

const CLOSING_COPY: React.ReactNode[] = [
  "The beaverhausen doesn't build itself.",
]
// ─── Component ────────────────────────────────────────────────────────────────

export function About() {
  return (
    <SectionLayout id="about" className="w-full" aria-label="About">
      <AboutBeavers />

      <AboutMe />

      <div className="relative">
        <div className="sticky top-[calc(45vh-8rem)] flex justify-center">
          <BeaverMark
            className="size-24 lg:size-36"
            bgColor="#3c3127"
            bColor="#fff5e3"
          />
        </div>

        <ScrollJackTypewriter
          lines={CLOSING_COPY}
          className="relative font-display text-base text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.8] tracking-[0.01em] text-iron-orange italic antialiased"
          showProgress={false}
          persistLast
        />
      </div>
    </SectionLayout>
  )
}
