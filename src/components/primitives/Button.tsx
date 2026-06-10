import {
  type Variant,
  type Size,
  buildInteractiveClass,
} from '@/components/primitives/interactiveStyles'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <button
      className={buildInteractiveClass(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  )
}
