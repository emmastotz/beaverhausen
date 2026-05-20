import damScene from '../../assets/landscape/portfolio/dam-landmark-scene.svg'
import felledTreeScene from '../../assets/landscape/portfolio/felled-tree-landmark-scene.svg'
import { Wordmark } from '../brand/Wordmark'
import { BeaverDamLandmark } from './BeaverDamLandmark'
import { FelledTreeLandmark } from './FelledTreeLandmark'

export interface HitArea {
  bottom: string
  left: string
  width: string
  height: string
}

// export const DEFAULT_HIT_AREA: HitArea = {
//   bottom: '92%',
//   left:   '42%',
//   width:  '16%',
//   height: '30%',
// }

export interface SceneConfig {
  id: string
  scene: string
  landmark: React.ReactNode
  wordmark: React.ReactNode | null
  title: string
  description: string
  role: string
  href: string
  available: boolean
  hitArea: HitArea
}

// ─── Scenes ───────────────────────────────────────────────────────────────────

export const SCENES: SceneConfig[] = [
  {
    id: 'dam',
    scene: damScene,
    landmark: <BeaverDamLandmark />,
    wordmark: <Wordmark className="mx-auto mb-4 w-2/3" />,
    title: 'Beaverhausen',
    description:
      'Brand identity, design system, and portfolio site. Built from scratch.',
    role: 'Designer & Engineer',
    href: '/portfolio/beaverhausen',
    available: true,
    hitArea: {
      bottom: '20%',
      left: '57%',
      width: '21%',
      height: '92%',
    },
  },
  {
    id: 'felled-tree',
    scene: felledTreeScene,
    landmark: <FelledTreeLandmark />,
    wordmark: null,
    title: 'WhiteHawk',
    description: 'Coming soon.',
    role: 'Designer & Engineer',
    href: '/portfolio/whitehawk',
    available: false,
    hitArea: {
      bottom: '2%',
      left: '15%',
      width: '22%',
      height: '92%',
    },
  },
]
