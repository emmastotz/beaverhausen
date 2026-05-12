type Props = {
  children: React.ReactNode
  className?: string
}

export const BaseT8: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-body text-xs/5 tracking-[0.18em] antialiased ${className}`}
    >
      {children}
    </span>
  )
}
