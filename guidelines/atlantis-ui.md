# Atlantis Design System UI

When implementing UI, default to importing Atlantis components before writing any JSX structure.

All UI code must follow the Atlantis design system.

Atlantis is the source of truth for:

- UI components
- visual tokens
- accessibility
- interaction states
- visual language

Tailwind is only a layout utility layer, not a design system.

## Priority Order

Use this order for all UI work:

1. Atlantis components
2. Atlantis tokens
3. Tailwind layout utilities
4. Minimal custom styling

Never introduce a new visual pattern if Atlantis already provides one.

## React + TypeScript Standards

Use:

- React function components
- TypeScript
- typed props for reusable/public components

Avoid:

- class components
- untyped props
- large monolithic components

## Atlantis Component Usage

Always prefer Atlantis components for:

- buttons
- text inputs
- selects
- checkboxes
- radios
- switches
- headings
- text
- cards
- banners
- modals
- drawers
- menus
- tooltips
- icons
- loading states
- error states
- empty states

If Atlantis provides the component:

- use it directly
- keep default behavior when possible
- avoid wrapping unless necessary

Do not recreate Atlantis components with Tailwind.

## Tailwind Usage Rules

Tailwind is allowed only for layout and structure.

Allowed Tailwind:

- flex
- grid
- gap
- alignment utilities
- responsive layout utilities
- container sizing
- overflow
- positioning

Do not use Tailwind for:

- colors
- typography
- shadows
- border radius
- arbitrary visual values

## Tokens and Theming

Never hardcode visual values when Atlantis tokens exist.

Use Atlantis tokens for:

- color
- spacing
- typography
- elevation
- radius

Prefer semantic tokens over raw palette values.

Ensure UI works with theming and dark mode.

## Typography

Prefer Atlantis typography components:

- Heading
- Text

Do not recreate Atlantis typography with Tailwind classes unless there is no Atlantis-supported option.

## Layout and Spacing

Use Atlantis spacing decisions for visual rhythm.
Use Tailwind only to compose layout.

Guidelines:

- tight spacing for related items
- larger spacing for separate sections
- avoid arbitrary margin/padding values
- avoid deeply nested wrappers

## Forms

Use Atlantis form components and patterns.

Required:

- accessible labels
- helper text
- validation messaging
- consistent field spacing

Do not create custom form controls if Atlantis provides one.

## Accessibility

Maintain Atlantis accessibility behavior.

Requirements:

- icon-only buttons must have accessible labels
- keyboard navigation must work
- focus states must remain intact
- color must not be the only indicator of meaning
- avoid disabled states unless necessary

Prefer semantic HTML.

## Icons

Use Atlantis icons when available.
Avoid mixing icon libraries unless necessary.

## API Naming Conventions

Follow Atlantis naming conventions.

Prefer:

- `open` for open/closed state
- `base` for default scale variants

## Custom Styling Rules

Custom styling must be minimal.

Rules:

- use Atlantis tokens
- keep styling small
- do not introduce a parallel design language
- avoid overriding Atlantis styles

## Implementation Workflow

For every UI task:

1. Identify relevant Atlantis components
2. Compose the UI using Atlantis primitives
3. Use Tailwind for layout only if needed
4. Use Atlantis tokens for remaining styling
5. Verify accessibility

## Hard Enforcement Rules

- Atlantis components override custom components
- Atlantis tokens override hardcoded values
- Atlantis typography overrides Tailwind typography
- Atlantis colors override Tailwind color utilities
- Tailwind may arrange Atlantis components but must not redefine visual styling
- Do not recreate Atlantis components using Tailwind