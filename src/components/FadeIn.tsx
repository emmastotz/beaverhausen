import { useFadeIn } from '@/hooks/useFadeIn'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function FadeIn({ children, className = '', delay = 0 }: Props) {
  const { ref, isVisible } = useFadeIn()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
