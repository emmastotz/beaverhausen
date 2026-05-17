import { useEffect, useRef, useState } from 'react'

import { useScrollJack } from '../hooks/useScrollJack'
import { useTypewriter } from '../hooks/useTypewriter'
import { BaseT3 } from './primitives/BaseT3'

type Props = {
  lines: React.ReactNode[]
  className?: string
  variant?: 'display' | 'body'
  windowsPerLine?: number
  charSpeed?: number
  persistLast?: boolean
  renderText?: (displayed: string, lineIndex: number) => React.ReactNode
}

export function ScrollJackTypewriter({
  lines,
  className = '',
  variant = 'body',
  windowsPerLine = 1,
  charSpeed = 18,
  persistLast = false,
  renderText,
}: Props) {
  const { containerRef, activeIndex, scrollHeight } = useScrollJack({
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

  const isLockedRef = useRef(false)

  const lock = () => {
    isLockedRef.current = true
  }
  const unlock = () => {
    isLockedRef.current = false
  }

  useEffect(() => {
    if (isComplete) {
      unlock()
    } else {
      lock()
    }
  }, [isComplete])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLockedRef.current && e.deltaY > 0) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current) {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        isLockedRef.current = false
      }
    }

    const handleFocus = () => {
      isLockedRef.current = false
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight }}
      className="relative w-full"
    >
      <div
        className="sticky top-0 flex h-screen w-full items-center justify-center"
        style={{ opacity: mounted ? 1 : 0 }}
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
                ? (renderText ? renderText(displayed, i) : displayed)
                : line

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
                <BaseT3 className={className} variant={variant}>
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
