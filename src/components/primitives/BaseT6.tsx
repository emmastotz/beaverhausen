type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT6: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-body text-sm font-normal tracking-wide antialiased sm:text-base ${className}`}
    >
      {children}
    </span>
  )
}
