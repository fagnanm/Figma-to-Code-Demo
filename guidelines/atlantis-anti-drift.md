# Anti-Drift Rules

Keep the implementation close to Atlantis.

## Rules

- Do not create wrappers around Atlantis components unless they add product-specific behavior.
- Do not create local design tokens that duplicate Atlantis tokens.
- Do not create reusable primitives that compete with Atlantis primitives.
- Do not invent new variant names when Atlantis naming already exists.
- Do not restyle Atlantis components into a different visual language.
- Do not introduce a custom component if simple Atlantis composition is sufficient.

## Prefer

Prefer:
- direct Atlantis imports
- shallow composition
- small product-specific wrappers
- explicit props
- readable React trees

## Avoid

Avoid:
- generic wrapper components with unclear value
- style-only wrapper components
- custom typography primitives
- homegrown button/input/card abstractions that duplicate Atlantis