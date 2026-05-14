import { ScrollJackTypewriter } from './ScrollJackTypewriter'

const PROFESSIONAL_LINES: React.ReactNode[] = [
  'I am a designer and frontend engineer with roots in graphic design and over six years building production web applications.',
  'I think in systems and in pixels simultaneously, moving fluidly between brand identity and component architecture without losing the thread of either.',
  "I've led full rebrands, built design systems from scratch, and shipped enterprise-grade interfaces for clients who care about the details.",
  'I prototype in Figma and in code.',
  "I care too much about the feel of interactions and have a hard time leaving details alone when they're not quite right.",
  <em key="gnawing">Some might call it gnawing.</em>,
  "I work best in small, focused teams where craft is a baseline expectation, designers and engineers finish each other's sentences, and quality is understood to be a competitive advantage, not a nice-to-have.",
]

export function AboutMe() {
  return (
    <ScrollJackTypewriter
      lines={PROFESSIONAL_LINES}
      className="font-body text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.8] tracking-[0.02em] text-beaver-dark antialiased"
    />
  )
}
