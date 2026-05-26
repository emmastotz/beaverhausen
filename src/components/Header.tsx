import { createPortal } from 'react-dom'

import { BeaverMark } from './brand/BeaverMark'
import { BriefcaseIcon } from './brand/icons/BriefcaseIcon'
import { EnvelopeIcon } from './brand/icons/EnvelopeIcon'
import { UserIcon } from './brand/icons/UserIcon'
import { BaseT6 } from './primitives/BaseT6'
import { useTransition } from './transition/TransitionContext'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const HeaderStyles = () => (
  <style>{`
    .nav-link::before,
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -20px;
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
  const { transitionTo } = useTransition()

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
      onClick: (e) => {
        e.preventDefault()
        transitionTo('/about')
      },
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

      <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex h-auto items-center justify-between border-b border-beaver/10 bg-cream px-4 py-3">
        <div className="flex items-center gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              transitionTo('/')
            }}
            className="pointer-events-auto rounded-full no-underline outline-none hover:ring-2 hover:ring-iron-orange/30 hover:ring-offset-2"
            aria-label="Beaverhausen home"
          >
            <BeaverMark className="size-10" />
          </a>
          <BaseT6 className="text-wrap text-beaver uppercase">
            Emma Stotz
          </BaseT6>
        </div>

        <nav className="pointer-events-auto" aria-label="Main navigation">
          <ul className="-mb-3 flex list-none items-center gap-6 md:gap-8">
            {navItems.map(({ label, href, icon, onClick }) => (
              <li key={label} className="">
                <a
                  href={href}
                  onClick={onClick}
                  className="nav-link group relative inline-flex items-center gap-1.5 text-beaver no-underline hover:text-beaver-dark"
                  aria-label={label}
                >
                  <span aria-hidden="true" className="inline-flex">
                    {icon}
                  </span>
                  <BaseT6 className="hidden uppercase md:inline-flex">
                    {label}
                  </BaseT6>
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
