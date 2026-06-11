type Props = {
  children: React.ReactNode
  className?: string
}

export function DisplayT1({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-2xl font-medium tracking-wide antialiased sm:text-xl md:text-3xl ${className}`}
    >
      {children}
    </span>
  )
}
