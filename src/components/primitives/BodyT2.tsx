type Props = {
  children: React.ReactNode
  className?: string
}

export function BodyT2({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-lg font-medium tracking-wide antialiased sm:text-xl ${className}`}
    >
      {children}
    </span>
  )
}
