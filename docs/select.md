# Input

[**_Docs_**](../README.md)

An input component which displays a list of options to pick from

```typescript jsx
import { Select } from "polymorphui/select";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState("");

  return (
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
    </Select>
  )
    ;
}
```

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

| Props          | Description                           | Type                                               | Default     |
|----------------|---------------------------------------|----------------------------------------------------|-------------|
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
