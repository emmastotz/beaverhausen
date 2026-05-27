import { buildInteractiveClass, type Variant, type Size } from '@/components/primitives/interactiveStyles'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: Size
}

export function ExternalLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buildInteractiveClass(variant, size, className)}
      {...props}
    >
      {children}
    </a>
  )
}