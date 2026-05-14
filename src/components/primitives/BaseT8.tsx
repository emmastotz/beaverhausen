type Props = {
  children: React.ReactNode
  className?: string
}

export function BaseT8({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-xs/5 tracking-[0.18em] antialiased ${className}`}
    >
      {children}
    </span>
  )
}
