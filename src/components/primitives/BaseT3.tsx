type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT3: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-xs font-normal tracking-wide antialiased sm:text-sm ${className}`}
    >
      {children}
    </span>
  )
}
