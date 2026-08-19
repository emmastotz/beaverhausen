import '@/components/contact/contact.css'

import landscape from '@/assets/about/half-all.svg'
import dawnCloudsBg from '@/assets/about/half-dawn-cloud-bg.svg'
import duskCloudsBg from '@/assets/about/half-dusk-clouds-bg.svg'
import beaverGlide from '@/assets/contact/beaver-swimming-above-glide.svg'
import beaverPull from '@/assets/contact/beaver-swimming-above-pull.svg'
import { ContactForm } from '@/components/contact/ContactForm'
import { Header } from '@/components/Header'
import { AutoH } from '@/components/primitives/AutoH'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { BaseCard } from '@/components/primitives/BaseCard'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function ContactPage() {
  return (
    <DefaultLayout>
      <Header />

      <div className="relative grid min-h-svh">
        {/* Landscape background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-x-clip"
          aria-hidden="true"
        >
          <div className="fixed bottom-0 left-1/2 size-[25vh] -translate-x-1/2 rounded-full bg-dawn blur-sm dark:bg-iron-orange" />

          <div
            className="contact-clouds absolute inset-0 h-full w-[200%] bg-bottom bg-repeat-x dark:hidden"
            style={{
              backgroundImage: `url(${dawnCloudsBg})`,
              backgroundSize: 'auto calc(50%)',
              backgroundPosition: '0 70%',
            }}
          />
          <div
            className="contact-clouds absolute inset-0 hidden h-full w-[200%] bg-bottom bg-repeat-x dark:flex"
            style={{
              backgroundImage: `url(${duskCloudsBg})`,
              backgroundSize: 'auto calc(50%)',
              backgroundPosition: '0 70%',
            }}
          />
          <div
            className="absolute inset-0 h-full border-b border-water-dark bg-bottom bg-repeat-x"
            style={{
              backgroundImage: `url(${landscape})`,
              backgroundSize: 'auto calc(80% + 0.5px)',
            }}
          />

          {/* Water ripples */}
          <div className="water-ripple pointer-events-none absolute bottom-0 left-0 h-[18%] w-full" />

          {/* Swimming beaver */}
          <div className="beaver-swim-contact absolute bottom-[3%] left-0">
            <div className="relative h-[8vh]">
              <img
                src={beaverGlide}
                className="beaver-frame-glide h-full w-auto"
                alt=""
              />
              <img
                src={beaverPull}
                className="beaver-frame-pull absolute inset-0 h-full w-auto"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Form content */}
        <main className="relative flex items-center justify-center px-6 py-24">
          <BaseCard className="w-full max-w-xl">
            <AutoHProvider>
              <div className="flex flex-col gap-10 px-8 py-10">
                <div className="flex flex-col gap-3">
                  <AutoH>
                    <BaseT1 className="text-beaver-dark dark:text-enamel">
                      Leave a note
                    </BaseT1>
                  </AutoH>
                  <p className="text-pretty">
                    <BaseT4
                      variant="display"
                      className="flex max-w-md text-beaver dark:text-cream"
                    >
                      If you've made it this far, you probably have something
                      worth saying.
                    </BaseT4>
                  </p>
                </div>

                <ContactForm />
              </div>
            </AutoHProvider>
          </BaseCard>
        </main>
      </div>
    </DefaultLayout>
  )
}
