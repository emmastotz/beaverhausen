type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT1({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-base font-normal tracking-wide antialiased sm:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
