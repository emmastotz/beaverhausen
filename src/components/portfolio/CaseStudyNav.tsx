import { BaseT6 } from '@/components/primitives/BaseT6'
import { TransitionLink } from '@/components/primitives/TransitionLink'
import { CASE_STUDIES } from '@/content/case-studies'

import { BaseT5 } from '../primitives/BaseT5'

interface Props {
  currentHref: string
}

export function CaseStudyNav({ currentHref }: Props) {
  const available = CASE_STUDIES.filter((s) => s.available)
  const idx = available.findIndex((s) => s.href === currentHref)

  if (idx === -1 || available.length < 2) return null

  const isFirst = idx === 0
  const isLast = idx === available.length - 1

  // Only wrap around when there are enough items that prev/next are distinct targets.
  // With 2 items, circular wrapping produces the same destination for both directions.
  const showPrev = !isFirst || available.length > 2
  const showNext = !isLast || available.length > 2

  const prev = showPrev
    ? available[(idx - 1 + available.length) % available.length]
    : null
  const next = showNext ? available[(idx + 1) % available.length] : null

  return (
    <nav
      aria-label="Case study navigation"
      className="mx-auto flex max-w-3xl items-center justify-between"
    >
      {prev ? (
        <TransitionLink
          to={prev.href}
          aria-label={`Previous case study: ${prev.title}`}
          className="group flex flex-col gap-1 px-4 pt-6 pb-4 transition-colors duration-200 focus-visible:outline-none lg:pl-0"
        >
          <BaseT6 className="text-iron-orange/70 uppercase group-hover:text-iron-orange group-focus-visible:text-iron-orange">
            ← Previous
          </BaseT6>
          <BaseT5 className="tracking-widest text-beaver uppercase group-hover:text-beaver-dark group-focus-visible:text-beaver-dark">
            {prev.title}
          </BaseT5>
        </TransitionLink>
      ) : (
        <div className="flex-1" />
      )}

      {next && (
        <TransitionLink
          to={next.href}
          aria-label={`Next case study: ${next.title}`}
          className="group flex flex-col items-end gap-1 px-4 pt-6 pb-4 text-right transition-colors duration-200 focus-visible:outline-none lg:pr-0"
        >
          <BaseT6 className="text-iron-orange/70 uppercase group-hover:text-iron-orange group-focus-visible:text-iron-orange">
            Next →
          </BaseT6>
          <BaseT5 className="tracking-widest text-beaver uppercase group-hover:text-beaver-dark group-focus-visible:text-beaver-dark">
            {next.title}
          </BaseT5>
        </TransitionLink>
      )}
    </nav>
  )
}
