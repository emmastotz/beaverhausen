import { WhiteHawkCaseStudy } from '../../../components/portfolio/whitehawk/WhiteHawkCaseStudy'
import { DefaultLayout } from '../../../layouts/DefaultLayout'

export default function WhiteHawkPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="relative">
        <WhiteHawkCaseStudy />
      </main>
    </DefaultLayout>
  )
}
