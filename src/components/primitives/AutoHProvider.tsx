// primitives/AutoHProvider.tsx
import {
  useHeadingLevel,
  HeadingLevelProvider,
  type HeadingLevel,
  isHeadingLevel,
} from '@/hooks/useHeadingLevel'

interface Props {
  level?: HeadingLevel
  children: React.ReactNode
}

export const AutoHProvider = ({ level, children }: Props) => {
  const parentLevel = useHeadingLevel()

  const raw =
    level !== undefined
      ? Math.min(Math.max(level, 1), 6)
      : Math.min(parentLevel + 1, 6)

  const nextLevel = isHeadingLevel(raw) ? raw : 1

  return (
    <HeadingLevelProvider value={nextLevel}>{children}</HeadingLevelProvider>
  )
}
