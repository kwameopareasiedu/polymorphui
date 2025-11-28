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

1. Define the component configuration and wrap your app with the `PolymorphUiProvider`

   ```typescript jsx
   import App from "./app";
   import {PolymorphUiProvider} from "polymorphui/polymorphui-provider";
   import type {ComponentConfig} from "polymorphui/config";

   const config: ComponentConfig = {
     text: {
       custom: "text-gray-600 tracking-wide", // Replaces the default style
       extend: "text-center text-sm",         // Appends to the default style
     },
     /* Other component configuration */
   };

   createRoot(document.getElementById("root")!).render(
     <BrowserRouter>
       <PolymorphUiProvider config={config}>
         <App />
       </PolymorphUiProvider>
     </BrowserRouter>,
   );
   ```

> Use the `custom` key to replace the default class names (essentially, start styling from scratch)

> Use the `extend` key to append class names to the default class names

## Components

PolymorphUI exports the following components:

| Component      | Description                                                                               | Docs                                 |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------|
| `Accordion`    | A component which shows and hides sections of related content on a page                   | [View docs](./docs/accordion.md)     |
| `Badge`        | A component which displays a badge next to an anchor element/component                    | [View docs](./docs/badge.md)         |
| `Breadcrumbs`  | A component which displays the current navigation using a hierarchy of links              | [View docs](./docs/breadcrumbs.md)   |
| `Button`       | A control component which triggers an action                                              | [View docs](./docs/button.md)        |
| `Checkbox`     | An input component which toggles between two states                                       | [View docs](./docs/checkbox.md)      |
| `ContextMenu`  | A component which displays action buttons related to a component                          | [View docs](./docs/context-menu.md)  |
| `DatePicker`   | An input component which allows entry or selection of a date                              | [View docs](./docs/date-picker.md)   |
| `DetailsTable` | A 2-column table component for display an object's details                                | [View docs](./docs/details-table.md) |
| `Dialog`       | A component which displays content over the primary window                                | [View docs](./docs/dialog.md)        |
| `Input`        | Base user input component                                                                 | [View docs](./docs/input.md)         |
| `Pagination`   | A component which displays pagination buttons for a list of items                         | [View docs](./docs/pagination.md)    |
| `Popup`        | A component which displays popup content when the trigger is activated                    | [View docs](./docs/popup.md)         |
| `RadioGroup`   | An input component which allows a single selection from a list of options                 | [View docs](./docs/radio-group.md)   |
| `Select`       | An input component which allows a single or multiple selections from a list of options    | [View docs](./docs/select.md)        |
| `Spinner`      | A component which indicates that an operation is in progress                              | [View docs](./docs/spinner.md)       |
| `Switch`       | An input component which toggles between two states                                       | [View docs](./docs/switch.md)        |
| `Table`        | A responsive table component with grouping and sorting capabilities                       | [View docs](./docs/table.md)         |
| `Tabs`         | A component which displays a single tab panel based on the active tab                     | [View docs](./docs/tabs.md)          |
| `Text`         | A component to display standardized text                                                  | [View docs](./docs/text.md)          |
| `TextArea`     | Textarea component with auto-resize capability                                            | [View docs](./docs/textarea.md)      |
| `Tooltip`      | A component which displays text info about another component when hovered                 | [View docs](./docs/tooltip.md)       |
| `TrapClick`    | A component which prevents click actions from bubbling up to ancestor elements            | [View docs](./docs/trap-click.md)    |
| `TrapFocus`    | A component which prevents focus loss, by cycling focus between all focusable descendants | [View docs](./docs/trap-focus.md)    |

## Hooks

PolymorphUI exports the following hooks:

| Hook                   | Description                                                                                     | Docs                                            |
|------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------|
| `useDebounced`         | A hook which debounces a state value some time after the last change                            | [View docs](./docs/use-debounced.md)            |
| `useQueryParam`        | A hook which monitors and updates a single query parameter                                      | [View docs](./docs/use-query-param.md)          |
| `useQueryParams`       | A hook which monitors and updates multiple query parameters                                     | [View docs](./docs/use-query-params.md)         |
| `useWindowSizeInRange` | A hook which returns `true` if the window size is within a specific range, or `false` otherwise | [View docs](./docs/use-window-size-in-range.md) |

## Contributors

- [Kwame Opare Asiedu](https://github.com/kwameopareasiedu) (Author)

## Changelog

- `0.14.4`
   - Added [DetailsTable](./docs/details-table.md) component
- `0.14.3`
   - Fixed style issues with [Table](./docs/table.md) component
- `0.14.1`
   - Updated `TableRow` component to use `cells` attribute over `data`, `defaultColumn`, `customColumn` approach
- `0.14.0`
   - Removed arbitrary component variant framework
   - Added [Table](./docs/table.md) component
   - Added [TrapFocus](./docs/trap-focus.md) component
   - Added [TrapClick](./docs/trap-click.md) component
   - Added [useDebounced](./docs/use-debounced.md) hook
   - Added [useWindowSizeInRange](./docs/use-window-size-in-range.md) hook
   - [DatePicker](./docs/date-picker.md) component no longer supports manual typing
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
