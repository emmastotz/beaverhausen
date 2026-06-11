import { useEffect, useState } from 'react'

import { FadeIn } from '@/components/FadeIn'
import { PortfolioParallax } from '@/components/portfolio/PortfolioParallax'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function PortfolioPage() {
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => setHeroVisible(window.scrollY < 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <DefaultLayout>
      <main>
        <div className="z-floating relative">
          <div
            className={`pointer-events-none absolute inset-0 top-[17svh] transition-opacity duration-300 sm:top-[18svh] md:top-[20svh] ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <FadeIn
              delay={500}
              className="mx-4 flex h-full flex-1 flex-col items-center justify-evenly gap-4 text-center sm:gap-0 md:mx-12 md:gap-8 lg:mx-0"
            >
              <div className="mx-auto max-w-md lg:max-w-none">
                <BaseT6 className="text-iron-orange uppercase dark:text-iron-orange">
                  Selected works
                </BaseT6>
                <AutoH>
                  <BaseT1 className="text-beaver-dark dark:text-cream">
                    Something is always being built
                  </BaseT1>
                </AutoH>
              </div>

              <p className="mx-auto max-w-lg sm:max-w-none md:max-w-md">
                <BaseT4 className="text-beaver dark:text-beaver-dark">
                  Scroll to continue the journey. Click on a site for a more
                  in-depth exploration.
                </BaseT4>
              </p>
            </FadeIn>
          </div>
        </div>

        <div onFocus={() => setHeroVisible(false)}>
          <PortfolioParallax />
        </div>
      </main>
    </DefaultLayout>
  )
}
