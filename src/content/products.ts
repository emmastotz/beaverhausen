export interface Product {
  id: string
  name: string
  thumbnail: string | null
}

export const PRODUCTS: Array<Product> = [
  { id: 'platform', name: 'Platform', thumbnail: null },
  { id: 'engage', name: 'Engage', thumbnail: null },
  { id: 'comply', name: 'Comply', thumbnail: null },
  { id: 'client-a', name: 'Client A', thumbnail: null },
  { id: 'client-b', name: 'Client B', thumbnail: null },
]

// Schema for a product chapter page. Chapters are data; components/portfolio/products
// renders them, so a new chapter is a content module plus a thin page.

export interface Artifact {
  src: string
  alt: string
}

// The flipbook artifact frame is max-w-md. Dense screenshots need more room.
export type ArtifactWidth = 'md' | 'lg' | 'xl'

// `caption` is required on every slot: every artifact gets a caption is a template
// non-negotiable, enforced by the type rather than by review.
export type ArtifactSlot =
  | {
      kind: 'single'
      artifact: Artifact
      caption: string
      width?: ArtifactWidth
    }
  | {
      kind: 'pair'
      artifacts: [Artifact, Artifact]
      caption: string
      width?: ArtifactWidth
      // Side by side at md and wider by default; set when the two are too dense
      // to read at half width.
      stacked?: boolean
    }

export type BlockContent = { kind: 'prose'; text: string } | ArtifactSlot

export interface ChapterBlock {
  heading: string
  content: Array<BlockContent>
}

export interface ProductChapter {
  title: string
  subtitle?: string
  masthead: {
    specimen: string
    hypothesis: string
    provenance: string
    hero: ArtifactSlot
  }
  blocks: Array<ChapterBlock>
  fieldNote: string
}
