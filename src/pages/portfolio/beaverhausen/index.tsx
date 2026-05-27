import { BeaverhausenCaseStudy } from '@/components/portfolio/beaverhausen/BeaverhausenCaseStudy'
import { CaseStudyNav } from '@/components/portfolio/CaseStudyNav'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function BeaverhausenPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="mx-auto min-h-screen max-w-7xl">
        <BeaverhausenCaseStudy />
        <CaseStudyNav currentHref="/portfolio/beaverhausen" />
      </main>
    </DefaultLayout>
  )
}
