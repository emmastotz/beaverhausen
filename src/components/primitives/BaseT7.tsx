type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT7({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-xs font-normal tracking-wide antialiased sm:text-sm ${className}`}
    >
      {children}
    </span>
  )
}
