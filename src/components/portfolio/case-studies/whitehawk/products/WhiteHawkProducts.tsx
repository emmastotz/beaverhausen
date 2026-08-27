import { AutoH } from '@/components/primitives/AutoH'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { BaseCard } from '@/components/primitives/BaseCard'
import { BodyT3 } from '@/components/primitives/BodyT3'
import { TransitionLink } from '@/components/primitives/TransitionLink'
import { PRODUCTS } from '@/content/case-study-whitehawk'

export function WhiteHawkProducts() {
  return (
    <section id="whitehawk-products" className="mx-auto max-w-7xl px-4 py-12">
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <TransitionLink
              to={`/portfolio/whitehawk/${product.id}`}
              className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iron-orange"
            >
              <BaseCard className="overflow-hidden transition-opacity hover:opacity-80">
                <div className="aspect-video w-full bg-beaver/10 dark:bg-cream/5">
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <AutoHProvider>
                    <AutoH>
                      <BodyT3 className="text-beaver-dark antialiased dark:text-cream">
                        {product.name}
                      </BodyT3>
                    </AutoH>
                  </AutoHProvider>
                </div>
              </BaseCard>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
