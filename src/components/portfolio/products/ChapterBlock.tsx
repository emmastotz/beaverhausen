import type { ChapterBlock as Block } from '@/content/products'

import { Paragraph } from '@/components/portfolio/case-studies/Paragraph'
import { ChapterArtifact } from '@/components/portfolio/products/ChapterArtifact'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT2 } from '@/components/primitives/BaseT2'

export function ChapterBlock({ block }: { block: Block }) {
  return (
    <section className="flex flex-col space-y-6">
      <div className="mx-auto w-full max-w-3xl">
        <AutoH>
          <BaseT2 className="text-beaver-dark antialiased dark:text-iron-orange">
            {block.heading}
          </BaseT2>
        </AutoH>
      </div>

      {block.content.map((item, i) =>
        item.kind === 'prose' ? (
          <div key={i} className="mx-auto w-full max-w-3xl">
            <Paragraph
              text={item.text}
              className="text-beaver dark:text-enamel"
            />
          </div>
        ) : (
          <ChapterArtifact key={i} slot={item} />
        ),
      )}
    </section>
  )
}
