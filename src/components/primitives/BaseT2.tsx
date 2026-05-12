type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT2: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-3xl font-bold tracking-wide antialiased sm:text-4xl ${className}`}
    >
      {children}
    </span>
  )
}
