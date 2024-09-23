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

_Extends_ `HTMLAttributes<HTMLSpanElement>`

```typescript jsx
import { Spinner } from "polymorphui/spinner";

<Spinner />;
```

| Props      | Description              | Type                 | Default              |
| ---------- | ------------------------ | -------------------- | -------------------- |
| `variant?` | Variant(s) to style with | `string \| string[]` | `"default"`          |
| `icon?`    | Spinner icon to render   | `ReactNode`          | `<Ring />` (Inbuilt) |

### Button

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

```typescript jsx
import { Button } from "polymorphui/button";

<Button flex>Click Me!</Button>;
```

| Props       | Description                          | Type                 | Default     |
| ----------- | ------------------------------------ | -------------------- | ----------- |
| `variant?`  | Variant(s) to style with             | `string \| string[]` | `"default"` |
| `leading?`  | Component to render to left of text  | `ReactNode`          |             |
| `trailing?` | Component to render to right of text | `ReactNode`          |             |
| `loading?`  | Show loading indicator               | `boolean`            | `false`     |
| `flex?`     | Use full width                       | `boolean`            | `false`     |

### Text

_Extends_ `LabelHTMLAttributes<HTMLParagraphElement>`

```typescript jsx
import { Text } from "polymorphui/text";

<Text as="p" inline>
  Hello World!
</Text>;
```

| Props      | Description               | Type                                                                     | Default     |
| ---------- | ------------------------- | ------------------------------------------------------------------------ | ----------- |
| `variant?` | Variant(s) to style with  | `string \| string[]`                                                     | `"default"` |
| `as?`      | HTML element to render    | `h1 \| h2 \| h3 \| h4 \| h5 \| h6 \| p \| span \| strong \| li \| label` | `p`         |
| `inline?`  | Render inline with `span` | `boolean`                                                                | `false`     |

### Popup

```typescript jsx
import { Popup } from "polymorphui/popup";
import { Button } from "polymorphui/button";
import { Text } from "polymorphui/text";

<Popup
  openEvent="triggerEnter"
  closeEvent={["triggerLeave", "outsideClick"]}
  placement="bottom-start"
  offset={[0, 0]}
  openDelayMs={500}
  closeDelayMs={250}
  onOpen={() => console.log("Opened")}
  onClose={() => console.log("Closed")}>
  {/* Trigger element */}
  <Button>Open Popup</Button>

  {/* Popup/Floating element */}
  <div className="w-32">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ducimus incidunt minus nam quod rerum saepe
      sequi, voluptas voluptate voluptatibus. Aspernatur assumenda consectetur debitis dolorem inventore possimus
      praesentium quas suscipit!
    </Text>
  </div>
</Popup>;
```

```typescript
type OpenEventType = "triggerEnter" | "triggerClick";

type CloseEventType = "triggerLeave" | "triggerClick" | "outsideClick";

type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "right-start"
  | "right"
  | "right-end"
  | "left-start"
  | "left"
  | "left-end"
  | "auto"
  | "auto-start"
  | "auto-end";
```

| Props           | Description                                                   | Type                                   | Default      |
| --------------- | ------------------------------------------------------------- | -------------------------------------- | ------------ |
| `variant?`      | Variant(s) to style with                                      | `string \| string[]`                   | `"default"`  |
| `openEvent?`    | Event(s) to open popup                                        | `OpenEventType \| OpenEventType[]`     |              |
| `closeEvent?`   | Event(s) to close popup                                       | `CloseEventType \| CloseEventType[]`   |              |
| `children`      | Children array                                                | `[ReactNode, ReactNode]`               |              |
| `placement?`    | Popup position relative to trigger                            | `Placement`                            | `auto-start` |
| `offset?`       | Popup offset from trigger in pixels                           | `[number, number]`                     |              |
| `openDelayMs?`  | If `openEvent` includes `triggerEnter`, delay before opening  | `number`                               | `250`        |
| `closeDelayMs?` | If `closeEvent` includes `triggerLeave`, delay before closing | `number`                               | `250`        |
| `onOpen?`       | Called when popup opens                                       | `() => void`                           |              |
| `onClose?`      | Called when popup closes                                      | `() => void`                           |              |
| `controller?`   | Controller object(s) to control popup externally              | `PopupController \| PopupController[]` |              |

