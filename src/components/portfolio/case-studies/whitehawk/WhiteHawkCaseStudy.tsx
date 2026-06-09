import brandGuidelines from '@/assets/portfolio/case-studies/whitehawk/brand-guidelines.png'
import landingHeroNewDark from '@/assets/portfolio/case-studies/whitehawk/landing-hero-new-dark.png'
import landingHeroNew from '@/assets/portfolio/case-studies/whitehawk/landing-hero-new.png'
import landingHeroOld from '@/assets/portfolio/case-studies/whitehawk/landing-hero-old.png'
import newWhitePaperCmmc from '@/assets/portfolio/case-studies/whitehawk/new-cyber-risk-radar-whitepaper-cmmc.png'
import newWhitePaperBlue from '@/assets/portfolio/case-studies/whitehawk/new-cyber-risk-radar-whitepaper-cover-blue.png'
import newWhitePaper from '@/assets/portfolio/case-studies/whitehawk/new-cyber-risk-radar-whitepaper-cover.png'
import oldWhitePaper from '@/assets/portfolio/case-studies/whitehawk/old-cyber-risk-radar-whitepaper-cover.png'
import typographyScale from '@/assets/portfolio/case-studies/whitehawk/typography-scale.svg'
import whitehawkFileStructure from '@/assets/portfolio/case-studies/whitehawk/whitehawk-file-structure.svg'
import whitehawkLogo from '@/assets/portfolio/case-studies/whitehawk/whitehawk-logo.svg'
import { Flipbook } from '@/components/gsap/Flipbook'
import { ColorPalette } from '@/components/portfolio/case-studies/ColorPalette'
import { FieldNote } from '@/components/portfolio/case-studies/FieldNote'
import { Paragraph } from '@/components/portfolio/case-studies/Paragraph'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { ExternalLink } from '@/components/primitives/ExternalLink'
import { CHAPTERS, CHAPTER_COPY } from '@/content/case-study-whitehawk'

function Content({ id }: { id: string }) {
  const copy = CHAPTER_COPY[id]
  if (!copy) return null
  const { paragraphs: ps, fieldNotes: fn } = copy

  switch (id) {
    case 'habitat':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <div>
            <ExternalLink
              href="https://whitehawk.com/"
              size="sm"
              variant="ghost"
            >
              whitehawk.com
            </ExternalLink>
          </div>
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <div className="mx-auto mt-2 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={oldWhitePaper}
              alt="Old WhiteHawk Product White Paper"
              className="pointer-events-none size-full object-contain"
            />
          </div>
        </div>
      )

    case 'sketches':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[1]} />
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={landingHeroOld}
              alt="Old whitehawk.com landing page hero"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <Paragraph text={ps[2]} />
          <Paragraph text={ps[3]} />
          <Paragraph text={ps[4]} />
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={landingHeroNew}
              alt="Rebranded whitehawk.com landing page hero in light mode"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <div className="mx-auto mt-2 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={landingHeroNewDark}
              alt="Rebranded whitehawk.com landing page hero in dark mode"
              className="pointer-events-none size-full object-contain"
            />
          </div>
        </div>
      )

    case 'taxonomy':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <FieldNote text={fn[0]} />
          <div className="mt-2 mb-6 lg:mx-auto lg:max-w-2xl">
            <ColorPalette
              palette={[
                { name: 'Primary Blue', bg: 'bg-[#0000FF]' },
                { name: 'Navy', bg: 'bg-[#14275d]' },
              ]}
            />
          </div>
          <div className="mt-2 mb-8 lg:mx-auto lg:max-w-2xl">
            <ColorPalette
              palette={[
                { name: 'Dark Gray', bg: 'bg-[#374151]' },
                { name: 'Gray', bg: 'bg-[#6B7280]' },
                { name: 'White', bg: 'bg-white' },
                { name: 'Teal', bg: 'bg-[#2DD4BF]' },
                { name: 'Indigo', bg: 'bg-[#5850EC]' },
              ]}
              isPrimary={false}
            />
          </div>
          <Paragraph text={ps[1]} />
          <div className="mx-auto mt-2 mb-8 aspect-auto size-full max-w-md">
            <img
              src={typographyScale}
              alt="Typography scale"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <Paragraph text={ps[2]} />
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={brandGuidelines}
              alt="Brand Guidelines"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <Paragraph text={ps[3]} />
          <FieldNote text={fn[1]} />
        </div>
      )

    case 'construction':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <div className="mx-auto mt-2 mb-8 flex aspect-auto max-w-lg items-center justify-center overflow-hidden rounded-md shadow">
            <img
              src={whitehawkFileStructure}
              alt="WhiteHawk Monorepo Architecture"
              className="pointer-events-none size-full object-cover"
            />
          </div>
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <FieldNote text={fn[0]} />
          <Paragraph text={ps[3]} />
        </div>
      )

    case 'study':
      return (
        <div className="flex flex-col space-y-6">
          <Paragraph text={ps[0]} />
          <Paragraph text={ps[1]} />
          <Paragraph text={ps[2]} />
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={newWhitePaper}
              alt="Rebranded WhiteHawk Product White Paper"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <FieldNote text={fn[0]} />
        </div>
      )

    default:
      return null
  }
}

export function WhiteHawkCaseStudy() {
  return (
    <div className="relative">
      <img
        src={newWhitePaperCmmc}
        alt=""
        className="pointer-events-none hidden w-120 -rotate-4 border-x border-t border-black/10 shadow-lg lg:absolute lg:bottom-40 lg:left-0 lg:block 2xl:-left-30"
      />
      <img
        src={newWhitePaperBlue}
        alt=""
        className="pointer-events-none hidden w-120 rotate-6 border-x border-t-2 border-black/15 shadow-lg lg:absolute lg:right-8 lg:bottom-16 lg:block 2xl:-right-20"
      />
      <img
        src={whitehawkLogo}
        alt=""
        className="pointer-events-none hidden w-80 lg:absolute lg:bottom-2 lg:left-0 lg:block 2xl:-left-8"
      />

      <div className="relative">
        <Flipbook
          label="WhiteHawk"
          chapters={CHAPTERS}
          wordmark={<BaseT1 className="text-cream">WhiteHawk</BaseT1>}
        >
          {(id) => <Content id={id} />}
        </Flipbook>
      </div>
    </div>
  )
}
