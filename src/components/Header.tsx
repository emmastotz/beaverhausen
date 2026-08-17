import { BeaverMark } from '@/components/brand/BeaverMark'
import { BriefcaseIcon } from '@/components/brand/icons/BriefcaseIcon'
import { EnvelopeIcon } from '@/components/brand/icons/EnvelopeIcon'
import { UserIcon } from '@/components/brand/icons/UserIcon'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { baseLinkClasses } from '@/components/primitives/interactiveStyles'
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
    href: '/contact',
    icon: <EnvelopeIcon className="size-5" />,
  },
]

const navLinkClass = [
  baseLinkClasses,
  'md:gap-1.5 no-underline p-3 md:p-0',
  'text-beaver-dark dark:text-iron-orange hover:text-iron-orange focus-visible:text-iron-orange dark:hover:text-cream dark:focus-visible:text-cream',
  '[--ub-offset:-0.8rem] lg:[--ub-offset:-1.375rem]',
].join(' ')

interface HeaderProps {
  bgClass?: string
}

export function Header({
  bgClass = 'bg-water-dark/55 dark:bg-dusk/55',
}: HeaderProps) {
  return (
    <header
      className={`z-header fixed inset-x-0 top-0 flex items-center justify-between border-b border-beaver/10 px-4 py-3 backdrop-blur ${bgClass}`}
    >
      <div className="flex items-center gap-x-3 md:gap-x-4">
        <TransitionLink
          to="/"
          className="pointer-events-auto rounded-full no-underline outline-none hover:ring-2 hover:ring-iron-orange/30 focus-visible:ring-2 focus-visible:ring-iron-orange dark:hover:ring-iron-orange/50"
          aria-label="Beaverhausen home"
        >
          <BeaverMark className="size-10" />
        </TransitionLink>
        <BaseT6 className="text-wrap text-beaver-dark uppercase dark:text-iron-orange">
          Emma Stotz
        </BaseT6>
      </div>

      <nav className="pointer-events-auto" aria-label="Main navigation">
        <ul className="flex list-none items-center gap-x-1 md:-mb-1.5 md:items-center md:gap-x-8">
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
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass}
                  aria-label={label}
                >
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
    </header>
  )
}
