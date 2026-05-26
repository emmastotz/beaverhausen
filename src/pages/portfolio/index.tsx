import { PortfolioParallax } from '@/components/portfolio/PortfolioParallax'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function PortfolioPage() {
  return (
    <>
      <DefaultLayout>
        <main className="relative">
          <div className="absolute inset-0 top-60">
            <div className="flex flex-col gap-8 text-center">
              <div>
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
                <BaseT3 className="text-beaver">
                  Click on a site for a more in-depth exploration. Hover for the
                  details.
                </BaseT3>
              </p>
            </div>
          </div>
        </main>

        <PortfolioParallax />
      </DefaultLayout>
    </>
  )
}
