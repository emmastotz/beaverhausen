type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT1: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-base font-normal tracking-wide antialiased sm:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
