# PolymorphUI

_`pol·y·morph` (noun) An organism, inorganic object or material which takes various forms._

**PolymorphUI** is a collection of variant-based UI components built using [TailwindCSS](https://tailwindcss.com/).
You to define multiple variant styles for the components and use the CLI to regenerate the internal styles.

> PolymorphUI is inspired by how the [Prisma ORM](https://www.prisma.io/) dynamically builds the prisma client package
> based on the `prisma.schema` file.

> PolymorphUI has first-class integration with [Vite](https://vitejs.dev) via a plugin

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

1. Running `npx polymorphui init` to create the `polymorphui.config.ts` config file at the root of your project.
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

3. Add the following paths to your `tailwind.config.js`:
   - `node_modules/polymorphui/dist/variants.js`
   - `polymorphui.config.ts`

4. Add the polymorphui plugin to `vite.config.ts`. _This triggers a rebuild when `polymorphui.config.ts` is updated._

   ```typescript
   import {defineConfig} from "vite";
   import react from "@vitejs/plugin-react";
   import polymorphUi from "polymorphui/plugin-vite";
   
   export default defineConfig({
     plugins: [react(), polymorphUi()],
   });
   ```

> **Note:** For other bundlers other than Vite, you'll have to run `npx polymorphui generate` after updating
> `polymorphui.config.ts`

## Usage

```typescript jsx
import { Text } from "polymorphui/text";

/* The "variant" prop defaults to "default" */
<Text>Hello World</Text>;

/* From the config above, "variant" prop is now typed to "default" | "heading" | "small" */
<Text variant="default">Hello World</Text>;

/* You can combine variants also! */
<Text variant={["default", "small"]}>Hello World</Text>;
```

## Components

PolymorphUI exports the following components:

| Component     | Description                                                               | Docs                                |
|---------------|---------------------------------------------------------------------------|-------------------------------------|
| `Spinner`     | A component which indicates that an operation is in progress              | [View docs](./docs/spinner.md)      |
| `Badge`       | A component which displays a badge next to an anchor element/component    | [View docs](./docs/badge.md)        |
| `Button`      | A control component which triggers an action                              | [View docs](./docs/button.md)       |
| `Text`        | A component to display standardized text                                  | [View docs](./docs/text.md)         |
| `Popup`       | A component which displays popup content when the trigger is activated    | [View docs](./docs/popup.md)        |
| `Tooltip`     | A component which displays text info about another component when hovered | [View docs](./docs/tooltip.md)      |
| `ContextMenu` | A component which displays action buttons related to a component          | [View docs](./docs/context-menu.md) |
| `Input`       | Base user input component                                                 | [View docs](./docs/input.md)        |
| `TextArea`    | Textarea component with auto-resize capability                            | [View docs](./docs/textarea.md)     |
| `Select`      | An input component which allows a single selection from a list of options | [View docs](./docs/select.md)       |
| `Switch`      | An input component which toggles between two states                       | [View docs](./docs/switch.md)       |
| `Checkbox`    | An input component which toggles between two states                       | [View docs](./docs/checkbox.md)     |
| `RadioGroup`  | An input component which allows a single selection from a list of options | [View docs](./docs/radio-group.md)  |
| `Dialog`      | A component which displays content over the primary window                | [View docs](./docs/dialog.md)       |
| `Tabs`        | A component which displays a single tab panel based on the active tab     | [View docs](./docs/tabs.md)         |
| `Accordion`   | A component which shows and hides sections of related content on a page   | [View docs](./docs/accordion.md)    |

## CLI

The PolymorphUI CLI allows you to create the config file as well as update its internal theme with your configuration.

| Command                    | Description                                                                    |
|----------------------------|--------------------------------------------------------------------------------|
| `npx polymorphui init`     | Create PolymorphUI config file at the project root                             |
| `npx polymorphui generate` | Compiles `polymorphui.config.ts` to `node_modules/polymorphui/dist/variant.js` |

## Contributors

- [Kwame Opare Asiedu](https://github.com/kwameopareasiedu) (Author)

## Changelog

- `0.5.0`
   - Added [`Badge`](./docs/badge.md) component
   - Named all `forwardRef` components to identify in React devtools
- `0.3.1`
   - Added [`Accordion`](./docs/accordion.md) component
