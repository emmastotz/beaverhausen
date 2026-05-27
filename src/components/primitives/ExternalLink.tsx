interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function ExternalLink({ href, children, ...props }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
