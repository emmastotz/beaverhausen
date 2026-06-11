type Props = {
  children: React.ReactNode
  className?: string
}

export function DisplayT4({ children, className = '' }: Props) {
  return (
    <span
      className={`font-display text-sm tracking-[0.18em] antialiased md:text-base ${className}`}
    >
      {children}
    </span>
  )
}
