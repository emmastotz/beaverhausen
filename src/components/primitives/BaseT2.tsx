type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT2: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-sm font-normal tracking-[0.4em] tracking-wide antialiased sm:text-base ${className}`}
    >
      {children}
    </span>
  )
}
