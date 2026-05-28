import brandGuidelines from '@/assets/portfolio/brand-guidelines.png'
import landingHeroNewDark from '@/assets/portfolio/landing-hero-new-dark.png'
import landingHeroNew from '@/assets/portfolio/landing-hero-new.png'
import landingHeroOld from '@/assets/portfolio/landing-hero-old.png'
import newWhitePaper from '@/assets/portfolio/new-cyber-risk-radar-whitepaper-cover.png'
import oldWhitePaper from '@/assets/portfolio/old-cyber-risk-radar-whitepaper-cover.png'
import typographyScale from '@/assets/portfolio/typography-scale.svg'
import whitehawkFileStructure from '@/assets/portfolio/whitehawk-file-structure.svg'
import { Flipbook, type Chapter } from '@/components/gsap/Flipbook'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { BaseT5 } from '@/components/primitives/BaseT5'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { ExternalLink } from '@/components/primitives/ExternalLink'

const CHAPTERS: Chapter[] = [
  {
    id: 'habitat',
    tab: 'I',
    title: 'Habitat Survey',
    subtitle: 'Context & Brief',
  },
  {
    id: 'sketches',
    tab: 'II',
    title: 'Field Sketches',
    subtitle: 'Exploration & Identity',
  },
  {
    id: 'taxonomy',
    tab: 'III',
    title: 'Taxonomy',
    subtitle: 'The Design System',
  },
  {
    id: 'construction',
    tab: 'IV',
    title: 'Construction',
    subtitle: 'The Build',
  },
  { id: 'study', tab: 'V', title: 'Ongoing Study', subtitle: 'Reflections' },
]

