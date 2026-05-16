import { BodyT3 } from './BodyT3'
import { DisplayT3 } from './DisplayT3'

type Variant = 'display' | 'body'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: Variant
}

export function BaseT4({ children, className = '', variant = 'body' }: Props) {
  return variant === 'body' ? (
    <BodyT3 className={className}>{children}</BodyT3>
  ) : (
    <DisplayT3 className={className}>{children}</DisplayT3>
  )
}
