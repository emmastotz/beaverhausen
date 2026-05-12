type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT1: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-4xl font-extrabold tracking-wide antialiased sm:text-5xl ${className}`}
    >
      {children}
    </span>
  )
}
