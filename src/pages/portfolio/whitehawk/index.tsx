import { CaseStudyNav } from '@/components/portfolio/case-studies/CaseStudyNav'
import { WhiteHawkCaseStudy } from '@/components/portfolio/case-studies/whitehawk/WhiteHawkCaseStudy'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkPortfolioPage() {
  return (
    <CaseStudyLayout>
      <main className="mx-auto min-h-screen max-w-7xl">
        <WhiteHawkCaseStudy />
        <CaseStudyNav currentHref="/portfolio/whitehawk" />
      </main>
    </CaseStudyLayout>
  )
}
