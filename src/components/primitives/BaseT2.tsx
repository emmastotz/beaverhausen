import { BodyT1 } from '@/components/primitives/BodyT1'
import { DisplayT1 } from '@/components/primitives/DisplayT1'

type Variant = 'display' | 'body'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: Variant
}

export function BaseT2({ children, className = '', variant = 'body' }: Props) {
  return variant === 'body' ? (
    <BodyT1 className={className}>{children}</BodyT1>
  ) : (
    <DisplayT1 className={className}>{children}</DisplayT1>
  )
}
