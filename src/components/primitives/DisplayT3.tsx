type Props = {
  children: React.ReactNode
  className?: string
}

export function DisplayT3({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-base tracking-wide antialiased md:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
