import beaverGnawing from '@/assets/portfolio/case-studies/beaverhausen/beaver-gnawing.svg'
import damLandmarkAll from '@/assets/portfolio/case-studies/beaverhausen/dam-landmark-all.svg'
import lodgeBlueprint from '@/assets/portfolio/case-studies/beaverhausen/lodge-blueprint.svg'
import logoV1 from '@/assets/portfolio/case-studies/beaverhausen/logo-v1.svg'
import logoV2 from '@/assets/portfolio/case-studies/beaverhausen/logo-v2.svg'
import { BeaverMark } from '@/components/brand/BeaverMark'
import { Wordmark } from '@/components/brand/Wordmark'
import { Flipbook } from '@/components/gsap/Flipbook'
import { TypeSpecimen } from '@/components/portfolio/case-studies/beaverhausen/TypeSpecimen'
import { ColorPalette } from '@/components/portfolio/case-studies/ColorPalette'
import { FieldNote } from '@/components/portfolio/case-studies/FieldNote'
import { Paragraph } from '@/components/portfolio/case-studies/Paragraph'
import { ExternalLink } from '@/components/primitives/ExternalLink'
import { CHAPTERS, CHAPTER_COPY } from '@/content/case-study-beaverhausen'

function Content({ id }: { id: string }) {
  const copy = CHAPTER_COPY[id]
  if (!copy) return null
  const { paragraphs: ps, fieldNotes: fn } = copy

  switch (id) {
    case 'habitat':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[3]} />
          <Paragraph text={ps[4]} />
        </div>
      )

    case 'sketches':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <div className="mt-2 mb-8 grid gap-4 sm:grid-cols-2">
            <div className="flex aspect-square items-center justify-center rounded-md border border-beaver/20 bg-beaver-dark p-4 shadow-sm">
              <img
                src={logoV1}
                alt="early version logo"
                className="pointer-events-none size-full"
              />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-beaver-dark p-4 shadow-sm">
              <img
                src={logoV2}
                alt="mid version logo"
                className="pointer-events-none size-full"
              />
            </div>
          </div>
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <div className="flex items-center justify-center">
            <BeaverMark className="max-w-3xs" />
          </div>
          <Paragraph text={ps[3]} />
          <Paragraph text={ps[4]} />
        </div>
      )

    case 'taxonomy':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <div className="mt-2 mb-8 lg:mx-auto lg:max-w-2xl">
            <ColorPalette
              palette={[
                { name: 'Beaver', bg: 'bg-beaver' },
                { name: 'Beaver Dark', bg: 'bg-beaver-dark' },
                { name: 'Iron Orange', bg: 'bg-iron-orange' },
                { name: 'Cream', bg: 'bg-cream', ring: true },
              ]}
            />
          </div>
          <Paragraph text={ps[1]} />
          <FieldNote text={fn[0]} />
          <Wordmark />
          <Paragraph text={ps[2]} />
          <Paragraph text={ps[3]} />
          <TypeSpecimen />
          <Paragraph text={ps[4]} />
        </div>
      )

    case 'construction':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <div>
            <ExternalLink
              href="https://github.com/emmastotz/beaverhausen"
              size="sm"
              variant="ghost"
            >
              View the repo
            </ExternalLink>
          </div>
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center overflow-hidden rounded-md border border-beaver/20 bg-cream shadow-sm">
            <img
              src={damLandmarkAll}
              alt="portfolio parallax"
              className="pointer-events-none size-full object-cover"
            />
          </div>
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[3]} />
          <FieldNote text={fn[1]} />
          <Paragraph text={ps[4]} />
          <Paragraph text={ps[5]} />
        </div>
      )

    case 'study':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <Paragraph text={ps[1]} />
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[2]} />
          <Paragraph text={ps[3]} />
          <Paragraph text={ps[4]} />
        </div>
      )

    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function BeaverhausenCaseStudy() {
  return (
    <div className="relative">
      <img
        src={beaverGnawing}
        alt=""
        className="pointer-events-none hidden w-60 lg:absolute lg:top-14 lg:left-0 lg:block xl:top-28 xl:left-[1%] xl:w-80"
      />
      <img
        src={lodgeBlueprint}
        alt=""
        className="pointer-events-none hidden w-80 rotate-4 border-x border-t-2 border-black/15 shadow-lg lg:absolute lg:right-6 lg:bottom-0 lg:block xl:w-120"
      />

      <div className="relative">
        <Flipbook
          label="Beaverhausen"
          chapters={CHAPTERS}
          wordmark={
            <Wordmark
              bColor="fill-cream dark:fill-beaver-dark"
              beaverColor="fill-beaver dark:fill-cream"
            />
          }
          description="Personal brand and design system. Built from first principles."
        >
          {(id) => <Content id={id} />}
        </Flipbook>
      </div>
    </div>
  )
}
