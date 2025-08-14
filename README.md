# PolymorphUI

_`pol·y·morph` (noun) An organism, inorganic object or material which takes various forms._

**PolymorphUI** is a collection of variant-based UI components built using [TailwindCSS](https://tailwindcss.com/).
The component variants are TailwindCSS class strings that you can customize, then use in your code.

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

1. Define the component variants and wrap your app with the `PolymorphUiProvider`

   ```typescript jsx
   import App from "./app";
   import { PolymorphUiProvider } from "polymorphui/polymorphui-provider";
   import type { ComponentVariants } from "polymorphui/variant";
   import { createRoot } from "react-dom/client";
   
   const variants: ComponentVariants = {
     text: {
       replaceDefault: "text-gray-600 tracking-wide",
       heading: "text-5xl font-medium text-black",
       small: "text-sm",
       /* Other text variants (As many as you want) */
     },
     button: {
       secondary: "bg-orange-500 hover:opacity-85",
       /* Other button variants (As many as you want) */
     },
     /* Other component variants */
   };

   createRoot(document.getElementById("root")!).render(
     <BrowserRouter>
       <PolymorphUiProvider variants={variants}>
         <App />
       </PolymorphUiProvider>
     </BrowserRouter>,
   );
   ```

> Use the `replaceDefault` key to replace the default class names (essentially, start styling from scratch)

> Use the `appendDefault` key to add class names to the default class names

## Usage

```typescript jsx
import { Text } from "polymorphui/text";

<Text>Default text variant</Text>;
<Text variant="heading">Heading text variant</Text>;
<Text variant="small">Small text variant</Text>;
```

## Components

PolymorphUI exports the following components:

| Component     | Description                                                                            | Docs                                |
|---------------|----------------------------------------------------------------------------------------|-------------------------------------|
| `Accordion`   | A component which shows and hides sections of related content on a page                | [View docs](./docs/accordion.md)    |
| `Badge`       | A component which displays a badge next to an anchor element/component                 | [View docs](./docs/badge.md)        |
| `Breadcrumbs` | A component which displays the current navigation using a hierarchy of links           | [View docs](./docs/breadcrumbs.md)  |
| `Button`      | A control component which triggers an action                                           | [View docs](./docs/button.md)       |
| `Checkbox`    | An input component which toggles between two states                                    | [View docs](./docs/checkbox.md)     |
| `ContextMenu` | A component which displays action buttons related to a component                       | [View docs](./docs/context-menu.md) |
| `DatePicker`  | An input component which allows entry or selection of a date                           | [View docs](./docs/date-picker.md)  |
| `Dialog`      | A component which displays content over the primary window                             | [View docs](./docs/dialog.md)       |
| `Input`       | Base user input component                                                              | [View docs](./docs/input.md)        |
| `Pagination`  | A component which displays pagination buttons for a list of items                      | [View docs](./docs/pagination.md)   |
| `Popup`       | A component which displays popup content when the trigger is activated                 | [View docs](./docs/popup.md)        |
| `RadioGroup`  | An input component which allows a single selection from a list of options              | [View docs](./docs/radio-group.md)  |
| `Select`      | An input component which allows a single or multiple selections from a list of options | [View docs](./docs/select.md)       |
| `Spinner`     | A component which indicates that an operation is in progress                           | [View docs](./docs/spinner.md)      |
| `Switch`      | An input component which toggles between two states                                    | [View docs](./docs/switch.md)       |
| `Tabs`        | A component which displays a single tab panel based on the active tab                  | [View docs](./docs/tabs.md)         |
| `Text`        | A component to display standardized text                                               | [View docs](./docs/text.md)         |
| `TextArea`    | Textarea component with auto-resize capability                                         | [View docs](./docs/textarea.md)     |
| `Tooltip`     | A component which displays text info about another component when hovered              | [View docs](./docs/tooltip.md)      |

## Hooks

PolymorphUI exports the following hooks:

| Hook             | Description                                                 | Docs                                    |
|------------------|-------------------------------------------------------------|-----------------------------------------|
| `useQueryParam`  | A hook which monitors and updates a single query parameter  | [View docs](./docs/use-query-param.md)  |
| `useQueryParams` | A hook which monitors and updates multiple query parameters | [View docs](./docs/use-query-params.md) |

## Contributors

- [Kwame Opare Asiedu](https://github.com/kwameopareasiedu) (Author)

## Changelog

- `0.13.1`
   - Fixed initial value resolution bug in [useQueryParams](./docs/use-query-params.md) hook
- `0.13.0`
   - Added optional `itemsClassName` prop to [Select](./docs/select.md) component
   - Added [useQueryParams](./docs/use-query-params.md) hook
- `0.12.0`
   - Added `disabled` prop to [Tooltip](./docs/tooltip.md) component to disable popup
   - Added `disabled` prop to [Badge](./docs/badge.md) component to disable popup
- `0.11.0`
   - Added [DatePicker](./docs/date-picker.md) component
   - Added polymorphism to `<DialogContent>` component in [Dialog](./docs/dialog.md) through the `as` prop
- `0.10.0`
   - Added [Breadcrumbs](./docs/breadcrumbs.md) component
   - Fixed bug causing `<SelectItem>` with empty string value not to be highlighted when [Select](./docs/select.md)'s
     value is an empty string
   - Fixed type of `children` prop of [Select](./docs/select.md) component
- `0.9.0`
   - Fixed bug causing incorrect dropdown placement in [Select](./docs/select.md) component when used in a dialog
- `0.7.0`
   - Added [Pagination](./docs/pagination.md) component
   - Added [useQueryParam](./docs/use-query-param.md) hook
   - Replaced `default` key in component variants objects with `replaceDefault` and `appendDefault` which replace and
     addon to the default class names respectively
   - Fixed `z-index` class names for [Dialog](./docs/dialog.md) and [Select](./docs/select.md) components
- `0.6.0`
   - Refactored library to use provider pattern for component variants
- `0.5.0`
   - Added [Badge](./docs/badge.md) component
   - Named all `forwardRef` components to identify components in React devtools
- `0.3.1`
   - Added [Accordion](./docs/accordion.md) component
