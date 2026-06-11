type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT1({ children, className = '' }: Props) {
  return (
    <span
      className={`font-header text-4xl font-normal tracking-wide antialiased sm:text-3xl md:text-5xl ${className}`}
    >
      {children}
    </span>
  )
}
