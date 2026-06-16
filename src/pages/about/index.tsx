import '@/components/about/static-about.css'

import { useEffect, useState } from 'react'

import landscape from '@/assets/about/half-all.svg'
import dawnCloudsBg from '@/assets/about/half-dawn-cloud-bg.svg'
import duskCloudsBg from '@/assets/about/half-dusk-clouds-bg.svg'
import { StaticAbout } from '@/components/about/StaticAbout'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function AboutPage() {
  const [isScrolled, setisScrolled] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)
      setisScrolled(scrollPercent <= 0.05)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <DefaultLayout>
      <div className="relative grid">
        <div
          className={`sticky top-1/2 -translate-y-1/2 self-start [grid-area:1/1] ${isScrolled ? 'z-raised' : 'z-0'}`}
        >
          <div className="mx-auto flex flex-col items-center justify-center gap-6">
            <div className="about-fade-out">
              <BaseT1 className="text-beaver-dark">About</BaseT1>
            </div>

            <div className="button-fade-out">
              <DownloadResumeButton variant="ghost" />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none relative h-svh overflow-x-clip [grid-area:1/1]"
          aria-hidden="true"
        >
          <div className="parallax-landscape-sun fixed -top-[25svh] left-1/2 size-[25vh] -translate-x-1/2 rounded-full bg-dawn blur-sm dark:bg-iron-orange" />

          <div
            className="parallax-landscape-clouds absolute inset-0 h-full w-[200%] bg-scroll bg-repeat-x lg:bg-bottom dark:hidden"
            style={{
              backgroundImage: `url(${dawnCloudsBg})`,
              backgroundSize: 'auto calc(50%)',
              backgroundPosition: 'center 70%',
            }}
          />
          <div
            className="parallax-landscape-clouds absolute inset-0 hidden h-full w-[200%] bg-scroll bg-repeat-x lg:bg-bottom dark:flex"
            style={{
              backgroundImage: `url(${duskCloudsBg})`,
              backgroundSize: 'auto calc(50%)',
              backgroundPosition: 'center 70%',
            }}
          />
          <div
            className="absolute inset-0 h-full border-b border-water-dark bg-scroll bg-bottom bg-repeat-x"
            style={{
              backgroundImage: `url(${landscape})`,
              backgroundSize: 'auto calc(80% + 0.5px)',
            }}
          />
        </div>

        <main className="relative h-full">
          <div className="h-[10vh] w-full bg-gradient-to-b from-water-dark to-water" />
          <StaticAbout />
        </main>
      </div>
    </DefaultLayout>
  )
}
