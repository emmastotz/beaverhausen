type Props = {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabel?: string
}

export function SectionLayout({
  children,
  className = '',
  id,
  ariaLabel,
}: Props) {
  return (
    <>
      <section
        id={id}
        aria-label={ariaLabel}
        className={`relative ${className}`}
      >
        {children}
      </section>
    </>
  )
}
