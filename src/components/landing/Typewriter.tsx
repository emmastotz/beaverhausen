import { useTypewriter } from '@/hooks/useTypewriter'

type Props = {
  text: string
  charSpeed?: number
  startDelay?: number
  onComplete?: () => void
  className?: string
  cursorClassName?: string
  renderText?: (displayed: string) => React.ReactNode
}

export function Typewriter({
  text,
  charSpeed,
  startDelay,
  onComplete,
  className = '',
  cursorClassName = '',
  renderText,
}: Props) {
  const { displayed, isComplete } = useTypewriter({
    text,
    charSpeed,
    startDelay,
    onComplete,
  })

  return (
    <p
      className={`text-pretty ${className} font-display text-lg/none tracking-wide antialiased sm:text-xl/none`}
    >
      {renderText ? renderText(displayed) : displayed}
      {!isComplete && (
        <span
          className={`animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-iron-orange align-text-bottom ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </p>
  )
}
