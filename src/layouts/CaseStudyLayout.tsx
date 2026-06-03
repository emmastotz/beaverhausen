import { Header } from '@/components/Header'

type Props = {
  children: React.ReactNode
  className?: string
}

export function CaseStudyLayout({ children, className = '' }: Props) {
  return (
    <div className="relative bg-cream dark:bg-beaver-dark">
      <div className="bg-beaver-tail-grid pointer-events-none fixed inset-x-0 top-16 bottom-0" />

      <Header bgClass="bg-cream/50 dark:bg-beaver-dark/50" />

      <div className={`relative ${className}`}>{children}</div>
    </div>
  )
}
