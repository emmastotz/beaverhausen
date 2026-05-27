import { StaticAbout } from '@/components/StaticAbout'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function AboutPage() {
  return (
    <DefaultLayout>
      <main className="relative mx-auto max-w-2xl px-8 pt-32 pb-14 sm:pt-24 lg:px-0">
        <StaticAbout />
      </main>
    </DefaultLayout>
  )
}
