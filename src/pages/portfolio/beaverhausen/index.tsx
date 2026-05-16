import { TypographySystem } from '../../../components/TypographySystem'
import { DefaultLayout } from '../../../layouts/DefaultLayout'

export default function BeaverhausenPortfolioPage() {
  return (
    <DefaultLayout>
      <main className="relative mx-auto max-w-2xl px-8 py-40 lg:px-0">
        <TypographySystem />
      </main>
    </DefaultLayout>
  )
}
