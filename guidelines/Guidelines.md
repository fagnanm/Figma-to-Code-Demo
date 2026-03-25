<!-- # Step 1: Read Guidelines Files (REQUIRED)

Read ALL files in the guidelines directory:

- atlantis-anti-drift.md
- atlantis-component-selection.md
- atlantis-ui.md
- atlantis-tailwind.md

When being instructed to understand Jobber, these two guideline files have the details you'll need:

- jobber-personas.md
- jobber-workflow.md -->

# General guidelines

- When instructed to build something, leave everything in app/components/jobber alone unless the user is explicit
- Use the @jobber package for all components first
- When the user tells you to use a particular component by name, use it
- Use radix components if something isn't avaliable in @jobber components
- Only use tailwind to do layout or to adjust @jobber components using UNSAFE_className as a prop
- Don't ask about needing to important more components from @jobber/components, just import them

# Base tokens

- Are included here: @jobber/design/dist/foundation.css

# Component styles

- Are included here: @jobber/components/dist/styles.css

# Design system guidelines

- Only use Text and Heading components for text within the app

# App structure

- If the user asks you to make a sidenav item active, you can simply match the string to activeItem that is set on the UIShell within App.tsx

## Page

- When using a Page component, only ever have 1 primary and 1 secondary action
- If there are more actions necessary put them in a Menu that is triggered by a button that says More
- Always add width="fill" unless otherwise instructed
- Page provides padding, so no need to have containers inside page that add padding

## Layout

- Use tailwind to do layout
- When laying out a series of Cards, wrap them in a Stack component which will create space between them

## Buttons

- Buttons have 3 types, primary, secondary, tertiary. If one of buttons is in the view, use primary.
- Buttons come in 3 sizes, small, base, and large. Use base buttons over other sizes.
- Buttons like remove or delete use the variation of desctructive, and instead of a label use the trash icon in the button.

## Cards

- When using the Card component, always put a Content component inside of it, any content that needs to go inside the card goes inside the Content component.
- If using two cards next to eachother horizontally, ensure they have a gap between them

## Icons

- Instead of creating icons, use the Icon component. When instructured to use an icon you'll be given a label that matches the icon I want to use. Pass that name into the icon name prop.

## StatusLabel

- Used to indicate status within things like dataTable or on things like Request, Quotes, Jobs, Invoices
- Together the statusIndicator and the label make up StatusLabel
- Always use thhe statusLabel to display status

## Modal

- When using a modal as part of an app, always wrap the inner content of the modal in the Content component, this is what gives it the padding the form needs from the edges of the modal.
- Content will also provide the gap necessary between fields

## Color

- Only use surface colours for backgrounds

## Banner

- Banner variations are always set by the "type" prop. If the user doesn't ask for a specific type, use "notice"

## Inputs

- When using inputs never set a label outside the input, always use the placeholder prop which will put the input inside the container
- If you need a textarea, use the inputText with the multiline boolean set to true
- When the user can upload a file, use the inputFile component
- When inputting dates, use InputDate
- When inputting time, use InputTime