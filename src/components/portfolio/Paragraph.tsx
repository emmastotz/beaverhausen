import { BaseT4 } from '@/components/primitives/BaseT4'

// Renders a paragraph string, converting *word* markers to <em>.
export function Paragraph({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/)
  const content =
    parts.length === 1
      ? text
      : parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))
  return (
    <p>
      <BaseT4 className="text-beaver">{content}</BaseT4>
    </p>
  )
}
