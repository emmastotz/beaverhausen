import { BaseT5 } from '@/components/primitives/BaseT5'

export function FieldNote({ text }: { text: string }) {
  return (
    <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
      <p>
        <BaseT5
          variant="display"
          className="tracking-normal text-beaver italic"
        >
          <strong className="tracking-wide">Field note:</strong> {text}
        </BaseT5>
      </p>
    </div>
  )
}