### Tooltip

_Extends_ `HTMLAttributes<HTMLParagraphElement>`

```typescript jsx
import { Tooltip } from "polymorphui/tooltip";

<Tooltip
  description="User signed up for service on June 19th, 2024"
  placement="bottom-start"
  offset={[0, 10]}
  delayMs={500}>
  {/* Anchor element */}
  <p>3 months ago</p>
</Tooltip>;
```

| Props         | Description                           | Type                 | Default        |
| ------------- | ------------------------------------- | -------------------- | -------------- |
| `variant?`    | Variant(s) to style with              | `string \| string[]` | `"default"`    |
| `description` | Description for tooltip               | `string`             |                |
| `delayMs?`    | Delay before opening                  | `number`             | `250`          |
| `placement?`  | Tooltip position relative to trigger  | `Placement`          | `bottom-start` |
| `offset?`     | Tooltip offset from trigger in pixels | `[number, number]`   | `[0, 6]`       |

### ContextMenu

```typescript jsx
import { ContextMenu, ContextMenuItem, ContextMenuItems } from "polymorphui/context-menu";
import { Button } from "polymorphui/button";

<ContextMenu>
  <Button>Open menu</Button>

  <ContextMenuItems>
    <ContextMenuItem label="Option 1" onClick={() => alert("Option 1 clicked")} />

    <ContextMenuItem label="Option 2">
      <ContextMenuItems>
        <ContextMenuItem label="Nested 1" />
        <ContextMenuItem label="Nested 2" />
      </ContextMenuItems>
    </ContextMenuItem>
  </ContextMenuItems>
</ContextMenu>;
```

| Props         | Description                                      | Type                                   | Default     |
| ------------- | ------------------------------------------------ | -------------------------------------- | ----------- |
| `variant?`    | Variant(s) to style with                         | `string \| string[]`                   | `"default"` |
| `controller?` | Controller object(s) to control popup externally | `PopupController \| PopupController[]` |             |

### Input

_Extends_ `InputHTMLAttributes<HTMLInputElement>`

```typescript jsx
import { Input } from "polymorphui/input";
import { useState } from "react";

const [value, setValue] = useState("");

<Input
  leading={<BiUser />}
  trailing={<BiUser />}
  helper="Helper text here"
  error="Error text here"
  placeholder="Type here"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>;
```

| Props       | Description                           | Type                                    | Default     |
| ----------- | ------------------------------------- | --------------------------------------- | ----------- |
| `variant?`  | Variant(s) to style with              | `string \| string[]`                    | `"default"` |
| `label?`    | Label node                            | `ReactNode`                             |             |
| `leading?`  | Component to render to left of input  | `ReactNode`                             |             |
| `trailing?` | Component to render to right of input | `ReactNode`                             |             |
| `helper?`   | Helper node to render below input     | `ReactNode`                             |             |
| `error?`    | Error node                            | `ReactNode`                             |             |
| `value?`    | Value of the input                    | `string`                                |             |
| `onChange?` | Change handler                        | `ChangeEventHandler<{ value: string }>` |             |

### Textarea

_Extends_ `InputHTMLAttributes<HTMLTextAreaElement>`

```typescript jsx
import { TextArea } from "polymorphui/textarea";
import { Spinner } from "polymorphui/spinner";
import { useState } from "react";

const [value, setValue] = useState("");

<TextArea
  label={
    <div className="flex items-center justify-between">
      <span>Label</span>
      <small>{areaText.length} chars</small>
    </div>
  }
  trailing={<Spinner variant="default" className="mt-3" />}
  placeholder="Type here"
  value={value}
  error="Error text"
  helper="Helper text"
  onChange={(e) => setValue(e.target.value)}
/>;
```

