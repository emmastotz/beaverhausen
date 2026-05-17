type Props = {
  children: React.ReactNode
  className?: string
}

export function DisplayT2({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-lg tracking-wide antialiased sm:text-xl ${className}`}
    >
      {children}
    </span>
  )
}
