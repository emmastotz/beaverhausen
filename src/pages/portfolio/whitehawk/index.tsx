import { CaseStudyNav } from '@/components/portfolio/CaseStudyNav'
import { WhiteHawkCaseStudy } from '@/components/portfolio/whitehawk/WhiteHawkCaseStudy'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function WhiteHawkPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="mx-auto min-h-screen max-w-7xl">
        <WhiteHawkCaseStudy />
        <CaseStudyNav currentHref="/portfolio/whitehawk" />
      </main>
    </DefaultLayout>
  )
}
