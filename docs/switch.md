# Switch

[**_Docs_**](../README.md)

An input component which toggles between two states

```typescript jsx
import { Switch } from "polymorphui/switch";
import { useState } from "react";

export function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch checked={checked} onChange={(e) => setValue(e.target.checked)} />
  );
}
```

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

| Props       | Description              | Type                                               | Default     |
|-------------|--------------------------|----------------------------------------------------|-------------|
| `variant?`  | Variant(s) to style with | `string \| string[]`                               | `"default"` |
| `checked?`  | Checked state            | `boolean`                                          |             |
| `onChange?` | Change handler           | `ChangeEventHandler<{ value: string & string[] }>` |             |
