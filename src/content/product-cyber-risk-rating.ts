import type { ProductChapter } from '@/content/products'

import analystGrid from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/admin_cyber-risk-scorecard_analyst-grid.png'
import analystRiskVectors from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/admin_cyber-risk-scorecard_risk-vectors.png'
import complianceGridCollapsed from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/cyber-risk-scorecard_compliance-grid-collapsed.png'
import hero from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/cyber-risk-scorecard_hero.png'
import infoIcon from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/cyber-risk-scorecard_info-icon.png'
import riskVectorAnalysis from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/cyber-risk-scorecard_risk-vector-analysis.png'
import reportStateModel from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/report-state-model.svg'

export const CYBER_RISK_RATING: ProductChapter = {
  title: 'Cyber Risk Rating',
  subtitle: 'One Model, Two Views',

  masthead: {
    specimen:
      'An analyst picks a company, and a risk report exists seconds later: a score, seven risk vectors, three recommended focus areas, solution options matched to the gaps. The same data then appears in the client portal, where the reader is a business owner with no security background who wants to know one thing: how bad is it?',

    hypothesis:
      'A risk grade is compressed expert judgment. An analyst reads an F on System Patching and knows what produced it, what it implies, and what to do next. A client reads an F and knows they did not get an A. Showing both audiences the same view moves the data across and leaves the meaning behind. The client needs the conclusion; the analyst needs the evidence. That is a data problem before it is a copy problem.',

    provenance:
      "The product existed before I did. It produced a PDF, but the frontend had no reliable state model and no separation between the data we pulled and the form that displayed it. That layer was my first job. The analyst-side product decisions were my product manager's: that a report should be a snapshot, what the solution options ladder should contain, which defaults to suggest. Making those hold in a working system was mine, as was the client-facing portal. I was the only frontend developer on the team; my PM reviewed and pushed back.",

    hero: {
      kind: 'single',
      artifact: {
        src: hero,
        alt: 'Client-facing cyber risk scorecard header with the overall risk score',
      },
      caption: 'The client’s headline number, and the only score they see.',
      width: 'lg',
    },
  },

  blocks: [
    {
      heading: 'Field Guide',
      content: [
        {
          kind: 'prose',
          text: 'A report had to become a snapshot, not a live view of whatever providers knew that day. The backend normalized provider data and returned defaults; the frontend turned them into editable report state. Before creation, an analyst could pull the latest data. After saving, nothing changed unless they explicitly pressed Update. Once completed, updates were disabled and the inputs became read-only.',
        },
        {
          kind: 'prose',
          text: 'That lifecycle let one canonical report support two surfaces. Analysts saw the detailed evidence and could verify both the nineteen source vectors and seven client-facing groupings. Clients saw the distilled version. Shared grades and visualizations stayed consistent while the views diverged by audience. Versioned frontend views kept older completed reports accessible as the schema evolved.',
        },
        {
          kind: 'single',
          artifact: {
            src: reportStateModel,
            alt: 'Report state model: In Progress, Products Needed, Ready for QA, Complete / Delivered, with forward-only transitions',
          },
          caption:
            'The data layer refreshes daily; the report does not. Nothing crosses the boundary unless the analyst asks.',
          width: 'lg',
        },
        {
          kind: 'single',
          artifact: {
            src: analystGrid,
            alt: 'Analyst scorecard grid showing the Update button that pulls fresh data on demand',
          },
          caption:
            'Update is the only path across. Once a report is complete, even that is disabled.',
          width: 'lg',
        },
        {
          kind: 'single',
          artifact: {
            src: analystRiskVectors,
            alt: 'Analyst summary grid listing nineteen graded risk vector sub-scores',
          },
          caption:
            'Nineteen graded vectors visible to the analysts. The evidence layer.',

          width: 'lg',
        },
        {
          kind: 'single',
          artifact: {
            src: riskVectorAnalysis,
            alt: 'Client risk vector analysis showing the seven grouped vectors, with the compression from nineteen stated above them',
          },
          caption:
            'The seven those nineteen distill into, with the compression stated above them.',
          width: 'lg',
        },
      ],
    },

    {
      heading: 'Divergence',
      content: [
        {
          kind: 'prose',
          text: 'Fifteen compliance frameworks can appear in the client view. I initially ordered them by confidence, highest first, on the argument that someone scanning the set should meet the most reliable estimates before the least. My product manager pushed for alphabetical so a client looking for HIPAA could find HIPAA.',
        },
        {
          kind: 'prose',
          text: "The better answer was to stop treating all fifteen as equally important. Each account now defaults to four relevant frameworks; the rest sit behind 'View All', where alphabetical order preserves findability. That keeps an irrelevant Australian Essential 8 gauge from becoming the first thing most clients see without making the full set harder to search when someone actually needs it.",
        },
        {
          kind: 'single',
          artifact: {
            src: complianceGridCollapsed,
            alt: 'Compliance grid showing four framework gauges sorted alphabetically',
          },
          caption:
            'Four relevant frameworks by default. The other eleven sit behind View All.',
          width: 'lg',
        },
      ],
    },

    {
      heading: 'Later Observations',
      content: [
        {
          kind: 'prose',
          text: 'Across four years, 73 customers generated 64,589 supplier reports; 64,285 of them were delivered. The portal shows each company its most recent completed report, not a newer report still moving through QA.',
        },
        {
          kind: 'prose',
          text: 'What I would change is where I chose quietness over precision. FAIR definitions live behind tooltips when they belong on the page, and I would make data refresh section-specific. Updating the whole report preserves the snapshot, but it is a coarse tool when an analyst only needs one section refreshed.',
        },
        {
          kind: 'single',
          artifact: {
            src: infoIcon,
            alt: 'Probability Of Action row with its info icon tooltip open',
          },
          caption:
            'Probability Of Action, defined on hover. This belonged on the page.',
          width: 'lg',
        },
      ],
    },
  ],

  fieldNote:
    'I lost the argument about sort order, but it produced the better question: why were we showing fifteen frameworks at all?',
}
