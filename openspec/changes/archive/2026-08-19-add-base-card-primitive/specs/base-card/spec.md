## ADDED Requirements

### Requirement: BaseCard renders a frosted card surface with arbitrary children

`BaseCard` SHALL render a container with the project's frosted glass card appearance: rounded corners,
a subtle border at `beaver/10` opacity, a semi-transparent cream background (`bg-cream/80`), a small
box shadow, and backdrop blur. In dark mode it SHALL use `bg-dusk/80` instead of `bg-cream/80`.
The component SHALL accept arbitrary children via React's `children` prop and render them inside the
container without modification. It SHALL NOT apply any padding or sizing; callers are responsible for padding/sizing
on their content.

#### Scenario: Card renders children

- **WHEN** `<BaseCard>` is rendered with child content
- **THEN** the child content appears inside the card surface

#### Scenario: Card applies frosted appearance

- **WHEN** `<BaseCard>` is rendered in light mode
- **THEN** the container has `bg-cream/80`, `backdrop-blur-sm`, `border-beaver/10`, `rounded-lg`,
  and `shadow-sm`

#### Scenario: Card applies dark mode surface

- **WHEN** `<BaseCard>` is rendered in dark mode
- **THEN** the container background is `bg-dusk/80`

#### Scenario: Card does not add padding

- **WHEN** `<BaseCard>` is rendered
- **THEN** no padding or sizing is applied by the card itself; child wrappers control their own padding

#### Scenario: Card accepts a className override

- **WHEN** a `className` prop is passed to `<BaseCard>`
- **THEN** those classes are merged onto the card container alongside the base card classes
