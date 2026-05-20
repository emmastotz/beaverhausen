import { PortfolioParallax } from '../../components/portfolio/PortfolioParallax'
import { DefaultLayout } from '../../layouts/DefaultLayout'

export default function PortfolioPage() {
  return (
    <>
      <DefaultLayout>
        <main className="relative">
          <PortfolioParallax />
        </main>
      </DefaultLayout>
    </>
  )
}
