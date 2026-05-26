import { useEffect, useState } from 'react'

import { useScrollJack } from '../hooks/useScrollJack'
import { useTypewriter } from '../hooks/useTypewriter'
import { BaseT3 } from './primitives/BaseT3'

type LineProps = { variant?: 'display' | 'body'; className?: string }

export type ScrollSection = {
  lines: string[]
  variant?: 'display' | 'body'
  className?: string
  renderText?: (displayed: string, localIndex: number) => React.ReactNode
}

export function composeScrollSections(sections: ScrollSection[]): {
  lines: string[]
  sectionOffsets: number[]
  renderText: (displayed: string, globalIndex: number) => React.ReactNode
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
    renderText(displayed, globalIndex) {
      const { section, localIndex } = resolve(globalIndex)
      return section.renderText ? section.renderText(displayed, localIndex) : displayed
    },
    getLineProps(globalIndex) {
      const { section } = resolve(globalIndex)
      return {
        ...(section.variant !== undefined && { variant: section.variant }),
        ...(section.className !== undefined && { className: section.className }),
      }
    },
  }
}

type Props = {
  lines: React.ReactNode[]
  className?: string
  variant?: 'display' | 'body'
  windowsPerLine?: number
  charSpeed?: number
  persistLast?: boolean
  renderText?: (displayed: string, lineIndex: number) => React.ReactNode
  getLineProps?: (lineIndex: number) => LineProps
}

export function ScrollJackTypewriter({
  lines,
  className = '',
  variant = 'body',
  windowsPerLine = 1,
  charSpeed = 18,
  persistLast = false,
  renderText,
  getLineProps,
}: Props) {
  const { containerRef, pinnedRef, activeIndex } = useScrollJack({
    totalLines: lines.length,
    windowsPerLine,
    extraWindows: persistLast ? 1 : 0,
  })

  const activeLine = lines[activeIndex]
  const activeText = typeof activeLine === 'string' ? activeLine : ''

  const { displayed, isComplete } = useTypewriter({
    text: activeText,
    charSpeed,
    startDelay: 0,
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        ref={pinnedRef}
        className={`flex h-screen w-full items-center justify-center transition-opacity duration-75 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="relative w-full max-w-2xl px-8 pb-36 text-center sm:pb-28 lg:px-0">
          {lines.map((line, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex
            const isLast = i === lines.length - 1
            const isString = typeof line === 'string'
            const shouldShow = isActive || (persistLast && isLast && isPast)
            const content =
              isActive && isString
                ? renderText
                  ? renderText(displayed, i)
                  : displayed
                : line

            const perLine = getLineProps ? getLineProps(i) : {}
            const lineVariant = perLine.variant ?? variant
            const lineClassName = perLine.className ?? className

            return (
              <p
                key={i}
                className="absolute inset-x-0 px-8 text-pretty transition-all duration-700 ease-out"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transform: shouldShow
                    ? 'translateY(0)'
                    : isPast
                      ? 'translateY(-12px)'
                      : 'translateY(12px)',
                  pointerEvents: shouldShow ? 'auto' : 'none',
                  willChange: 'opacity, transform',
                }}
              >
                <BaseT3 className={lineClassName} variant={lineVariant}>
                  {content}
                  {isActive && isString && !isComplete && (
                    <span
                      className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-iron-orange align-text-bottom"
                      aria-hidden="true"
                    />
                  )}
                </BaseT3>
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}