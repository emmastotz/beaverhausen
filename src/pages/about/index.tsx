import { StaticAbout } from '../../components/StaticAbout'
import { DefaultLayout } from '../../layouts/DefaultLayout'

export default function AboutPage() {
  return (
    <DefaultLayout>
      <main className="relative mx-auto max-w-2xl px-8 py-40 lg:px-0">
        <StaticAbout />
      </main>
    </DefaultLayout>
  )
}
