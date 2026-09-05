import { ProductChapter } from '@/components/portfolio/products/ProductChapter'
import { COMPLIANCE_FRAMEWORKS } from '@/content/product-compliance-frameworks'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkComplianceFrameworksPage() {
  return (
    <CaseStudyLayout>
      <ProductChapter chapter={COMPLIANCE_FRAMEWORKS} />
    </CaseStudyLayout>
  )
}
