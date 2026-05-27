import { useEffect, useState } from 'react'

import { PortfolioParallax } from '@/components/portfolio/PortfolioParallax'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT3 } from '@/components/primitives/BaseT3'
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
    <>
      <DefaultLayout>
        <main className="relative mx-4 md:mx-12 lg:mx-0">
          <div
            className={`absolute inset-0 top-30 transition-opacity duration-300 lg:top-50 ${heroVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className="flex flex-col gap-4 text-center sm:gap-8">
              <div className="mx-auto max-w-md lg:max-w-none">
                <BaseT6 className="text-iron-orange uppercase">
                  Selected works
                </BaseT6>
                <AutoH>
                  <BaseT1 className="text-beaver-dark">
                    Something is always being built
                  </BaseT1>
                </AutoH>
              </div>

              <p className="mx-auto max-w-lg">
                <BaseT3 className="hidden text-beaver lg:block">
                  Click on a site for a more in-depth exploration.
                </BaseT3>
                <BaseT3 className="text-beaver lg:hidden">
                  Tap on a site for a more in-depth exploration.
                </BaseT3>
              </p>
            </div>
          </div>
        </main>

        <div onFocus={() => setHeroVisible(false)}>
          <PortfolioParallax />
        </div>
      </DefaultLayout>
    </>
  )
}
