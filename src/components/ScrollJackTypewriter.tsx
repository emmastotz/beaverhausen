import { useScrollJack } from '../hooks/useScrollJack'
import { useTypewriter } from '../hooks/useTypewriter'

type Props = {
  lines: React.ReactNode[]
  className?: string
  windowsPerLine?: number
  charSpeed?: number
  showProgress?: boolean
  persistLast?: boolean
}

export function ScrollJackTypewriter({
  lines,
  className = '',
  windowsPerLine = 1,
  charSpeed = 18,
  showProgress = true,
  persistLast = false,
}: Props) {
  const { containerRef, activeIndex, scrollHeight, progress } = useScrollJack({
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

  const progressOpacity = Math.min(1, progress / 0.15)

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight }}
      className="relative w-full"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center">
        {showProgress && (
          <div
            className="mt-8 flex gap-1.5 transition-opacity duration-500"
            style={{ opacity: progressOpacity }}
          >
            {lines.map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-500"
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  backgroundColor:
                    i <= activeIndex
                      ? 'rgb(185,110,22)'
                      : 'rgba(120,97,77,0.3)',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl px-8 pb-36 text-center sm:pb-28 lg:px-0">
            {lines.map((line, i) => {
              const isActive = i === activeIndex
              const isPast = i < activeIndex
              const isLast = i === lines.length - 1
              const isString = typeof line === 'string'
              const shouldShow = isActive || (persistLast && isLast && isPast)

              const content = isActive && isString ? displayed : line

              return (
                <p
                  key={i}
                  className={`absolute inset-x-0 px-8 transition-all duration-700 ease-out ${className}`}
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
                  {content}
                  {isActive && isString && !isComplete && (
                    <span
                      className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-iron-orange align-text-bottom"
                      aria-hidden="true"
                    />
                  )}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
