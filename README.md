# PolymorphUI

> pol·y·morph (noun)
> An organism, inorganic object or material which takes various forms.

**PolymorphUI** is a collection of variant-based UI components built using [TailwindCSS](https://tailwindcss.com/).
PolymorphUI allows you to define as many variant styles as possible. It ships with a CLI that regenerates the internal
styles based on your configuration file.

_PolymorphUI is inspired by how the [Prisma ORM](https://www.prisma.io/) dynamically builds the prisma client package
based on the `prisma.schema` file._

## Installation

Install the PolymorphUI components and CLI using the following command:

```bash
# NPM
npm install --save-dev polymorphui
# Yarn
yarn add --dev polymorphui
```

## Getting Started

Getting started with PolymorphUI is the simplest thing ever:

1. Create the config file by running `npx polymorphui init`. This creates a `polymorphui.config.ts` at the root of your
   project
2. Define component variants in `polymorphui.config.ts`. This would look something like this:

   ```typescript
   import type { ComponentVariants } from "polymorphui/variant";

   export default {
     text: {
       default: "text-gray-600 tracking-wide",
       heading: "text-5xl font-medium text-black",
       small: "text-sm",
       /* Other text variants (As many as you want) */
     },
     button: {
       secondary: "bg-orange-500 hover:opacity-85",
       /* Other button variants (As many as you want) */
     },
     /* Other component variants */
   } as ComponentVariants;
   ```

3. Run `npx polymorphui generate` to generate the internal theme (**and types too!**) based on your config.

4. Add the following paths to your `tailwind.config.js`:
   - `"node_modules/polymorphui/dist/*.js"`
   - `"polymorphui.config.ts"`

## Usage

```typescript jsx
import { Text } from "polymorphui/text";

<Text>Hello World</Text>; // The "variant" prop defaults to "default"
<Text variant="default">Hello World</Text>; // The "variant" prop is now typed to "default" | "heading" | "small"
<Text variant={["default", "small"]}>Hello World</Text>; // You can combine variants also!
```

## Components

PolymorphUI exports the following components:

| Component     | Description                                                    | Docs                                |
| ------------- | -------------------------------------------------------------- | ----------------------------------- |
| `Spinner`     | Indicates that an operation is in progress                     | [View docs](./docs/spinner.md)      |
| `Button`      | Control component which triggers an action                     | [View docs](./docs/button.md)       |
| `Text`        | Display component to standardize text in your app              | [View docs](./docs/text.md)         |
| `Popup`       | Displays popup content when the trigger is activated           | [View docs](./docs/popup.md)        |
| `Tooltip`     | Displays text info about another component when hovered        | [View docs](./docs/tooltip.md)      |
| `ContextMenu` | Displays action buttons related to a component                 | [View docs](./docs/context-menu.md) |
| `Input`       | Base user input component                                      | [View docs](./docs/input.md)        |
| `TextArea`    | Textarea component with auto-resize capability                 | [View docs](./docs/textarea.md)     |
| `Select`      | Displays a list of options to pick from                        | [View docs](./docs/select.md)       |
| `Switch`      | Control which toggles between two states                       | [View docs](./docs/switch.md)       |
| `Checkbox`    | Control which toggles between two states                       | [View docs](./docs/checkbox.md)     |
| `RadioGroup`  | Control which allows a single selection from a list of options | [View docs](./docs/radio-group.md)  |
| `Dialog`      | Overlays content over the primary window                       | [View docs](./docs/dialog.md)       |
| `Tabs`        | Displays a single tab panel based on the select tab            | [View docs](./docs/tabs.md)         |

## CLI

The PolymorphUI CLI allows you to create the config file as well as update its internal theme with your configuration

| Command                    | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `npx polymorphui init`     | Create PolymorphUI config file at the project root |
| `npx polymorphui generate` | (Re)generates variants for PolymorphUI components  |

## Contributors

- [Kwame Opare Asiedu](https://github.com/kwameopareasiedu) (Author)

## Changelog

N/A
