type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT2({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-sm font-normal tracking-[0.4em] tracking-wide antialiased sm:text-base ${className}`}
    >
      {children}
    </span>
  )
}
