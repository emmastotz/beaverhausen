type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT5: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-lg font-medium tracking-wide antialiased sm:text-xl ${className}`}
    >
      {children}
    </span>
  )
}
