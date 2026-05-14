type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT5({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-base font-normal tracking-wide antialiased sm:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
