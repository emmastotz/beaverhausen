export type Variant = 'primary' | 'ghost'
export type Size = 'sm' | 'md' | 'lg'

export const variantClasses: Record<Variant, string> = {
  primary: 'text-beaver hover:text-beaver-dark',
  ghost: 'text-iron-orange hover:text-beaver',
}

export const sizeClasses: Record<Size, string> = {
  sm: 'text-[0.7rem] p-2',
  md: 'text-[0.8rem] p-3',
  lg: 'text-[0.85rem] p-[0.875rem]',
}

export const baseInteractiveClasses = [
  'relative inline-flex items-center justify-center',
  'bg-transparent cursor-pointer outline-none',
  'font-body tracking-[0.18em] uppercase transition-colors duration-200',
  'underline-build',
].join(' ')

export function buildInteractiveClass(
  variant: Variant,
  size: Size,
  className = '',
) {
  return [baseInteractiveClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')
}