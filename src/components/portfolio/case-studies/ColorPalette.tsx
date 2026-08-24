import { BaseT6 } from '@/components/primitives/BaseT6'

type Color = {
  name: string
  bg: string
  ring?: boolean
}

type Props = {
  palette: Array<Color>
  isPrimary?: boolean
}

export function ColorPalette({ palette, isPrimary = true }: Props) {
  const gridClass = isPrimary
    ? 'grid grid-cols-2 gap-4 sm:grid-cols-4'
    : 'grid grid-cols-3 gap-4 sm:grid-cols-5'
  return (
    <div className={gridClass}>
      {palette.map(({ name, bg, ring }) => (
        <div key={name}>
          <div
            className={`${bg} aspect-square rounded-md shadow-sm ${
              ring ? 'ring-1 ring-beaver/20' : ''
            }`}
          />
          <p>
            <BaseT6 className="text-iron-orange uppercase">{name}</BaseT6>
          </p>
        </div>
      ))}
    </div>
  )
}
