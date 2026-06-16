import '@/components/about/static-about.css'

import beaverSwimmingGlide from '@/assets/about/beaver-swimming-glide.svg'
// import beaverSwimmingPull from '@/assets/about/beaver-swimming-pull.svg'
import underwaterRiverbed from '@/assets/about/underwater-riverbed.svg'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { Button } from '@/components/primitives/Button'
import {
  BEAVER_PARAGRAPHS,
  CLOSING,
  PROFESSIONAL_PARAGRAPHS,
} from '@/content/about'
import { useTransition } from '@/context/TransitionContext'

export function StaticAbout() {
  const { transitionTo } = useTransition()

  return (
    <div className="relative mb-32 h-full w-full overflow-clip bg-gradient-to-b from-water from-5% via-water-dark via-50% to-dusk to-150% px-8 pb-14 lg:px-0 lg:pb-0 dark:from-0% dark:via-10% dark:to-80%">
      <div
        className="pointer-events-none absolute inset-0 h-full bg-scroll bg-bottom-left bg-repeat-x"
        style={{
          backgroundImage: `url(${underwaterRiverbed})`,
          backgroundSize: 'auto calc(13% + 0.5px)',
        }}
      />

      <div
        className="beaver-swim-in-right pointer-events-none absolute inset-0 hidden size-full bg-scroll bg-top-right bg-no-repeat md:flex"
        style={{
          backgroundImage: `url(${beaverSwimmingGlide})`,
          backgroundSize: 'auto calc(15%)',
        }}
      />

      <div
        className="beaver-swim-in-left pointer-events-none absolute inset-0 hidden size-full bg-scroll bg-top-left bg-no-repeat md:flex"
        style={{
          backgroundImage: `url(${beaverSwimmingGlide})`,
          backgroundSize: 'auto calc(15%)',
        }}
      />

      <div className="relative mx-auto flex max-w-prose flex-col gap-10 rounded-md md:px-4 md:backdrop-blur">
        <div className="header-fade-in z-raised flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <AutoH className="about-fade-in">
            <BaseT1 className="text-beaver-dark">About</BaseT1>
          </AutoH>

          <div className="button-fade-in">
            <DownloadResumeButton variant="ghost" />
          </div>
        </div>

        <section aria-label="About beavers" className="flex flex-col gap-6">
          {BEAVER_PARAGRAPHS.map((p, i) => (
            <div key={i}>
              {i === 2 ? (
                <p>
                  <BaseT3
                    variant="display"
                    className="leading-[1.8] text-beaver-dark italic dark:text-iron-orange"
                  >
                    {p}
                  </BaseT3>
                </p>
              ) : (
                <p>
                  <BaseT4
                    variant="display"
                    className="leading-[1.9] text-cream"
                  >
                    {p}
                  </BaseT4>
                </p>
              )}
            </div>
          ))}
        </section>

        <section aria-label="About me" className="flex flex-col gap-6">
          {PROFESSIONAL_PARAGRAPHS.map((p, i) => (
            <div key={i}>
              <p>
                <BaseT4 className="leading-[1.9] text-cream">{p}</BaseT4>
              </p>
            </div>
          ))}
        </section>

        <div className="z-raised flex flex-col items-start gap-6">
          <p>
            <BaseT3
              variant="display"
              className="leading-[1.8] text-beaver-dark italic dark:text-iron-orange"
            >
              {CLOSING}
            </BaseT3>
          </p>

          <Button
            variant="ghost"
            onClick={() => transitionTo('/portfolio/beaverhausen')}
          >
            View my work
          </Button>
        </div>
      </div>
    </div>
  )
}
