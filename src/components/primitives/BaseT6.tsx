type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT6({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-sm font-normal tracking-wide antialiased sm:text-base ${className}`}
    >
      {children}
    </span>
  )
}
