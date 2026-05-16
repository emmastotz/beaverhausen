import { BodyT2 } from './BodyT2'
import { DisplayT2 } from './DisplayT2'

type Variant = 'display' | 'body'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: Variant
}

export function BaseT3({ children, className = '', variant = 'body' }: Props) {
  return variant === 'body' ? (
    <BodyT2 className={className}>{children}</BodyT2>
  ) : (
    <DisplayT2 className={className}>{children}</DisplayT2>
  )
}
