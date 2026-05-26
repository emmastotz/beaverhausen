import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT2 } from '@/components/primitives/BaseT2'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { BaseT5 } from '@/components/primitives/BaseT5'
import { BaseT6 } from '@/components/primitives/BaseT6'

const SAMPLE = 'The quick brown fox jumps over the lazy dog'
const SAMPLE_HEADER = 'Beaverhausen'

type Row = { tag: string; node: React.ReactNode }

function TypeSection({
  component,
  meta,
  rows,
}: {
  component: string
  meta: string
  rows: Row[]
}) {
  return (
    <section className="border-t border-beaver pt-6">
      <div className="mb-5 flex items-baseline gap-3">
        <BaseT6 className="text-beaver-dark uppercase">{component}</BaseT6>
        <BaseT6 className="text-beaver opacity-60">{meta}</BaseT6>
      </div>
      <div className="flex flex-col gap-4">
        {rows.map(({ tag, node }) => (
          <div key={tag} className="flex flex-col gap-1">
            <BaseT6 className="text-beaver opacity-40">{tag}</BaseT6>
            {node}
          </div>
        ))}
      </div>
    </section>
  )
}

export function TypographySystem() {
  return (
    <div className="flex flex-col gap-10">
      <TypeSection
        component="BaseT1"
        meta="font-header · 4xl → 5xl · tracking-wide"
        rows={[
          {
            tag: 'default',
            node: <BaseT1 className="text-beaver-dark">{SAMPLE_HEADER}</BaseT1>,
          },
          {
            tag: 'italic',
            node: (
              <BaseT1 className="text-beaver-dark italic">
                {SAMPLE_HEADER}
              </BaseT1>
            ),
          },
        ]}
      />

      <TypeSection
        component="BaseT2"
        meta="xl → 2xl · font-semibold · tracking-wide"
        rows={[
          {
            tag: 'body — Spinnaker',
            node: (
              <BaseT2 variant="body" className="text-beaver-dark">
                {SAMPLE}
              </BaseT2>
            ),
          },
          {
            tag: 'display — Fraunces',
            node: (
              <BaseT2 variant="display" className="text-beaver-dark">
                {SAMPLE}
              </BaseT2>
            ),
          },
          {
            tag: 'display · italic',
            node: (
              <BaseT2 variant="display" className="text-beaver-dark italic">
                {SAMPLE}
              </BaseT2>
            ),
          },
        ]}
      />

      <TypeSection
        component="BaseT3"
        meta="lg → xl · font-medium · tracking-wide"
        rows={[
          {
            tag: 'body — Spinnaker',
            node: (
              <BaseT3 variant="body" className="text-beaver-dark">
                {SAMPLE}
              </BaseT3>
            ),
          },
          {
            tag: 'display — Fraunces',
            node: (
              <BaseT3 variant="display" className="text-beaver-dark">
                {SAMPLE}
              </BaseT3>
            ),
          },
          {
            tag: 'display · italic',
            node: (
              <BaseT3 variant="display" className="text-beaver-dark italic">
                {SAMPLE}
              </BaseT3>
            ),
          },
        ]}
      />

      <TypeSection
        component="BaseT4"
        meta="base → lg · tracking-wide"
        rows={[
          {
            tag: 'body — Spinnaker',
            node: (
              <BaseT4 variant="body" className="text-beaver-dark">
                {SAMPLE}
              </BaseT4>
            ),
          },
          {
            tag: 'display — Fraunces',
            node: (
              <BaseT4 variant="display" className="text-beaver-dark">
                {SAMPLE}
              </BaseT4>
            ),
          },
          {
            tag: 'display · italic',
            node: (
              <BaseT4 variant="display" className="text-beaver-dark italic">
                {SAMPLE}
              </BaseT4>
            ),
          },
        ]}
      />

      <TypeSection
        component="BaseT5"
        meta="sm → base · tracking-[0.18em]"
        rows={[
          {
            tag: 'body — Spinnaker',
            node: (
              <BaseT5 variant="body" className="text-beaver-dark">
                {SAMPLE}
              </BaseT5>
            ),
          },
          {
            tag: 'display — Fraunces',
            node: (
              <BaseT5 variant="display" className="text-beaver-dark">
                {SAMPLE}
              </BaseT5>
            ),
          },
          {
            tag: 'display · italic',
            node: (
              <BaseT5 variant="display" className="text-beaver-dark italic">
                {SAMPLE}
              </BaseT5>
            ),
          },
        ]}
      />

      <TypeSection
        component="BaseT6"
        meta="font-body · xs · tracking-[0.18em]"
        rows={[
          {
            tag: 'default — Spinnaker',
            node: <BaseT6 className="text-beaver-dark">{SAMPLE}</BaseT6>,
          },
        ]}
      />
    </div>
  )
}
