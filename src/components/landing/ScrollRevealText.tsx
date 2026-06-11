import type { ReactNode } from 'react'

import '@/components/landing/scroll-reveal.css'

import { BaseT3 } from '@/components/primitives/BaseT3'

type LineVariant = 'display' | 'body'
export type LineProps = { variant?: LineVariant; className?: string }

export type ScrollSection = {
  lines: string[]
  variant?: 'display' | 'body'
  className?: string
  renderText?: (localIndex: number) => React.ReactNode
}

type Props = {
  lines: string[]
  className?: string
  variant?: LineVariant
  persistLast?: boolean
  renderText?: (lineIndex: number) => ReactNode
  getLineProps?: (lineIndex: number) => LineProps
}

export function composeScrollSections(sections: ScrollSection[]): {
  lines: string[]
  sectionOffsets: number[]
  renderText: (globalIndex: number) => React.ReactNode
  getLineProps: (globalIndex: number) => LineProps
} {
  const allLines: string[] = []
  const offsets: number[] = []

  for (const section of sections) {
    offsets.push(allLines.length)
    allLines.push(...section.lines)
  }

  function resolve(globalIndex: number) {
    const s = offsets.findLastIndex((o) => globalIndex >= o)
    return { section: sections[s], localIndex: globalIndex - offsets[s] }
  }

  return {
    lines: allLines,
    sectionOffsets: offsets,
    renderText(globalIndex) {
      const { section, localIndex } = resolve(globalIndex)
      return section.renderText
        ? section.renderText(localIndex)
        : allLines[globalIndex]
    },
    getLineProps(globalIndex) {
      const { section } = resolve(globalIndex)
      return {
        ...(section.variant !== undefined && { variant: section.variant }),
        ...(section.className !== undefined && {
          className: section.className,
        }),
      }
    },
  }
}

export function ScrollRevealText({
  lines,
  className = '',
  variant = 'body',
  persistLast = false,
  renderText,
  getLineProps,
}: Props) {
  return (
    <div className="relative w-full">
      {lines.map((line, i) => {
        const perLine = getLineProps?.(i) ?? {}
        const lineVariant = perLine.variant ?? variant
        const lineClassName = perLine.className ?? className
        const isLast = i === lines.length - 1
        const persists = persistLast && isLast
        const content = renderText ? renderText(i) : line

        return (
          <div
            key={i}
            className="flex h-screen w-full items-center justify-center"
          >
            <div className="mx-auto flex size-full max-w-2xl items-start justify-center text-center">
              <span
                className={`flex h-[48svh] items-end sm:h-[55svh] md:h-[40svh] ${persists ? 'reveal--persist' : 'reveal'}`}
              >
                <BaseT3 className={lineClassName} variant={lineVariant}>
                  {content}
                </BaseT3>
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
