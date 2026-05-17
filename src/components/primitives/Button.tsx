type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const ButtonStyles = () => (
  <style>{`
    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      font-family: var(--font-body);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #3c3127;
      transition: color 200ms ease;
    }

    .btn::before,
    .btn::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 2px;
      width: 0%;
      background: #b96e16;
      transition: width 0.4s cubic-bezier(0.33, 0, 0.66, 1);
    }

    .btn::before {
      right: 50%;
    }

    .btn::after {
      left: 50%;
    }

    .btn:hover::before,
    .btn:hover::after {
      width: 50%;
    }

    .btn:focus-visible::before,
    .btn:focus-visible::after {
      width: 50%;
      transition: none;
    }

    .btn:focus-visible {
      outline: none;
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .btn--primary {
      color: #78614d;
      transition: color 200ms ease;
    }

    .btn--primary:hover {
      color: #3c3127;
    }

    .btn--ghost {
      color: #b96e16;
      transition: color 200ms ease;
    }

    .btn--ghost:hover {
      color: #78614d;
    }

    .btn--sm { font-size: 0.7rem; padding: 0.5rem; }
    .btn--md { font-size: 0.8rem; padding: 0.75rem; }
    .btn--lg { font-size: 0.85rem; padding: 0.875rem; }

  `}</style>
)

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <>
      <ButtonStyles />
      <button
        className={`btn btn--${variant} btn--${size} ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
