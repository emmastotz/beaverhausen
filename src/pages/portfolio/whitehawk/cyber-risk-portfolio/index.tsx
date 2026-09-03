import { ProductChapter } from '@/components/portfolio/products/ProductChapter'
import { CYBER_RISK_PORTFOLIO } from '@/content/product-cyber-risk-portfolio'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkCyberRiskPortfolioPage() {
  return (
    <CaseStudyLayout>
      <ProductChapter chapter={CYBER_RISK_PORTFOLIO} />
    </CaseStudyLayout>
  )
}
