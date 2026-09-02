// COPY (DRAFT)
// # Cyber Risk Portfolio: Where Risk Concentrates

// ---

// ## Specimen

// A company's exposure does not stop at its own perimeter. Every supplier it works with is another way in, and the person accountable for that has to reduce it using levers that mostly belong to somebody else. This report gives them their suppliers in one document: all of them, or the subset relevant to the question.

// ## Working Hypothesis

// An average is a number you can report. It is not a number you can act on. A high average technical rating says the vendors are broadly fine, which is true and useless when a single weak supplier is a single way in. Exposure does not average out; it concentrates. The report is built around extremes, because the reader is looking for the few places their own risk actually lives.

// ## Provenance

// I was the only frontend developer and owned the product from report composition through the client-facing view. I worked directly with the analyst team to define the composition workflow, then designed and built the report around the decisions we made together. The visual system was already mine: this report inherited the component library I had built for the Cyber Risk Rating, which meant the new work started with an established set of primitives rather than a blank page.

// ## Field Guide

// The same gauge that shows one company's score shows the portfolio's best and worst scores. The range bar that carries one company's loss exposure carries the portfolio's cumulative annual risk. Vulnerability heat maps, compliance cards, and their interaction rules all came over unchanged.

// The difference lives above the components. Each one still receives the thing it was built to display: a score, a range, a count of findings. The wrapper owns the logic: reducing an arbitrary number of suppliers into those values before anything reaches visualization. That separation of concerns kept portfolio logic in the portfolio and display logic with the component.

// ## Divergence

// Before the report can show anyone where to look, someone has to choose what it covers, and that means working a supplier table with search and filters. Select All had two defensible meanings: everything on this page, or everything matching the current filter.

// A Select All that reaches past what is visible to the user leaves them unsure what they just did. A page of rows is visible, a larger number is now selected, and the two do not match. Setting the page size to show the whole set first takes one more step, but every row the click touches is on screen when it happens. That is the difference between a shortcut and a decision. The cost is that anyone wanting the whole set has to find the page-size control first, and I would rather they take that step than click something whose scope they cannot see.

// ## Later Observations

// 95 portfolio reports have been generated since February 2024, standing in for 1,429 individual Cyber Risk Rating reports. Fifteen documents became one, ninety-five times.

// What I would change is the cumulative annual risk bar. It has to span a range that can run from five to nine figures, and on a linear scale that pins the minimum and the average into the first eighth of the bar while the maximum sits alone at the far right. At single-company scale the chart underperformed. At portfolio scale it misinforms, because it makes the average look like the floor. A range that wide needs a different visualization, not a longer bar.

// **Field note:** the most satisfying thing about the component library is how boring this report was to build. Most of it was already decided.

// ---

// ## Artifact plan

// Five visual moments. Assets are available in `/assets/portfolio/whitehawk/products/cyber-risk-portfolio/`

// | # | Block | Artifact | File |
// |---|---|---|---|
// | 1 | Masthead | Executive Overview: stat tiles, top risk vectors, best and worst supplier | portfolio_report-exec_overview.png |
// | 2 | Field Guide | Same gauge, two products. Composite: the Cyber Risk Rating score beside the portfolio's best and worst | portfolio_report-component_lib.png & cyber_risk_rating-component_lib.png |
// | 3 | Field Guide | Compliance Overview, four framework cards | portfolio_report-compliance_overview.png |
// | 4 | Divergence | Supplier selection table | admin_portfolio-report_supplier-select-visible.png |
// | 5 | Later Observations | Cumulative annual risk bar, cropped tight on the three markers | portfolio_report-fin_impact_overview.png |

// ### Captions

// 1. *Two averages and everything else is an outlier. The report is built to be scanned for exceptions.*
// 2. *One component, two data models. The wrapper absorbs the difference.*
// 3. *Four relevant frameworks by default, the same rule as the Cyber Risk Rating.*
// 4. *Select All acts on what you can see. Showing the whole set first is what makes selecting it a decision.*
// 5. *$56,316 to $6,947,060 on a linear scale. The minimum and average are the same dot.*

// ---
