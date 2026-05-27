import { BeaverhausenCaseStudy } from '@/components/portfolio/beaverhausen/BeaverhausenCaseStudy'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function BeaverhausenPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="relative overflow-x-hidden">
        <BeaverhausenCaseStudy />
      </main>
    </DefaultLayout>
  )
}
