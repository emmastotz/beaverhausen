type Props = {
  children: React.ReactNode
  className?: string
}

export function BodyT3({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-base tracking-wide antialiased sm:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
