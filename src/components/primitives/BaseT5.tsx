import { BodyT4 } from '@/components/primitives/BodyT4'
import { DisplayT4 } from '@/components/primitives/DisplayT4'

type Variant = 'display' | 'body'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: Variant
}

export function BaseT5({ children, className = '', variant = 'body' }: Props) {
  return variant === 'body' ? (
    <BodyT4 className={className}>{children}</BodyT4>
  ) : (
    <DisplayT4 className={className}>{children}</DisplayT4>
  )
}
