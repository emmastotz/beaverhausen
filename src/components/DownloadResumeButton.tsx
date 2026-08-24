import type { Variant, Size } from '@/components/primitives/interactiveStyles'

import { Button } from '@/components/primitives/Button'

interface Props {
  variant?: Variant
  size?: Size
}

export function DownloadResumeButton({ variant, size }: Props) {
  const handleDownload = async () => {
    const response = await fetch(
      'https://beaverhausen-worker.beaverhausen.workers.dev/resume',
    )
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Emma-Stotz-Resume-2026.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => {
        handleDownload().catch((error: unknown) => {
          console.error('Resume download failed', error)
        })
      }}
    >
      Download resume
    </Button>
  )
}
