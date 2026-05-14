type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT5: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-body text-base font-normal tracking-wide antialiased sm:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
