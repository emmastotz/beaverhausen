import { TransitionLink } from '@/components/primitives/TransitionLink'
import { buildInteractiveClass, type Variant, type Size } from '@/components/primitives/interactiveStyles'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  variant?: Variant
  size?: Size
}

export function AppLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: Props) {
  return (
    <TransitionLink to={to} className={buildInteractiveClass(variant, size, className)} {...props}>
      {children}
    </TransitionLink>
  )
}