import { AutoH } from '@/components/primitives/AutoH'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { TransitionLink } from '@/components/primitives/TransitionLink'
import { PRODUCTS } from '@/content/products'

export function WhiteHawkProducts() {
  return (
    <section id="whitehawk-products" className="mx-auto max-w-7xl px-4 py-12">
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <TransitionLink
              to={`/portfolio/whitehawk/${product.id}`}
              className="flex flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iron-orange"
            >
              <div className="aspect-square w-full">
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                )}
              </div>
              <div className="px-3">
                <AutoHProvider>
                  <AutoH>
                    <BaseT4
                      variant="body"
                      className="text-beaver-dark antialiased dark:text-cream"
                    >
                      {product.name}
                    </BaseT4>
                  </AutoH>
                </AutoHProvider>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
