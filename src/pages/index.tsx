import { About } from '../components/About'
import { Hero } from '../components/Hero'
import { ParallaxLandscape } from '../components/ParallaxLandscape'
import { DefaultLayout } from '../layouts/DefaultLayout'

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
