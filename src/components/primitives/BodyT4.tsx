type Props = {
  children: React.ReactNode
  className?: string
}

export function BodyT4({ children, className = '' }: Props) {
  return (
    <span className={`font-body text-sm antialiased sm:text-base ${className}`}>
      {children}
    </span>
  )
}
