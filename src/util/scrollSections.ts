type LineVariant = 'display' | 'body'
export type LineProps = { variant?: LineVariant; className?: string }

export type ScrollSection = {
  lines: Array<string>
  variant?: 'display' | 'body'
  className?: string
  renderText?: (localIndex: number) => React.ReactNode
}

export function composeScrollSections(sections: Array<ScrollSection>): {
  lines: Array<string>
  sectionOffsets: Array<number>
  renderText: (globalIndex: number) => React.ReactNode
  getLineProps: (globalIndex: number) => LineProps
} {
  const allLines: Array<string> = []
  const offsets: Array<number> = []

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
