import '@/components/landing/parallax-landscape.css'

import { useEffect, useState } from 'react'

import { About } from '@/components/landing/About'
import { Hero } from '@/components/landing/Hero'
import { ParallaxLandscape } from '@/components/landing/ParallaxLandscape'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function LandingPage() {
  const [isScrollComplete, setisScrollComplete] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight
      setisScrollComplete(window.scrollY === scrollMax)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <DefaultLayout>
        <main className="relative mx-4 flex min-h-svh flex-col pt-16 sm:mx-6 md:mx-0">
          <Hero />
          <div className="pointer-events-none min-h-[35svh]" />
          <About />
        </main>

        <div
          className={`sun-fade pointer-events-none fixed -bottom-15 left-1/2 size-[25svh] rounded-full bg-dawn blur-xs brightness-120 transition-opacity ease-in will-change-[opacity] md:size-[20svh] dark:bg-iron-orange dark:blur-sm dark:brightness-150 ${isScrollComplete ? 'opacity-0' : 'opacity-100'}`}
        />
        <ParallaxLandscape />
      </DefaultLayout>
    </>
  )
}
