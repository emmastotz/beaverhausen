import { createContext, useContext } from 'react'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const HEADING_TAGS: Record<HeadingLevel, HeadingTag> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

export const isHeadingLevel = (n: number): n is HeadingLevel => {
  return n >= 1 && n <= 6
}

const HeadingLevelContext = createContext<HeadingLevel>(1)

export const useHeadingLevel = () => useContext(HeadingLevelContext)
export const HeadingLevelProvider = HeadingLevelContext.Provider
