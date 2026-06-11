type Props = {
  children: React.ReactNode
  className?: string
}

export function BodyT3({ children, className = '' }: Props) {
  return (
    <span
      className={`font-body text-base tracking-wide antialiased md:text-lg ${className}`}
    >
      {children}
    </span>
  )
}
