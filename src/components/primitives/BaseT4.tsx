type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT4: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-xl tracking-normal antialiased sm:text-2xl ${className}`}
    >
      {children}
    </span>
  )
}
