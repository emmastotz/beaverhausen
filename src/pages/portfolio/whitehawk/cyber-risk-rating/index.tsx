import { ProductChapter } from '@/components/portfolio/products/ProductChapter'
import { CYBER_RISK_RATING } from '@/content/product-cyber-risk-rating'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkCyberRiskRatingPage() {
  return (
    <CaseStudyLayout>
      <ProductChapter chapter={CYBER_RISK_RATING} />
    </CaseStudyLayout>
  )
}
