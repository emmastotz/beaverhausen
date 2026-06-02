import { About } from '@/components/landing/About'
import { Hero } from '@/components/landing/Hero'
import { ParallaxLandscape } from '@/components/landing/ParallaxLandscape'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function LandingPage() {
  return (
    <>
      <DefaultLayout>
        <main className="relative">
          <Hero />
          <About />
        </main>

        <ParallaxLandscape />
      </DefaultLayout>
    </>
  )
}
