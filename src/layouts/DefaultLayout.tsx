type StyleProps = {
  grid: boolean
}

type Props = {
  children: React.ReactNode
  className?: string
  grid?: boolean
}

const PageStyles = ({ grid }: StyleProps) => (
  <style>{`
    ${
      grid
        ? `
    .page::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(120, 97, 77, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(120, 97, 77, 0.08) 1px, transparent 1px);
      background-size: 160px 160px;
      pointer-events: none;
    }
    `
        : ''
    }
  `}</style>
)

export function DefaultLayout({
  children,
  className = '',
  grid = true,
}: Props) {
  return (
    <>
      <PageStyles grid={grid} />

      <div className={`page relative min-h-screen bg-cream ${className}`}>
        {children}
      </div>
    </>
  )
}
