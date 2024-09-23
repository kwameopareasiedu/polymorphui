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

4. Added the following paths to your `tailwind.config.js`:

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

### Spinner

`Extends HTMLAttributes<HTMLSpanElement>`

```typescript jsx
import { Spinner } from "polymorphui/spinner";

<Spinner />;
```

| Props      | Description              | Type                 | Default              |
|------------|--------------------------|----------------------|----------------------|
| `variant?` | Variant(s) to style with | `string \| string[]` | `"default"`          |
| `icon?`    | Spinner icon to render   | `ReactNode`          | `<Ring />` (Inbuilt) |

### Button

`Extends ButtonHTMLAttributes<HTMLButtonElement>`

```typescript jsx
import { Button } from "polymorphui/button";

<Button />;
```

| Props       | Description                       | Type                 | Default     |
|-------------|-----------------------------------|----------------------|-------------|
| `variant?`  | Variant(s) to style with          | `string \| string[]` | `"default"` |
| `leading?`  | Component to render left of text  | `ReactNode`          |             |
| `trailing?` | Component to render right of text | `ReactNode`          |             |
| `loading?`  | Show loading indicator            | `boolean`            | `false`     |
| `flex?`     | Use full width                    | `boolean`            | `false`     |

### Text

`Extends LabelHTMLAttributes<HTMLParagraphElement>`

```typescript jsx
import { Text } from "polymorphui/text";

<Text>Hello World</Text>;
```

| Props      | Description               | Type                                                                     | Default     |
|------------|---------------------------|--------------------------------------------------------------------------|-------------|
| `variant?` | Variant(s) to style with  | `string \| string[]`                                                     | `"default"` |
| `as?`      | HTML element to render    | `h1 \| h2 \| h3 \| h4 \| h5 \| h6 \| p \| span \| strong \| li \| label` | `p`         |
| `inline?`  | Render inline with `span` | `boolean`                                                                | `false`     |

### Popup

### Tooltip

### ContextMenu

### Input

### Textarea

### Select

### Switch

### Checkbox

### RadioGroup

### Dialog

### Tabs
