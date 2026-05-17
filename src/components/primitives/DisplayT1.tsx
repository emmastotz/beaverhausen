type Props = {
  children: React.ReactNode
  className?: string
}

export function DisplayT1({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-xl font-medium tracking-wide antialiased sm:text-2xl ${className}`}
    >
      {children}
    </span>
  )
}
