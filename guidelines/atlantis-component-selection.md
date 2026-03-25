# Atlantis Component Selection

When implementing UI, default to importing Atlantis components before writing any JSX structure.

Before writing any UI code, determine whether Atlantis already provides the needed component, pattern, or primitive.

## Required Decision Process

For every UI request, follow this process:

1. Identify the UI elements being requested
2. Map each element to an Atlantis component or Atlantis typography/layout primitive
3. Prefer Atlantis defaults over custom composition
4. Only introduce custom markup/styling for product-specific layout or missing behavior
5. If Atlantis does not cover something, implement the smallest possible custom layer

## Atlantis-First Rule

Always assume Atlantis has the right starting point.

Check Atlantis first for:

- page structure
- headings and text
- actions
- forms
- overlays
- menus
- banners and notices
- empty/error/loading states
- icons
- containers and surfaces

Do not jump straight to raw divs plus Tailwind when Atlantis components could solve the problem.

## Output Expectations

When generating UI:

- choose Atlantis components first
- compose from Atlantis primitives
- keep wrappers minimal
- avoid custom components unless they add product-specific behavior

## Forbidden Behavior

Do not:

- build a new Button when Atlantis has one
- build custom text styles instead of using Heading or Text
- build a custom modal, tooltip, menu, or input if Atlantis provides one
- style raw HTML to imitate Atlantis

## If No Atlantis Match Exists

If Atlantis truly does not provide a direct match:

- use the closest Atlantis primitives possible
- keep the custom piece small
- use Atlantis tokens
- avoid inventing a new visual pattern
- state the assumption in code comments only if necessary

## Final Check Before Output

Before finalizing code, verify:

- Could any custom element be replaced with an Atlantis component?
- Could any text element be replaced with Heading or Text?
- Could any visual styling be removed in favor of Atlantis defaults?
- Is Tailwind doing layout only?