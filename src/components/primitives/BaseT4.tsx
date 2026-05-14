type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT4({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-xs/5 tracking-[0.18em] antialiased ${className}`}
    >
      {children}
    </span>
  )
}
