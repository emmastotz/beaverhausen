import type { ProductChapter } from '@/content/products'

import frameworks2AuE8 from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_2_au-e8.png'
import frameworks2Cmmc from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_2_cmmc.png'
import frameworks3 from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_3.png'
import frameworks4AuE8 from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_4_au-e8.png'
import frameworks4Cmmc from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_4_cmmc.png'
import frameworksHero from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_hero.png'

export const COMPLIANCE_FRAMEWORKS: ProductChapter = {
  title: 'Compliance Frameworks',
  subtitle: 'Shared Language, Different Rules',

  masthead: {
    specimen:
      'Compliance standards are useful only if someone can understand what they require. The person using the WhiteHawk platform may not. So we turned CMMC and Australian Essential 8 into guided assessments: plain-language instructions first, examples and common mistakes next, then the technical requirements and a place to record what the company can actually prove.',

    hypothesis:
      'Consistency belongs in the interaction, not the model. A user should not have to relearn how to move through a framework, record a result, or find what comes next. But CMMC should still behave like CMMC, and Essential 8 should still behave like Essential 8. Flattening those differences makes the code reusable by making the standard harder to explain. The first version of this product proved it: one flat model rendered any of sixteen frameworks through a single code path, adding one cost eight lines, and a control arrived as a vendor description and a progress slider with nothing to explain it.',

    provenance:
      'The first version was mine too. I built the flat model in 2021, and watching Essential 8 get added to it in 2025 is what convinced me the model, not the addition, was the problem. For the second version I worked with our product manager, a former cyber analyst, to turn the standards into something a business owner could actually work through. He developed the plain-language guidance; I designed the information hierarchy and the way that guidance met the underlying standard in the interface, then carried that structure through the frontend, first for CMMC and then for Essential 8. The remaining frameworks are planned; another engineer will carry the system forward.',

    heroBelow: true,

    hero: {
      kind: 'single',
      artifact: {
        src: frameworksHero,
        alt: 'CMMC All Practices view: filter chips, stat tiles, compliance bar, practice rail, and a plain-language callout',
      },
      caption:
        'Plain language, then examples, then the standard. The order is the design.',
      width: 'lg',
    },
  },

  blocks: [
    {
      heading: 'Field Guide',
      content: [
        {
          kind: 'prose',
          text: 'The two frameworks use the same interaction vocabulary without sharing a framework model. Navigation lives in the URL. Forms edit an immutable local copy of the assessment through the same composables. The same cards, inputs, status treatments, loading states, and typography recur across both.',
        },
        {
          kind: 'pair',
          stacked: true,
          artifacts: [
            {
              src: frameworks2Cmmc,
              width: 'lg',
              alt: 'CMMC Authorized Access Control header with its plain-language callout on a practice',
            },
            {
              src: frameworks2AuE8,
              alt: 'Essential 8 Application Control header with the same callout on a strategy',
            },
          ],
          caption:
            'Same slots, different rung of the hierarchy. The callout sits on a strategy in one and a practice in the other.',
          width: 'xl',
        },
        {
          kind: 'prose',
          text: 'Above that layer, the framework keeps its shape. CMMC is domains and practices with a tri-state result and assessment objectives. Essential 8 is strategies, maturity levels, and individual requirements whose results roll upward cumulatively. Selection and routing are passed into those compositions rather than built into them. The mechanics stay familiar; the meaning stays with the framework.',
        },
        {
          kind: 'single',
          artifact: {
            src: frameworks3,
            alt: 'Essential 8 All Strategies overview showing three maturity level columns',
          },
          caption:
            'A level is met only when every requirement under it is, and overall maturity is the weakest strategy. That is how 67 met requirements read as Level 0.',
          width: 'lg',
        },
      ],
    },

    {
      heading: 'Divergence',
      content: [
        {
          kind: 'prose',
          text: 'The assessable item looked like the obvious place to generalize. Both frameworks need a result, evidence, and some way to record what needs fixing, and the persisted fields even share names. In CMMC, that item is a practice with a tri-state result and read-only assessment objectives. In Essential 8, it is a requirement with a binary result inside a cumulative maturity level.',
        },
        {
          kind: 'prose',
          text: 'A shared row would have needed to know which result control to render, when evidence appears, when remediation appears, what identifies the item, and what supporting content belongs around it. By that point the component would be describing the exceptions more than the common case. Repetition was cheaper than teaching one component every exception, and it is cheaper to undo.',
        },
        {
          kind: 'pair',
          artifacts: [
            {
              src: frameworks4Cmmc,
              alt: 'CMMC practice with a tri-state radio and Remediation Notes revealed on failure',
            },
            {
              src: frameworks4AuE8,
              alt: 'Essential 8 requirement with a binary checkbox and Evidence revealed on success',
            },
          ],
          caption:
            'Two leaves, not one row. A radio that reveals remediation on failure; a checkbox that reveals evidence on success.',
          width: 'xl',
        },
      ],
    },

    {
      heading: 'Later Observations',
      content: [
        {
          kind: 'prose',
          text: 'Two frameworks are live: Essential 8 in full; CMMC at Level 1 with Levels 2 and 3 modeled on the same structure. An additional 14 frameworks are planned. The assessments ship with every account, 162 at the time of writing; how many have completed one is not yet measured.',
        },
        {
          kind: 'prose',
          text: 'I started generalizing while there was only one concrete example, CMMC. Essential 8 showed me the boundary of what could be shared was narrower than I had drawn it. The pieces worth sharing are the ones that do not need to know what framework they belong to. I would extract those, leave the domain-specific compositions alone, and let the next framework decide whether anything broader is warranted.',
        },
      ],
    },
  ],

  fieldNote:
    'the next framework will be the first one I do not build. If the interaction still feels familiar without forcing the standard into a shape it does not have, the boundary held.',
}
