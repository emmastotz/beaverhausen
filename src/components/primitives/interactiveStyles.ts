export type Variant = 'primary' | 'ghost'
export type Size = 'sm' | 'md' | 'lg'

export const variantClasses: Record<Variant, string> = {
  primary:
    'text-beaver hover:text-beaver-dark dark:text-beaver-dark dark:hover:text-beaver',
  ghost:
    'text-iron-orange hover:text-beaver dark:text-enamel dark:hover:text-cream',
}

export const sizeClasses: Record<Size, string> = {
  sm: 'text-[0.675rem] md:text-[0.75rem] pb-1 md:pb-2',
  md: 'text-[0.8rem] md:text-[0.875rem] pb-2 md:pb-3',
  lg: 'text-[0.925rem] md:text-[1rem] pb-[0.875rem]',
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
  return [
    baseInteractiveClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}
