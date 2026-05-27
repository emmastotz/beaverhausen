type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'text-beaver hover:text-beaver-dark',
  ghost: 'text-iron-orange hover:text-beaver',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[0.7rem] p-2',
  md: 'text-[0.8rem] p-3',
  lg: 'text-[0.85rem] p-[0.875rem]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <>
      <button
        className={[
          'relative inline-flex items-center justify-center',
          'bg-transparent border-0 cursor-pointer outline-none',
          'font-body tracking-[0.18em] uppercase transition-colors duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          "before:content-[''] before:absolute before:bottom-0 before:h-[2px] before:w-0 before:bg-iron-orange before:right-1/2",
          'before:[transition:width_0.4s_cubic-bezier(0.33,0,0.66,1)]',
          'hover:before:w-1/2 focus-visible:before:w-1/2 focus-visible:before:[transition:none]',
          "after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:w-0 after:bg-iron-orange after:left-1/2",
          'after:[transition:width_0.4s_cubic-bezier(0.33,0,0.66,1)]',
          'hover:after:w-1/2 focus-visible:after:w-1/2 focus-visible:after:[transition:none]',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
