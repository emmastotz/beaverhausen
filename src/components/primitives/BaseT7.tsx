type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT7: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-body text-xs font-normal tracking-wide antialiased sm:text-sm ${className}`}
    >
      {children}
    </span>
  )
}
