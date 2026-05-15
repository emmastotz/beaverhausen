import { createPortal } from 'react-dom'
import { useLocation } from 'react-router'

import { BeaverMark } from './brand/BeaverMark'
import { BriefcaseIcon } from './brand/icons/BriefcaseIcon'
import { EnvelopeIcon } from './brand/icons/EnvelopeIcon'
import { UserIcon } from './brand/icons/UserIcon'
import { useTransition } from './transition/TransitionContext'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const HeaderStyles = () => (
  <style>{`
    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #78614d;
      text-decoration: none;
      position: relative;
    }

    .nav-link:hover {
      color: #3c3127;
    }

    .nav-link::before,
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      height: 2px;
      width: 0%;
      background: #b96e16;
      transition: width 0.4s cubic-bezier(0.33, 0, 0.66, 1);
    }

    .nav-link::before { right: 50%; }
    .nav-link::after  { left: 50%; }

    .nav-link:hover::before,
    .nav-link:hover::after { width: 50%; }

    .nav-link:focus-visible::before,
    .nav-link:focus-visible::after { width: 50%; transition: none; }
  `}</style>
)

export function Header() {
  const { pathname } = useLocation()
  const { transitionTo } = useTransition()

  const handleAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      e.preventDefault()
      transitionTo('/about')
    }
  }

  const navItems: NavItem[] = [
    {
      label: 'Work',
      href: '/portfolio',
      icon: <BriefcaseIcon className="size-5" />,
      onClick: (e) => {
        e.preventDefault()
        transitionTo('/portfolio')
      },
    },
    {
      label: 'About',
      href: '/about',
      icon: <UserIcon className="size-5" />,
      onClick: handleAbout,
    },
    {
      label: 'Contact',
      href: 'mailto:stotz.emma@gmail.com',
      icon: <EnvelopeIcon className="size-5" />,
      onClick: () => {},
    },
  ]

  return createPortal(
    <>
      <HeaderStyles />
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-8 py-4">
        {/* Beaver mark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            transitionTo('/')
          }}
          className="pointer-events-auto rounded-full outline-none hover:ring-2 hover:ring-iron-orange/30 hover:ring-offset-2"
          aria-label="Beaverhausen home"
        >
          <BeaverMark className="size-10" bgColor="#3c3127" bColor="#fff5e3" />
        </a>

        {/* Nav */}
        <nav className="pointer-events-auto" aria-label="Main navigation">
          <ul className="flex list-none items-center gap-6 md:gap-8">
            {navItems.map(({ label, href, icon, onClick }) => (
              <li key={label} className="group group-hover:text-beaver-dark">
                <a
                  href={href}
                  onClick={onClick}
                  className="nav-link"
                  aria-label={label}
                >
                  <span aria-hidden="true" className="inline-flex">
                    {icon}
                  </span>
                  <span className="hidden md:inline-flex">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>,
    document.body,
  )
}
