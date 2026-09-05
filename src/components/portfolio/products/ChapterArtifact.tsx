import type { Artifact, ArtifactSlot, ArtifactWidth } from '@/content/products'

import { BaseT6 } from '@/components/primitives/BaseT6'

// Prose is capped at max-w-3xl. Artifacts are not: they break out past the text column.
const WIDTHS: Record<ArtifactWidth, string> = {
  md: 'max-w-3xl', // matches the text column
  lg: 'max-w-4xl',
  xl: 'max-w-none', // fills the chapter column
}

function Frame({ artifact }: { artifact: Artifact }) {
  const width = artifact.width ? WIDTHS[artifact.width] : ''
  return (
    <div className={`mx-auto aspect-auto ${width}`}>
      <img
        src={artifact.src}
        alt={artifact.alt}
        className="pointer-events-none size-full object-contain"
      />
    </div>
  )
}

export function ChapterArtifact({ slot }: { slot: ArtifactSlot }) {
  const width = WIDTHS[slot.width ?? 'md']

  return (
    <figure className={`mx-auto mt-2 mb-8 w-full sm:px-4 md:px-8 lg:px-4 ${width}`}>
      {slot.kind === 'single' ? (
        <Frame artifact={slot.artifact} />
      ) : (
        <div
          className={`grid items-start gap-4 ${slot.stacked ? '' : 'md:grid-cols-2'}`}
        >
          <Frame artifact={slot.artifacts[0]} />
          <Frame artifact={slot.artifacts[1]} />
        </div>
      )}
      <figcaption className="mx-auto max-w-3xl">
        <BaseT6 className="tracking-normal text-beaver italic dark:text-cream">
          {slot.caption}
        </BaseT6>
      </figcaption>
    </figure>
  )
}
