import BeaverCopyBackgroundSvg from '@/assets/landing/beaver-copy-background.svg?react'

type Props = { className?: string }

export function BeaverCopyBackground({ className }: Props) {
  return (
    <BeaverCopyBackgroundSvg
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    />
  )
}