function Content({ id }: { id: string }) {
  switch (id) {
    case 'habitat':
      return (
        <div className="flex flex-col space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              WhiteHawk is a cybersecurity company operating at the intersection
              of risk intelligence and enterprise software. The engagement spans
              six years and covers more ground than most projects get in a
              decade: a design system built from scratch, a company-wide rollout
              across marketing and product surfaces, and lead frontend
              engineering across the public site through two major migrations.
            </BaseT4>
          </p>
          <div>
            <ExternalLink
              href="https://whitehawk.com/"
              size="sm"
              variant="ghost"
            >
              whitehawk.com
            </ExternalLink>
          </div>
          <div className="mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong> six
                years is long enough to watch a brand grow into itself. Long
                enough to know which decisions were right, which ones you'd
                revisit, and which ones you'd make exactly the same way again.
              </BaseT5>
            </p>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The brief came with a constraint that turned out to be a useful
              one. The core brand elements were already established: logo,
              colors, fonts. A baseline existed, even if it was bare bones. The
              work was not to invent a new identity, but to take what was there
              and build something coherent and scalable from it. To find the
              system inside the starting point.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              That distinction matters. It shifts the question from what should
              this brand be to what does this brand want to become. In some ways
              the harder problem, because the answer has to respect what's
              already there.
            </BaseT4>
          </p>
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
          <p>
            <BaseT4 className="text-beaver">
              Starting from an existing brand means your first job is forensic.
              What was intentional, and what just accumulated? What holds up at
              scale, and what only worked because the surface area was small
              enough that inconsistency didn't show yet?
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                the original mark was always good. It just hadn't been given
                permission to be confident yet.
              </BaseT5>
            </p>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              What existed was functional but unconsolidated. Every white paper,
              slide deck, and page of the site had arrived at its own
              interpretation of the brand. It wasn't chaos, but it wasn't a
              system either. The visual language had the texture of something
              that had grown organically over time: functional for its moment,
              but not the story WhiteHawk wanted to tell anymore.
            </BaseT4>
          </p>
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={landingHeroOld}
              alt="Old whitehawk.com landing page hero"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The work was extension and systematization rather than invention.
              Taking the existing logo, colors, and fonts and building out
              everything that wasn't there: the rules for how they behave
              together, the decisions that hadn't been made yet, the language
              for what the brand is and isn't allowed to do. The decisions that
              make a brand repeatable rather than approximate.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The teal didn't disappear in the process; it found its job. In the
              original site it highlighted a single word in a headline:
              decorative, slightly arbitrary. In the updated system it became
              the primary action color in dark mode: buttons, links, interactive
              states. The same color, a completely different role. That kind of
              reassignment is what a design system is for.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The messaging shifted too. <em>Empowering a Fearless Internet</em>{' '}
              is aspirational and broad.{' '}
              <em>Simplifying Cyber Risk. Empowering Resilience.</em> is direct
              and specific. The brand didn't change its values; it got better at
              stating them.
            </BaseT4>
          </p>

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
          <p>
            <BaseT4 className="text-beaver">
              A design system built on an existing brand is less about invention
              and more about excavation. The raw materials were already there:
              the logo, the colors, the fonts. The system was the work of
              deciding what they meant, how they behaved, and what happened when
              they had to do something they'd never been asked to do before.
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> working
                within constraints you didn't set is its own discipline. You
                spend less time asking what the brand should be and more time
                understanding what it already is. That turns out to be the more
                interesting question.
              </BaseT5>
            </p>
          </div>

          <div className="mt-2 mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: 'Primary Blue', bg: 'bg-[#0000FF]' },
              { name: 'Navy', bg: 'bg-[#14275d]' },
            ].map(({ name, bg }) => (
              <div key={name}>
                <div
                  className={`${bg} aspect-square rounded-md shadow-sm ${name === 'Cream' ? 'ring-1 ring-beaver/20' : ''}`}
                />
                <p>
                  <BaseT6 className="text-iron-orange uppercase">{name}</BaseT6>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 mb-8 grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-8">
            {[
              { name: 'Dark Gray', bg: 'bg-[#374151]' },
              { name: 'Gray', bg: 'bg-[#6B7280]' },
              { name: 'White', bg: 'bg-white' },
              { name: 'Teal', bg: 'bg-[#2DD4BF]' },
              { name: 'Indigo', bg: 'bg-[#5850EC]' },
            ].map(({ name, bg }) => (
              <div key={name}>
                <div
                  className={`${bg} aspect-square rounded-md shadow-sm ${name === 'Cream' ? 'ring-1 ring-beaver/20' : ''}`}
                />
                <p>
                  <BaseT6 className="text-iron-orange uppercase">{name}</BaseT6>
                </p>
              </div>
            ))}
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The color system landed at seven tokens with defined roles: two
              primaries (a saturated blue and a deep navy), three secondaries
              covering the neutral range, and two accents (teal for interactive
              and digital highlights, indigo for visual emphasis). None of those
              roles existed before. The colors did, but not the rules.
            </BaseT4>
          </p>

          <div className="mx-auto mt-2 mb-8 aspect-auto size-full max-w-md">
            <img
              src={typographyScale}
              alt="Typography scale"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <p>
            <BaseT4 className="text-beaver">
              Typography was one area where the baseline held up. Core Sans had
              been in use on the site from the start, with Arial as its
              fallback: a sensible pairing that didn't need to change. What did
              need work was how the type system lived in the code. The existing
              components had no separation of concerns between sizing and
              semantic tags: presentation and meaning tangled together in ways
              that made the system brittle and hard to extend. Reworking that
              was less visible than a font swap, but more durable. A type system
              that knows what it is at the code level is one that can actually
              scale.
            </BaseT4>
          </p>

          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={brandGuidelines}
              alt="Brand Guidelines"
              className="pointer-events-none size-full object-contain"
            />
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The guidelines extended beyond the site to govern how partners use
              the brand: logo clear space, minimum sizes, approved taglines,
              what can't be changed. A brand that only exists on your own
              surfaces isn't really a system. It's a style. The partner portal
              guidelines are where it became something other people had to
              follow.
            </BaseT4>
          </p>
          <div className="mt-2 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                the contact for brand approvals on the partner guidelines is
                listed as a software developer. That's either a sign of a small
                team, or a sign of how much the role expanded. Probably both.
              </BaseT5>
            </p>
          </div>
        </div>
      )

    case 'construction':
      return (
        <div className="flex flex-col space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              WhiteHawk's site has been rebuilt twice. The first migration moved
              the codebase from PHP to Vue 2: not an arbitrary technology
              choice, but a practical one. The WordPress/PHP build handling the
              marketing site UI didn't offer the customization the site needed.
              Vue was already in use on the portal platform, which made it the
              natural extension of a decision already made. The second
              migration, from Vue 2 to Vue 3 with TypeScript, was driven by
              something quieter: maintainability. The libraries were moving, and
              the codebase needed to move with them.
            </BaseT4>
          </p>

          <div className="mx-auto mt-2 mb-8 flex aspect-auto max-w-lg items-center justify-center overflow-hidden rounded-md shadow">
            <img
              src={whitehawkFileStructure}
              alt="WhiteHawk Monorepo Architecture"
              className="pointer-events-none size-full object-cover"
            />
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The more significant architectural evolution came later. What had
              been a single codebase was split into a monorepo with three
              distinct repos: the marketing site, the client portal, and the
              admin portal, managed with Turborepo. The separation is partly
              organizational, but more importantly it's a security boundary that
              didn't exist before: one that closed gaps that are easy to miss
              until you're looking for them.
            </BaseT4>
          </p>

          <p>
            <BaseT4 className="text-beaver">
              Owning a codebase across both rewrites means inheriting your own
              decisions. The monorepo structure held up. The architecture
              underneath it less so. Successive migrations and rebrands have
              left it in a state that could use significant attention. That's
              not a failure, exactly. It's the expected output of a codebase
              that kept moving while also keeping the lights on. But it's the
              thing you'd do differently, and knowing that is its own kind of
              knowledge.
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                there is a particular kind of wisdom that only comes from
                staying; from watching a codebase age; from being the person who
                wrote the comment you're now debugging. It's surreal in the
                moment and clarifying in retrospect.
              </BaseT5>
            </p>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The current frontend stack is Vue 3, TypeScript, Vite, Tailwind,
              TanStack Query and Table, and Turborepo. Protobuf handles the
              frontend-backend contract; the backend runs on Java/Maven with AWS
              DynamoDB. The architecture reflects the same principle the design
              system does: built to scale, built to be handed off, built to last
              longer than the sprint it was finished in. Whether it fully lives
              up to that is a work in progress.
            </BaseT4>
          </p>
        </div>
      )

    case 'study':
      return (
        <div className="flex flex-col space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              Most projects have a clear edge: a handoff, a launch, a moment
              where your involvement ends and someone else's begins. WhiteHawk
              never had that. The rebrand fed the design system. The design
              system fed the site. The site kept evolving. Six years in, it
              still is.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              WhiteHawk is where the work became real. What a small team demands
              is range. You wear the hat that needs wearing. Sometimes that's
              engineer, sometimes designer, sometimes project manager, sometimes
              the person who wrote the brand guidelines and is also the person
              implementing them in code. That breadth becomes clarifying over
              time. It has taught not just how to develop, but how to think
              about architecture: how decisions made at the identity level echo
              in the component library, how consistency isn't a design
              preference but an engineering requirement.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              Working across every layer of the same product means understanding
              how decisions in one layer ripple into the others. The choice to
              stick with Core Sans rather than introduce a new typeface wasn't
              just aesthetic, it informed the type system rework that came
              later. The monorepo split had implications for how the brand
              rolled out across surfaces. These things compound over time. A
              typical engagement doesn't give you enough runway to see it
              happen, let alone to course-correct when it doesn't.
            </BaseT4>
          </p>
          <div className="mx-auto mt-2 mb-8 aspect-auto max-w-md overflow-hidden rounded-md shadow">
            <img
              src={newWhitePaper}
              alt="Rebranded WhiteHawk Product White Paper"
              className="pointer-events-none size-full object-contain"
            />
          </div>

          <div className="mt-2 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                the longest projects don't feel long from the inside. They feel
                like a series of reasonable next steps.
              </BaseT5>
            </p>
          </div>
        </div>
      )

    default:
      return null
  }
}

export function WhiteHawkCaseStudy() {
  return (
    <div className="relative">
      <Flipbook
        chapters={CHAPTERS}
        wordmark={<BaseT1 className="text-cream">WhiteHawk</BaseT1>}
      >
        {(id) => <Content id={id} />}
      </Flipbook>
    </div>
  )
}
