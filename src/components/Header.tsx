import { createPortal } from 'react-dom'

import { BeaverMark } from '@/components/brand/BeaverMark'
import { BriefcaseIcon } from '@/components/brand/icons/BriefcaseIcon'
import { EnvelopeIcon } from '@/components/brand/icons/EnvelopeIcon'
import { UserIcon } from '@/components/brand/icons/UserIcon'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { TransitionLink } from '@/components/primitives/TransitionLink'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Work',
    href: '/portfolio',
    icon: <BriefcaseIcon className="size-5" />,
  },
  { label: 'About', href: '/about', icon: <UserIcon className="size-5" /> },
  {
    label: 'Contact',
    href: 'mailto:stotz.emma@gmail.com',
    icon: <EnvelopeIcon className="size-5" />,
  },
]

const navLinkClass = [
  'relative inline-flex items-center md:gap-1.5 text-beaver no-underline hover:text-beaver-dark p-3 md:p-0 outline-none',
  '[--ub-offset:-0.75rem] md:[--ub-offset:-1.375rem]',
  'underline-build',
].join(' ')

export function Header() {
  return createPortal(
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex h-auto items-center justify-between border-b border-beaver/10 bg-cream px-4 py-3">
      <div className="flex items-center gap-3 md:gap-4">
        <TransitionLink
          to="/"
          className="pointer-events-auto rounded-full no-underline outline-none hover:ring-2 hover:ring-iron-orange/30 hover:ring-offset-2 focus-visible:ring-2 focus-visible:ring-iron-orange focus-visible:ring-offset-2"
          aria-label="Beaverhausen home"
        >
          <BeaverMark className="size-10" />
        </TransitionLink>
        <BaseT6 className="text-wrap text-beaver uppercase">Emma Stotz</BaseT6>
      </div>

      <nav className="pointer-events-auto" aria-label="Main navigation">
        <ul className="flex list-none items-center gap-1 md:-mb-1.5 md:gap-8">
          {navItems.map(({ label, href, icon }) => (
            <li key={label}>
              {href.startsWith('/') ? (
                <TransitionLink
                  to={href}
                  className={navLinkClass}
                  aria-label={label}
                >
                  <span aria-hidden="true" className="inline-flex">
                    {icon}
                  </span>
                  <BaseT6 className="hidden uppercase md:inline-flex">
                    {label}
                  </BaseT6>
                </TransitionLink>
              ) : (
                <a href={href} className={navLinkClass} aria-label={label}>
                  <span aria-hidden="true" className="inline-flex">
                    {icon}
                  </span>
                  <BaseT6 className="hidden uppercase md:inline-flex">
                    {label}
                  </BaseT6>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>,
    document.body,
  )
}
