import '@/components/about/static-about.css'

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
    <div className="relative h-full w-full bg-gradient-to-b from-water from-5% via-water-dark via-50% to-dusk to-150% px-8 pb-14 lg:px-0 lg:pb-0 dark:from-0% dark:via-10% dark:to-80%">
      <div className="mx-auto flex max-w-prose flex-col">
        <div className="header-fade-in mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <AutoH className="about-fade-in">
            <BaseT1 className="text-beaver-dark">About</BaseT1>
          </AutoH>

          <div className="button-fade-in">
            <DownloadResumeButton variant="ghost" />
          </div>
        </div>

        <section aria-label="About beavers">
          {BEAVER_PARAGRAPHS.map((p, i) => (
            <div key={i} className="mb-6 last:mb-10">
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

        <section aria-label="About me">
          {PROFESSIONAL_PARAGRAPHS.map((p, i) => (
            <div key={i} className="mb-6 last:mb-10">
              <p>
                <BaseT4 className="leading-[1.9] text-cream">{p}</BaseT4>
              </p>
            </div>
          ))}
        </section>

        <div className="flex flex-col items-start">
          <p className="mb-6">
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
