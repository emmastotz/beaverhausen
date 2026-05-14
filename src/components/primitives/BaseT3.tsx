type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT3({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-xs font-normal tracking-wide antialiased sm:text-sm ${className}`}
    >
      {children}
    </span>
  )
}
