import type { CaseStudy } from '@/content/case-studies'

import { Wordmark } from '@/components/brand/Wordmark'
import { BeaverDamLandmark } from '@/components/portfolio/BeaverDamLandmark'
import { BeaverLandmark } from '@/components/portfolio/BeaverLandmark'
import { FelledTreeLandmark } from '@/components/portfolio/FelledTreeLandmark'
import { CASE_STUDIES } from '@/content/case-studies'

export type { HitArea, CaseStudy } from '@/content/case-studies'

export interface SceneConfig extends CaseStudy {
  landmark: React.ReactNode
  wordmark: React.ReactNode | null
}

const LANDMARKS: Record<string, React.ReactNode> = {
  'dam': <BeaverDamLandmark />,
  'felled-tree': <FelledTreeLandmark />,
  'beaver': <BeaverLandmark />,
}

const WORDMARKS: Record<string, React.ReactNode> = {
  dam: (
    <Wordmark className="mx-auto sm:mb-2 sm:max-w-1/2 md:mb-0 md:max-w-2/3" />
  ),
}

export const SCENES: SceneConfig[] = CASE_STUDIES.map((data) => ({
  ...data,
  landmark: LANDMARKS[data.id],
  wordmark: WORDMARKS[data.id] ?? null,
}))
