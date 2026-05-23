import { Flipbook, type Chapter } from '../../gsap/Flipbook'
import { BaseT4 } from '../../primitives/BaseT4'
import { BaseT5 } from '../../primitives/BaseT5'

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
          <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
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
              one: the core brand elements were already established. Logo,
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
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/*  whitehawk.com hero or current state of the site */}
            </span>
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
          <p>
            <BaseT4 className="text-beaver">
              What existed was functional but unconsolidated. Every white paper,
              slide deck, and page of the site had arrived at its own
              interpretation of the brand. It wasn't chaos, but it wasn't a
              system either. The visual language had the texture of something
              that had grown organically over time: functional for its moment,
              but not the story WhiteHawk was ready to tell anymore.
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* example of an older white paper, slide deck, or site screenshot showing the inconsistency */}
            </span>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The work was extension and systematization rather than invention.
              Taking the existing logo, colors, and fonts and building out
              everything that wasn't there: the rules for how they behave
              together, the decisions that hadn't been made yet, the language
              for what the brand is and isn't allowed to do.
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* a refreshed white paper, slide deck, or marketing asset showing the updated identity */}
            </span>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The rollout covered whitehawk.com, marketing collateral, and
              product interfaces, with portal surfaces still in progress. Each
              surface asked something slightly different of the system.
              {/* [PLACEHOLDER: anything specific about how the identity translated
              — or had to adapt — across those different contexts.] */}
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
          {/* <p>
            <BaseT4 className="text-beaver">
              [PLACEHOLDER: describe the component library — what it covers, how
              it was built, what principles guided it.]
            </BaseT4>
          </p> */}
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* component library overview — Figma file, design tokens, or a component sheet */}
            </span>
          </div>
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
              The system had to hold across a wide surface area from the start:
              whitehawk.com, marketing collateral, and product interfaces, with
              portal surfaces still in progress. That constraint shaped every
              decision. A component that only works in one context isn't a
              system, it's a workaround.
            </BaseT4>
          </p>
          {/* <p>
            <BaseT4 className="text-beaver">
              [PLACEHOLDER: anything specific about the implementation, handoff,
              or adoption worth noting.]
            </BaseT4>
          </p> */}
        </div>
      )

    case 'construction':
      return (
        <div className="flex flex-col space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              whitehawk.com has been rebuilt twice. The first migration moved
              the codebase from PHP to Vue 2: a meaningful step, but one that
              came with the constraints of its moment. The second was a full
              migration to Vue 3 with TypeScript: more deliberate, more
              considered, with the benefit of having already done it once.
            </BaseT4>
          </p>
          {/* <p>
            <BaseT4 className="text-beaver">
              [PLACEHOLDER: anything specific about what drove each migration —
              performance, maintainability, team needs, or something else worth
              naming.]
            </BaseT4>
          </p> */}
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* the site at different stages — PHP era, Vue 2, current Vue 3 — even rough screenshots work here */}
            </span>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              Owning a codebase across both rewrites means inheriting your own
              decisions. The things that held up, and the things that didn't.
              {/* [PLACEHOLDER: a specific example of something that aged well, and
              something you'd approach differently now.] */}
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The current stack is Vue 3, TypeScript,
              {/* [PLACEHOLDER: any other
              tools, build setup, or infrastructure worth mentioning for
              whitehawk.com specifically].  */}
              The architecture reflects the same principle the design system
              does: built to scale, built to be handed off, built to last longer
              than the sprint it was finished in.
            </BaseT4>
          </p>
          <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                there is a particular kind of knowledge that only comes from
                staying; from watching a codebase age; from being the person who
                wrote the comment you're now debugging. It's uncomfortable in
                the moment and clarifying in retrospect.
              </BaseT5>
            </p>
          </div>
        </div>
      )

    case 'study':
      return (
        <div className="flex flex-col space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              Most projects have a clear edge. A handoff, a launch, a moment
              where your involvement ends and someone else's begins.
              whitehawk.com never had that. The rebrand fed the design system.
              The design system fed the site. The site kept evolving. Six years
              in, it still is.
            </BaseT4>
          </p>
          {/* <p>
            <BaseT4 className="text-beaver">
              [PLACEHOLDER: something specific about what it taught you to work
              across every layer of the same product — from identity decisions
              down to component architecture. What does that continuity make
              possible that a typical engagement wouldn't?]
            </BaseT4>
          </p> */}
          <div className="mt-2 mb-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* the site at different stages — PHP era, Vue 2, current Vue 3 — even rough screenshots work here */}
            </span>
          </div>
          {/* <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note: </strong>
                [PLACEHOLDER: something honest and specific — a moment, a
                realisation, or a thing that surprised you about working on the
                same product for this long.]
              </BaseT5>
            </p>
          </div> */}
        </div>
      )

    default:
      return null
  }
}

export function WhiteHawkCaseStudy() {
  return (
    <div className="relative">
      <Flipbook chapters={CHAPTERS}>{(id) => <Content id={id} />}</Flipbook>
    </div>
  )
}
