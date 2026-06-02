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
  "before:content-[''] before:absolute before:bottom-0 before:h-[2px] before:w-0 before:bg-iron-orange before:right-1/2",
  'before:[transition:width_var(--duration-interaction)_var(--ease-out-cubic)] hover:before:w-1/2 focus-visible:before:w-1/2 focus-visible:before:[transition:none]',
  "after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:w-0 after:bg-iron-orange after:left-1/2",
  'after:[transition:width_var(--duration-interaction)_var(--ease-out-cubic)] hover:after:w-1/2 focus-visible:after:w-1/2 focus-visible:after:[transition:none]',
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