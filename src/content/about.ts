export const PROFILE =
  "I'm a designer and frontend engineer with roots in graphic design and over six years building production web applications in cybersecurity and enterprise SaaS. I design and I build, no handoff required. I've led a company-wide rebrand from identity through component library, defined the token and type systems underneath it, and shipped the enterprise interfaces those systems govern. I move between brand identity and component architecture without losing the thread of either. I'm interested in building things that outlast the brief."

export interface Skill {
  label: string
  tier: 'primary' | 'secondary' | 'accent'
}

export const SKILLS: Array<Skill> = [
  { label: 'Vue 3', tier: 'primary' },
  { label: 'TypeScript', tier: 'primary' },
  { label: 'Vite', tier: 'primary' },
  { label: 'Tailwind CSS', tier: 'primary' },
  { label: 'React', tier: 'primary' },
  { label: 'TanStack', tier: 'primary' },
  { label: 'Turborepo / Monorepos', tier: 'secondary' },
  { label: 'Astro', tier: 'secondary' },
  { label: 'REST & gRPC APIs', tier: 'secondary' },
  { label: 'HTML5 / CSS3', tier: 'secondary' },
  { label: 'Node.js', tier: 'secondary' },
  { label: 'Git / GitHub', tier: 'secondary' },
  { label: 'Responsive Web Design', tier: 'secondary' },
  { label: 'Design Systems', tier: 'accent' },
  { label: 'UI/UX Design', tier: 'accent' },
  { label: 'WCAG / Web Accessibility', tier: 'accent' },
  { label: 'Figma', tier: 'accent' },
  { label: 'Adobe Creative Suite', tier: 'accent' },
]

export interface Role {
  title: string
  dates: string
  bullets: Array<string>
}

export interface Job {
  company: string
  location: string
  dates: string
  roles: Array<Role>
}

export const EXPERIENCE: Array<Job> = [
  {
    company: 'WhiteHawk CEC Inc.',
    location: 'Alexandria, VA (Remote)',
    dates: 'Jan 2020 – Present',
    roles: [
      {
        title: 'Senior Frontend Engineer & Product Designer',
        dates: 'Mar 2024 – Present',
        bullets: [
          'Led a company-wide rebrand from an existing but unsystematized identity: defined a seven-token color system with assigned roles, reworked the type system to separate sizing from semantic markup, and built a component library shipped across whitehawk.com, product interfaces, and marketing collateral.',
          'Wrote the partner-facing brand guidelines governing logo use, clear space, minimum sizes, and approved messaging, extending the system beyond internal surfaces to external partners.',
          'Led a team of three engineers as technical lead across two enterprise platforms, owning architecture decisions, code review, and delivery alongside sprint planning, client communication, and technical specifications.',
          'Led frontend architecture and design on a cyber risk assessment platform for an Australian enterprise client: a 42-question assessment flow with auto-save state management, progress dashboards, tiered reporting, and separate admin and client portal architectures.',
          'Led frontend engineering on a third-party vendor risk management platform for a major enterprise client, using Vue 3, TypeScript, Vite, and Tailwind with Protobuf handling the frontend-backend contract.',
        ],
      },
      {
        title: 'Frontend Engineer',
        dates: 'Jan 2020 – Mar 2024',
        bullets: [
          'Rebuilt whitehawk.com twice as primary frontend engineer: PHP to Vue 2, then a full migration to Vue 3 with TypeScript.',
          'Split a single codebase into a Turborepo monorepo separating the marketing site, client portal, and admin portal, establishing a security boundary that did not previously exist.',
          'Owned the frontend codebase across the public website and multiple client platforms, from architecture decisions through delivery.',
          'Built accessible components to WCAG standards, including ARIA attributes and screen reader support.',
        ],
      },
    ],
  },
  {
    company: 'Southwest Spirits & Wine',
    location: 'Dallas, TX (Remote, Contract)',
    dates: 'May 2019 – Feb 2020',
    roles: [
      {
        title: 'Graphic Designer',
        dates: 'May 2019 – Feb 2020',
        bullets: [],
      },
    ],
  },
  {
    company: 'Virginia Distillery Company',
    location: 'Lovingston, VA (Hybrid)',
    dates: 'Sep 2016 – Sep 2019',
    roles: [
      {
        title: 'Creative & Brand Associate',
        dates: 'Sep 2016 – Sep 2019',
        bullets: [
          'Collaborated directly with a brand agency on the development of the Courage & Conviction brand identity, working alongside their creative team on assets, brand storytelling, and visual consistency.',
          'Designed derivative product labels for single cask and alternative whisky expressions, plus accompanying print and digital assets, maintaining cohesion with the established Virginia-Highland Whisky visual identity.',
          'Served as in-house photographer and videographer for the Virginia-Highland Whisky line, producing content for both marketing materials and social media as part of a larger, deliberate creative direction.',
          'Coordinated with external partners including professional photographers, agency creatives, and a PR firm, managing asset development and creative alignment across multiple stakeholders.',
        ],
      },
    ],
  },
]

export interface EduItem {
  school: string
  degree: string
  note?: string
  year: string
}

export const EDUCATION: Array<EduItem> = [
  {
    school: 'George Washington University',
    degree: 'Full Stack Web Development Certificate',
    note: 'Arlington, VA',
    year: 'Dec 2019',
  },
  {
    school: 'University of Mary Washington',
    degree: 'Bachelor of Arts in Linguistics',
    note: "Fredericksburg, VA · Magna Cum Laude · Dean's List 2009–2013 · Capstone: Computational Linguistics",
    year: 'May 2013',
  },
]
