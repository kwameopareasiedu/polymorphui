# Checkbox

[**_Docs_**](../README.md)

An input component which toggles between two states

```typescript jsx
import { Checkbox } from "polymorphui/checkbox";
import { useState } from "react";

export function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox label"
      helper="Helper text"
      error="Error text"
      checked={checked}
      rtl={false}
      onChange={(e) => setValue(e.target.checked)}
    />
  );
}
```

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

| Props       | Description                         | Type                                               | Default |
|-------------|-------------------------------------|----------------------------------------------------|---------|
| `variant?`  | Variant(s) to style with            | `string \| string[]`                               |         |
| `checked?`  | Checked state                       | `boolean`                                          |         |
| `label?`    | Label node                          | `ReactNode`                                        |         |
| `helper?`   | Helper node to render below input   | `ReactNode`                                        |         |
| `error?`    | Error node                          | `ReactNode`                                        |         |
| `rtl?`      | Render label before checkbox button | `boolean`                                          | `false` |
| `onChange?` | Change handler                      | `ChangeEventHandler<{ value: string & string[] }>` |         |
