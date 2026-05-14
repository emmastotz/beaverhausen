type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT4: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-display text-xs/5 tracking-[0.18em] antialiased ${className}`}
    >
      {children}
    </span>
  )
}
