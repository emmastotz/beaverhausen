import { useTypewriter } from '@/hooks/useTypewriter'
import { BaseT3 } from '@/components/primitives/BaseT3'

type Props = {
  text: string
  charSpeed?: number
  startDelay?: number
  onComplete?: () => void
  className?: string
  variant?: 'display' | 'body'
  cursorClassName?: string
  renderText?: (displayed: string) => React.ReactNode
}

export function Typewriter({
  text,
  charSpeed,
  startDelay,
  onComplete,
  className = '',
  variant = 'body',
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
    <p className="text-pretty">
      <BaseT3 className={className} variant={variant}>
        {renderText ? renderText(displayed) : displayed}
        {!isComplete && (
          <span
            className={`animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-iron-orange align-text-bottom ${cursorClassName}`}
            aria-hidden="true"
          />
        )}
      </BaseT3>
    </p>
  )
}