| Props         | Description                           | Type                                    | Default     |
| ------------- | ------------------------------------- | --------------------------------------- | ----------- |
| `variant?`    | Variant(s) to style with              | `string \| string[]`                    | `"default"` |
| `label?`      | Label node                            | `ReactNode`                             |             |
| `leading?`    | Component to render to left of input  | `ReactNode`                             |             |
| `trailing?`   | Component to render to right of input | `ReactNode`                             |             |
| `helper?`     | Helper node to render below input     | `ReactNode`                             |             |
| `error?`      | Error node                            | `ReactNode`                             |             |
| `autoResize?` | Autoresize textarea to fit text       | `boolean`                               | `true`      |
| `value?`      | Value of the textarea                 | `string`                                |             |
| `onChange?`   | Change handler                        | `ChangeEventHandler<{ value: string }>` |             |

### Select

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

```typescript jsx
import { TextArea } from "polymorphui/textarea";
import { Spinner } from "polymorphui/spinner";
import { useState } from "react";

const [value, setValue] = useState("");

<Select
  value={value}
  label="Favorite fruit"
  leading={<BiNotepad />}
  placeholder="Select fruit"
  error="Error text"
  helper="Helper text"
  onChange={(e) => setValue(e.target.value)}>
  <SelectItem value="apples">Apples</SelectItem>
  <SelectItem value="oranges">Oranges</SelectItem>
  <SelectItem value="grapes">Grapes</SelectItem>
  <SelectItem value="pears">Pears</SelectItem>
</Select>;
```

| Props          | Description                           | Type                                               | Default     |
| -------------- | ------------------------------------- | -------------------------------------------------- | ----------- |
| `variant?`     | Variant(s) to style with              | `string \| string[]`                               | `"default"` |
| `label?`       | Label node                            | `ReactNode`                                        |             |
| `leading?`     | Component to render to left of input  | `ReactNode`                                        |             |
| `trailing?`    | Component to render to right of input | `ReactNode`                                        |             |
| `helper?`      | Helper node to render below input     | `ReactNode`                                        |             |
| `error?`       | Error node                            | `ReactNode`                                        |             |
| `placeholder?` | Placeholder text                      | `string`                                           |             |
| `value?`       | Value(s) of the select                | `string \| string[]`                               |             |
| `onChange?`    | Change handler                        | `ChangeEventHandler<{ value: string & string[] }>` |             |

> If `value` is an array, `<Select />` becomes multi-select

### Switch

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

```typescript jsx
import { Switch } from "polymorphui/switch";

const [checked, setChecked] = useState(false);

<Switch checked={checked} onChange={(e) => setValue(e.target.checked)} />;
```

| Props       | Description              | Type                                               | Default     |
| ----------- | ------------------------ | -------------------------------------------------- | ----------- |
| `variant?`  | Variant(s) to style with | `string \| string[]`                               | `"default"` |
| `checked?`  | Checked state            | `boolean`                                          |             |
| `onChange?` | Change handler           | `ChangeEventHandler<{ value: string & string[] }>` |             |

### Checkbox

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

```typescript jsx
import { Checkbox } from "polymorphui/checkbox";

const [checked, setChecked] = useState(false);

<Checkbox
  label="Checkbox label"
  helper="Helper text"
  error="Error text"
  checked={checked}
  rtl={false}
  onChange={(e) => setValue(e.target.checked)}
/>;
```

| Props       | Description                         | Type                                               | Default     |
| ----------- | ----------------------------------- | -------------------------------------------------- | ----------- |
| `variant?`  | Variant(s) to style with            | `string \| string[]`                               | `"default"` |
| `checked?`  | Checked state                       | `boolean`                                          |             |
| `label?`    | Label node                          | `ReactNode`                                        |             |
| `helper?`   | Helper node to render below input   | `ReactNode`                                        |             |
| `error?`    | Error node                          | `ReactNode`                                        |             |
| `rtl?`      | Render label before checkbox button | `boolean`                                          | `false`     |
| `onChange?` | Change handler                      | `ChangeEventHandler<{ value: string & string[] }>` |             |

### RadioGroup

### Dialog

### Tabs
