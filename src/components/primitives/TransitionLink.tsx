import { useTransition } from '@/context/TransitionContext'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

export function TransitionLink({ to, children, ...props }: Props) {
  const { transitionTo } = useTransition()

  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        e.preventDefault()
        transitionTo(to)
        props.onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
