import { BeaverhausenCaseStudy } from '../../../components/portfolio/beaverhausen/BeaverhausenCaseStudy'
import { DefaultLayout } from '../../../layouts/DefaultLayout'

export default function BeaverhausenPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="relative">
        <BeaverhausenCaseStudy />
      </main>
    </DefaultLayout>
  )
}
