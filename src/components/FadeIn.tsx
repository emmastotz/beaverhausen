import { useFadeIn } from '@/hooks/useFadeIn'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className = '', delay = 0 }: Props) {
  const { ref } = useFadeIn({ delay })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
