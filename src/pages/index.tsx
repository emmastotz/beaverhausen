import { LandingParallax } from '@/components/landing/LandingParallax'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function LandingPage() {
  return (
    <>
      <DefaultLayout>
        <main className="mx-4 pt-16 sm:mx-6 md:mx-0">
          <LandingParallax />
        </main>
      </DefaultLayout>
    </>
  )
}
