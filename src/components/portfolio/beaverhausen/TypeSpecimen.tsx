import { BaseT1 } from '../../primitives/BaseT1'
import { BaseT5 } from '../../primitives/BaseT5'
import { BaseT6 } from '../../primitives/BaseT6'

export function TypeSpecimen() {
  return (
    <div className="my-8">
      <div className="relative flex gap-6 py-8">
        {/* Spectrum */}

        <div className="absolute top-0 bottom-0 left-0">
          <div className="flex h-full flex-1 flex-col justify-between gap-1 sm:items-center">
            <BaseT6 className="text-beaver/40 uppercase">Playful</BaseT6>
            <div className="h-full border-l-2 border-iron-orange" />
            <BaseT6 className="text-beaver/40 uppercase">Precise</BaseT6>
          </div>
        </div>

        {/* Fonts */}
        <div className="relative ml-4 flex min-w-0 flex-col gap-6 sm:ml-12">
          {/* Magic Retro */}
          <div className="flex flex-col overflow-hidden">
            <BaseT6 className="text-beaver uppercase">Magic Retro</BaseT6>
            <BaseT1 className="truncate leading-snug text-beaver-dark">
              Beaverhausen
            </BaseT1>
          </div>

          {/* Fraunces */}
          <div className="flex flex-col">
            <BaseT6 className="text-beaver uppercase">Fraunces</BaseT6>
            <BaseT5
              variant="display"
              className="leading-relaxed tracking-tight text-beaver-dark"
            >
              The dwelling of an assiduous creature suspended somewhere between
              design instinct and engineering precision...
            </BaseT5>
          </div>

          {/* Spinnaker */}
          <div className="flex flex-col">
            <BaseT6 className="text-beaver uppercase">Spinnaker</BaseT6>
            <BaseT5 variant="body" className="tracking-tight text-beaver-dark">
              I care too much about the feel of interactions and have a hard
              time leaving details alone when they're not quite right.
            </BaseT5>
          </div>
        </div>
      </div>
    </div>
  )
}
