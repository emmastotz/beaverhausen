import type { Variant, Size } from '@/components/primitives/interactiveStyles'

import { Button } from '@/components/primitives/Button'

interface Props {
  variant?: Variant
  size?: Size
}

const RESUME_URL = 'https://beaverhausen-worker.beaverhausen.workers.dev/resume'

export function DownloadResumeButton({ variant, size }: Props) {
  const handleDownload = async () => {
    const response = await fetch(RESUME_URL)
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
        handleDownload().catch(() => {
          window.open(RESUME_URL, '_blank', 'noopener')
        })
      }}
    >
      Download resume
    </Button>
  )
}
