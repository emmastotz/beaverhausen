import beaverScene from '@/assets/landscape/portfolio/beaver-landmark-scene.svg'
import damScene from '@/assets/landscape/portfolio/dam-landmark-scene.svg'
import felledTreeScene from '@/assets/landscape/portfolio/felled-tree-landmark-scene.svg'
import { Wordmark } from '@/components/brand/Wordmark'
import { BeaverDamLandmark } from '@/components/portfolio/BeaverDamLandmark'
import { BeaverLandmark } from '@/components/portfolio/BeaverLandmark'
import { FelledTreeLandmark } from '@/components/portfolio/FelledTreeLandmark'

export interface HitArea {
  bottom: string
  left: string
  width: string
  height: string
}

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
    wordmark: <Wordmark className="mx-auto mb-4 sm:w-2/3 2xl:mb-7" />,
    title: 'Beaverhausen',
    description:
      'Brand identity, design system, and a portfolio of selected works. Built from scratch.',
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
    description:
      'Design system, rebrand, and enterprise cybersecurity platforms. Built and designed throughout.',
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
  {
    id: 'beaver',
    scene: beaverScene,
    landmark: <BeaverLandmark />,
    wordmark: null,
    title: 'RiskWise',
    description:
      'Enterprise risk assessment platform for an Australian cybersecurity firm.',
    role: 'Lead Engineer',
    href: '/portfolio/riskwise',
    available: false,
    hitArea: {
      bottom: '20%',
      left: '65%',
      width: '21%',
      height: '92%',
    },
  },
]
