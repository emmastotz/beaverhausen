import { createPortal } from 'react-dom'
import { useLocation } from 'react-router'

import { BeaverMark } from './brand/BeaverMark'
import { useTransition } from './transition/TransitionContext'

interface NavItem {
  label: string
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

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
      onClick: (e) => {
        e.preventDefault()
        transitionTo('/portfolio')
      },
    },
    {
      label: 'About',
      href: '/about',
      onClick: handleAbout,
    },
    {
      label: 'Contact',
      href: 'mailto:stotz.emma@gmail.com',
    },
  ]

  return createPortal(
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-8 py-6">
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
        <ul className="m-0 flex list-none items-center gap-8 p-0">
          {navItems.map(({ label, href, onClick }) => (
            <li key={label}>
              <a
                href={href}
                onClick={onClick}
                className="font-body text-xs tracking-[0.2em] text-beaver uppercase no-underline hover:text-beaver-dark"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>,
    document.body,
  )
}
