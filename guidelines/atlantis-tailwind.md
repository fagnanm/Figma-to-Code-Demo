# Atlantis + Tailwind Guardrails

Tailwind is for layout and structural composition only.

Atlantis owns:

- colors
- typography
- component visuals
- shadows
- radii
- states
- accessibility behavior

## Allowed Tailwind

Allowed categories:

- flex
- grid
- gap
- justify-\*
- items-\*
- content-\*
- self-\*
- order-\*
- col-span / row-span
- responsive layout utilities
- width/height constraints when necessary
- overflow
- positioning
- z-index
- hidden/block/inline-flex for layout purposes

## Disallowed Tailwind

Do not use Tailwind for:

- text color
- background color
- border color
- font size
- font weight
- line height
- tracking
- shadows
- rounded corners
- opacity-based interaction styling
- arbitrary pixel values for visual styling
- recreating Atlantis spacing scales where Atlantis tokens/components already define spacing

## Bad Patterns

Avoid:

- `text-red-600`
- `bg-blue-50`
- `rounded-xl`
- `shadow-md`
- `text-sm`
- `font-medium`
- `leading-5`
- `p-[14px]`
- `bg-[#123456]`

## Good Patterns

Good:

- Tailwind to place Atlantis components in a row, column, or grid
- Atlantis Heading/Text for all text styling
- Atlantis tokens for visual decisions
- minimal Tailwind around Atlantis components for responsive composition

## Enforcement

If Tailwind is being used to express visual design instead of layout, stop and replace that styling with Atlantis components or Atlantis tokens.