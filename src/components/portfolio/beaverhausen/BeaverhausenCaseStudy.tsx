import lodgeBlueprint from '../../../assets/portfolio/lodge-blueprint.svg'
import { Wordmark } from '../../brand/Wordmark'
import { Flipbook, type Chapter } from '../../gsap/Flipbook'
import { BaseT4 } from '../../primitives/BaseT4'
import { BaseT5 } from '../../primitives/BaseT5'
import { BaseT6 } from '../../primitives/BaseT6'
import { TypeSpecimen } from './TypeSpecimen'

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

// ─── Content ──────────────────────────────────────────────────────────────────

function Content({ id }: { id: string }) {
  switch (id) {
    case 'habitat':
      return (
        <div className="space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              Every portfolio is, at its core, a hypothesis. Followed quickly by
              an analysis of oneself.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              This one began with a simple observation: most designer/engineer
              portfolios look like neither. They are either too sparse to show
              range or too cluttered to show taste. The brief was to avoid both
              failure modes.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The constraints were real. No off-the-shelf template. No borrowed
              identity. Everything had to be built from first principles: name,
              mark, palette, type system, site. The subject matter: me. Someone
              who builds things that last, and wants a portfolio that does the
              same.
            </BaseT4>
          </p>
          <div className="my-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> the name
                came before the logo. Something about compound nouns. Something
                German. Something with teeth. It started as a funny pseudonym, a
                joke I had with myself. But jokes have a way of becoming serious
                when you sit with them long enough.
              </BaseT5>
            </p>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The beaver, it turned out, was not a joke. It was an observation.
              A creature known for precision engineering. For working alone, or
              in small teams, in conditions that are not ideal for everyone. For
              building structures that reshape the landscape, and doing so
              without fanfare. For having extremely strong teeth.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The question shifted: not what should I call myself but rather,
              how do I elevate the beaver, make it worthy of a brand? Which is,
              if you think about it, exactly the kind of problem a
              designer/engineer should be solving.
            </BaseT4>
          </p>
        </div>
      )

    case 'sketches':
      return (
        <div className="space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              The beaver was the <em>only</em> choice for the logo. Refining
              that into a mark that could hold both precision and personality
              was where the real work began.
            </BaseT4>
          </p>
          <div className="my-8 grid gap-4 sm:grid-cols-2">
            <div className="flex aspect-square items-center justify-center rounded-md bg-beaver/10">
              <span className="text-xs text-beaver/40">Sketch placeholder</span>
            </div>
            <div className="flex aspect-square items-center justify-center rounded-md bg-beaver/10">
              <span className="text-xs text-beaver/40">Sketch placeholder</span>
            </div>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The first sketches were too simplistic: a line art beaver, clean
              and friendly, that explained the joke instead of landing it.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              Predictably, I overcomplicated it. Too much detail in the beaver,
              too much trying to say everything at once. The right direction
              came from reduction; pulling back until only the essential gesture
              remained. Not a highly detailed beaver, but a silhouette with just
              enough precision to disappear into something larger. The mark of
              something that builds with intention.
            </BaseT4>
          </p>

          <p>
            <BaseT4 className="text-beaver">
              The beaver silhouette is embedded within the B, completing the
              lower bowl of the letterform; visible if you're looking, invisible
              if you're not. The kind of thing that rewards a second glance.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The logo is a small argument that precision and playfulness are
              not opposites, just different tools for the same job.
            </BaseT4>
          </p>
        </div>
      )

    case 'taxonomy':
      return (
        <div className="space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              A design system for yourself is a strange thing to build. It is,
              in some sense, overkill. But the discipline of naming things, of
              deciding what <em>iron-orange</em> is and why it is not just
              orange, produces clarity that informal work rarely achieves. It
              also came naturally. When your brand is named after an animal, the
              taxonomy writes itself.
            </BaseT4>
          </p>
          <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: 'Beaver', bg: 'bg-beaver' },
              { name: 'Beaver Dark', bg: 'bg-beaver-dark' },
              { name: 'Iron Orange', bg: 'bg-iron-orange' },
              { name: 'Cream', bg: 'bg-cream', ring: true },
            ].map(({ name, bg }) => (
              <div key={name}>
                <div
                  className={`${bg} aspect-square rounded-md ${name === 'Cream' ? 'ring-1 ring-beaver/20' : ''}`}
                />
                <p>
                  <BaseT6 className="text-iron-orange uppercase">{name}</BaseT6>
                </p>
              </div>
            ))}
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The warm browns are lifted directly from a beaver's coat, while
              the burnt orange is more specific: beaver tooth enamel is
              reinforced with iron, which turns it a deep, hard orange. The same
              orange that makes their teeth self-sharpening. It felt like the
              right color for a brand built on precision.
            </BaseT4>
          </p>

          <div className="my-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> the color
                system named itself. The type system required an argument.
              </BaseT5>
            </p>
          </div>

          <Wordmark />

          <p>
            <BaseT4 className="text-beaver">
              The Beaverhausen wordmark is built on a deliberate tension.
              <em> Beaver</em> is set in a high-contrast, organic serif with
              curves that have opinions, a personality that earns attention.
              <em> hausen</em> follows in a clean, geometric sans-serif:
              structured, precise, and completely sure of itself. The two halves
              shouldn't work together. They do.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              Magic Retro earns its place in display settings: headlines, the
              wordmark, moments that call for character. At smaller sizes the
              contrast becomes a liability, so Fraunces steps in as the
              workhorse serif: rounder, more legible, better suited to running
              text. They don't share the same personality, but they share a
              warmth that keeps the system coherent.
            </BaseT4>
          </p>

          <TypeSpecimen />

          <p>
            <BaseT4 className="text-beaver">
              The result is a system that knows what it is: warm but structured,
              playful but precise. The kind of thing that only works if you
              commit to both halves equally.
            </BaseT4>
          </p>
        </div>
      )

    case 'construction':
      return (
        <div className="space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              The stack was chosen for nostalgia as much as longevity. Working
              primarily in Vue day-to-day, this was an opportunity to dust off
              React, to build something outside the norm, on purpose. Vite,
              React, TypeScript, Tailwind. Solid and a little boring, which left
              room for the interesting problems. With a familiar stack, the
              learning curve lives not in where things go right,{' '}
              <em>but in where they go wrong</em>.
            </BaseT4>
          </p>

          <div className="my-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* Parallax landscape mid-scroll or a code snippet? */}
            </span>
          </div>
          <p>
            <BaseT4 className="text-beaver">
              The SVG landmark components are animated inline: cattails swaying,
              each scene with its own keyframe set to avoid conflicts across
              simultaneously mounted components. Hover states reveal wordmarks
              and navigate to case studies.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              Z-index management became its own discipline. Absolutely
              positioned elements interact in ways that are hard to predict and
              harder to debug.
            </BaseT4>
          </p>
          <div className="my-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> when
                everything is layered, the hardest bugs are the ones you can't
                see.
              </BaseT5>
            </p>
          </div>

          <div className="my-8 flex aspect-video items-center justify-center rounded-md bg-beaver/10">
            <span className="text-xs text-beaver/40">
              Screenshot placeholder
              {/* Water flood transition (as a gif) or a code snippet? */}
            </span>
          </div>

          <p>
            <BaseT4 className="text-beaver">
              Some problems found more elegant solutions than others. GSAP was
              added late, initially for the page flip on this case study. It
              stayed because it belongs here: the water flood transition, the
              landmark animations, eventually the parallax itself. It is a large
              library with a learning curve that demands respect. Learning it
              was the point.
            </BaseT4>
          </p>
          <div className="my-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> the goal
                throughout was restraint. Microanimations that enhance without
                announcing themselves. A site that moves, but doesn't perform.
              </BaseT5>
            </p>
          </div>

          <p>
            <BaseT4 className="text-beaver">
              The file structure was a deliberate departure from the
              architecture used in client work. In larger projects, dependencies
              are separated from application code with the aim of keeping the
              codebase framework agnostic: Vue in, React out, without touching
              business logic. For a portfolio site, that abstraction is
              overkill. The default Vite scaffolding is enough structure to find
              things without making the structure a project in itself.
            </BaseT4>
          </p>

          <p>
            <BaseT4 className="text-beaver">
              The ambition behind all of it was simple, if a little earnest:
              this site exists to showcase things that don't come up in a
              typical client sprint. The harder question throughout was not
              technical. It was whether a lay user would find any of this
              intuitive: is it obvious that the landmarks are clickable? Is it
              clear that the parallax can be skipped? Does the experience
              communicate what it is, or does it just look interesting? These
              are questions without clean answers, and they stayed open longer
              than the code did.
            </BaseT4>
          </p>
        </div>
      )

    case 'study':
      return (
        <div className="space-y-6">
          <p>
            <BaseT4 className="text-beaver">
              A portfolio is never truly finished. It is a living document of
              what you know how to do, which means it evolves as you do. This
              version is not the first iteration, but thorough enough to show
              range, and honest enough to show process.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              What still needs work is a long list. Mobile responsiveness on the
              portfolio pages. Deeper accessibility for the parallax, a
              visual-heavy interaction that currently asks too much of keyboard
              and screen reader users. Dark mode. An HTML semantics audit.
              Tests. The gap between a thing that works and a thing that is done
              is, it turns out, quite wide.
            </BaseT4>
          </p>
          <div className="my-8 border-l-2 border-iron-orange pl-4">
            <p>
              <BaseT5
                variant="display"
                className="tracking-normal text-beaver italic"
              >
                <strong className="tracking-wide">Field note:</strong> the gap
                between a thing that works and a thing that is done is, it turns
                out, quite wide.
              </BaseT5>
            </p>
          </div>

          <p>
            <BaseT4 className="text-beaver">
              Landing on this site, you are met with a cinematic experience
              rather than a wall of text. The parallax makes it a journey, an
              exploration, and somewhere in there, a fairly unsubtle love letter
              to an animal that deserves more credit than it gets.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              The design system held up. Naming things early: tokens,
              components, the type scale. It all paid off in ways that are hard
              to quantify but easy to feel. The tension that runs through it:
              precise but warm, structured but playful, was not invented for the
              brand. It was observed. The beaver was a convenient mirror. The
              design system was a way of formalizing something that was already
              true.
            </BaseT4>
          </p>
          <p>
            <BaseT4 className="text-beaver">
              Beaverhausen is, in the end, a portrait as much as a portfolio.
            </BaseT4>
          </p>
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
        src={lodgeBlueprint}
        alt=""
        className="pointer-events-none absolute top-[10%] left-[15%] hidden w-80 -rotate-4 shadow-sm lg:block"
      />

      <Flipbook chapters={CHAPTERS} wordmark={<Wordmark bColor="#fff5e3" />}>
        {(id) => <Content id={id} />}
      </Flipbook>
    </div>
  )
}
