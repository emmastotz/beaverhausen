import { BeaverhausenCaseStudy } from '@/components/portfolio/case-studies/beaverhausen/BeaverhausenCaseStudy'
import { CaseStudyNav } from '@/components/portfolio/case-studies/CaseStudyNav'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function BeaverhausenPortfolioPage() {
  return (
    <CaseStudyLayout>
      <main className="mx-auto min-h-screen max-w-7xl">
        <BeaverhausenCaseStudy />
        <CaseStudyNav currentHref="/portfolio/beaverhausen" />
      </main>
    </CaseStudyLayout>
  )
}
