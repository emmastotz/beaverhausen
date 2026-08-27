import { AppLink } from '@/components/primitives/AppLink'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkPlatformPage() {
  return (
    <CaseStudyLayout>
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-32">
        <AutoH>
          <BaseT1 className="text-beaver-dark antialiased dark:text-cream">
            Platform
          </BaseT1>
        </AutoH>
        <p className="mt-4 text-beaver dark:text-cream/70">Coming soon.</p>
        <AppLink to="/portfolio/whitehawk" className="mt-8 inline-block">
          Back to WhiteHawk
        </AppLink>
      </main>
    </CaseStudyLayout>
  )
}
