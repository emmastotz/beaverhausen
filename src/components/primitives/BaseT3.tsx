type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT3: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-2xl font-medium tracking-normal antialiased sm:text-3xl ${className}`}
    >
      {children}
    </span>
  )
}
