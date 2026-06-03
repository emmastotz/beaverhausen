import { Header } from '@/components/Header'

type Props = {
  children: React.ReactNode
  className?: string
}

export function DefaultLayout({ children, className = '' }: Props) {
  return (
    <div className="relative bg-cream dark:bg-dusk">
      <div className="fixed inset-0">
        <div className="fixed inset-x-0 top-0 h-1/2 bg-linear-to-b from-water-dark from-8% via-15% to-transparent dark:from-transparent dark:from-12% dark:via-water-dark dark:via-50% dark:to-water" />
        <div className="fixed inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-iron-orange from-8% via-dawn via-20% to-transparent not-dark:to-75% dark:from-beaver-dark dark:from-5% dark:via-iron-orange dark:via-18% dark:to-water" />
      </div>

      <div className="bg-beaver-tail-grid pointer-events-none fixed top-16 right-0 bottom-0 left-0" />

      <Header />

      <div className={`relative ${className}`}>{children}</div>
    </div>
  )
}
