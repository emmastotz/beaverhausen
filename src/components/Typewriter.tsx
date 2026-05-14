import { useTypewriter } from '../hooks/useTypewriter'

type Props = {
  text: string
  charSpeed?: number
  startDelay?: number
  onComplete?: () => void
  className?: string
  cursorClassName?: string
  renderText?: (displayed: string) => React.ReactNode
}

export const Typewriter: React.FC<Props> = ({
  text,
  charSpeed,
  startDelay,
  onComplete,
  className = '',
  cursorClassName = '',
  renderText,
}) => {
  const { displayed, isComplete } = useTypewriter({
    text,
    charSpeed,
    startDelay,
    onComplete,
  })

  return (
    <span className={className}>
      {renderText ? renderText(displayed) : displayed}
      {!isComplete && (
        <span
          className={`animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-iron-orange align-text-bottom ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
