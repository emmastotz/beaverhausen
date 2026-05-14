import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type StyleProps = {
  grid: boolean
  vignette: boolean
}

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabel?: string
  grid?: boolean
  vignette?: boolean
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SectionStyles = ({ grid, vignette }: StyleProps) => (
  <style>{`
    .page-section {
      isolation: isolate;
    }

    ${
      grid
        ? `
    .page-section::before {
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

    ${
      vignette
        ? `
    .page-section::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 100% 100% at 50% 50%,
        transparent 40%,
        rgba(255, 245, 227, 0.8) 100%
      );
      pointer-events: none;
    }
    `
        : ''
    }
  `}</style>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const SectionLayout: React.FC<Props> = ({
  children,
  className = '',
  id,
  ariaLabel,
  grid = true,
  vignette = true,
}) => {
  return (
    <>
      <SectionStyles grid={grid} vignette={vignette} />
      <section
        id={id}
        aria-label={ariaLabel}
        className={`page-section relative bg-cream ${className}`}
      >
        {children}
      </section>
    </>
  )
}
