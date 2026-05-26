type Props = {
  children: React.ReactNode
  className?: string
  grid?: boolean
}

export function DefaultLayout({
  children,
  className = '',
  grid = true,
}: Props) {
  return (
    <div className="relative min-h-screen bg-cream">
      {grid && (
        <div
          className="pointer-events-none fixed top-16 right-0 bottom-0 left-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(120, 97, 77, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 97, 77, 0.08) 1px, transparent 1px)',
            backgroundSize: '160px 160px',
          }}
        />
      )}
      <div className={`relative ${className}`}>{children}</div>
    </div>
  )
}
