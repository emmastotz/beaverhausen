import {
  useHeadingLevel,
  type HeadingLevel,
  HEADING_TAGS,
} from '@/hooks/useHeadingLevel'

type Props = {
  level?: HeadingLevel
  className?: string
  children: React.ReactNode
}

export const AutoH = ({ level, className, children }: Props) => {
  const contextLevel = useHeadingLevel()
  const Tag = HEADING_TAGS[level || contextLevel]

  return <Tag className={className}>{children}</Tag>
}
