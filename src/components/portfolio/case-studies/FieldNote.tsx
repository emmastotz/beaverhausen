import { BaseT5 } from '@/components/primitives/BaseT5'

export function FieldNote({
  text,
  className = 'text-beaver',
}: {
  text: string
  className?: string
}) {
  return (
    <div className="mt-2 mb-8 border-l-2 border-iron-orange pl-4">
      <p>
        <BaseT5
          variant="display"
          className={`tracking-normal italic ${className}`}
        >
          <strong className="tracking-wide">Field note:</strong> {text}
        </BaseT5>
      </p>
    </div>
  )
}
