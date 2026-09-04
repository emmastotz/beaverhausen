type Props = React.HTMLAttributes<HTMLDivElement>

export function BaseCard({ className, children, ...props }: Props) {
  return (
    <div
      className={`rounded-lg border border-beaver/10 bg-enamel/80 shadow-sm backdrop-blur-sm dark:bg-dusk/80${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
