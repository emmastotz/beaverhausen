import beaverScene from '@/assets/portfolio/beaver-landmark-scene.svg'
import damScene from '@/assets/portfolio/dam-landmark-scene.svg'
import felledTreeScene from '@/assets/portfolio/felled-tree-landmark-scene.svg'

export interface HitArea {
  bottom: string
  left: string
  width: string
  height: string
}

export interface CaseStudy {
  id: string
  scene: string
  title: string
  description: string
  role: string
  href: string
  available: boolean
  hitArea: HitArea
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'dam',
    scene: damScene,
    title: 'Beaverhausen',
    description:
      'Brand identity, design system, and a portfolio of selected works. Built from scratch.',
    role: 'Designer & Engineer',
    href: '/portfolio/beaverhausen',
    available: true,
    hitArea: { bottom: '20%', left: '57%', width: '21%', height: '92%' },
  },
  {
    id: 'felled-tree',
    scene: felledTreeScene,
    title: 'WhiteHawk',
    description:
      'Design system, rebrand, and enterprise cybersecurity platforms. Built and designed throughout.',
    role: 'Designer & Engineer',
    href: '/portfolio/whitehawk',
    available: true,
    hitArea: { bottom: '2%', left: '15%', width: '22%', height: '92%' },
  },
  {
    id: 'beaver',
    scene: beaverScene,
    title: '?',
    description:
      'Enterprise risk assessment platform for an Australian cybersecurity firm.',
    role: 'Lead Engineer',
    href: '/portfolio/riskwise',
    available: false,
    hitArea: { bottom: '10%', left: '67%', width: '16%', height: '70%' },
  },
]
