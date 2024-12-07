# Input

[**_Docs_**](../README.md)

Base user input component

```typescript jsx
import { Input } from "polymorphui/input";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <Input
      leading={<BiUser />}
      trailing={<BiUser />}
      helper="Helper text here"
      error="Error text here"
      placeholder="Type here"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

_Extends_ `InputHTMLAttributes<HTMLInputElement>`

| Props       | Description                           | Type                                    | Default |
|-------------|---------------------------------------|-----------------------------------------|---------|
| `variant?`  | Variant(s) to style with              | `string \| string[]`                    |         |
| `label?`    | Label node                            | `ReactNode`                             |         |
| `leading?`  | Component to render to left of input  | `ReactNode`                             |         |
| `trailing?` | Component to render to right of input | `ReactNode`                             |         |
| `helper?`   | Helper node to render below input     | `ReactNode`                             |         |
| `error?`    | Error node                            | `ReactNode`                             |         |
| `value?`    | Value of the input                    | `string`                                |         |
| `onChange?` | Change handler                        | `ChangeEventHandler<{ value: string }>` |         |
