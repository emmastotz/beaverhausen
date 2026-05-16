type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT6({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-xs tracking-[0.18em] antialiased ${className}`}
    >
      {children}
    </span>
  )
}
