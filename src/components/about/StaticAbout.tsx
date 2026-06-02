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

import { FadeIn } from '../FadeIn'

export function StaticAbout() {
  const { transitionTo } = useTransition()

  return (
    <FadeIn delay={1000} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <AutoH>
          <BaseT1 className="text-beaver-dark">About</BaseT1>
        </AutoH>

        <DownloadResumeButton variant="ghost" />
      </div>

      <section aria-label="About beavers">
        {BEAVER_PARAGRAPHS.map((p, i) => (
          <div key={i} className="mb-6 last:mb-0">
            {i === 2 ? (
              <p>
                <BaseT3
                  variant="display"
                  className="leading-[1.8] text-beaver-dark italic"
                >
                  {p}
                </BaseT3>
              </p>
            ) : (
              <p>
                <BaseT4 variant="display" className="leading-[1.9] text-beaver">
                  {p}
                </BaseT4>
              </p>
            )}
          </div>
        ))}
      </section>

      <section aria-label="About me">
        {PROFESSIONAL_PARAGRAPHS.map((p, i) => (
          <div key={i} className="mb-6 last:mb-0">
            <p>
              <BaseT4 className="leading-[1.9] text-beaver">{p}</BaseT4>
            </p>
          </div>
        ))}
      </section>

      <div className="flex flex-col items-start gap-6">
        <p>
          <BaseT3
            variant="display"
            className="leading-[1.8] text-beaver-dark italic"
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
    </FadeIn>
  )
}
