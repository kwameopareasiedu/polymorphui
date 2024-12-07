# RadioGroup

[**_Docs_**](../README.md)

An input component which allows a single selection from a list of options

```typescript jsx
import { RadioGroup, RadioGroupItem } from "polymorphui/radio-group";
import { InputLabel } from "polymorphui/input-helpers";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <RadioGroup
      label="Favorite day in the week?"
      className="w-full"
      value={value}
      error="Error text"
      helper="Helper text"
      onChange={(e) => setValue(e.target.value)}>
      {[
        ["Monday", "monday", false],
        ["Tuesday", "tuesday", true],
        ["Wednesday", "wednesday", true],
        ["Thursday", "thursday", true],
        ["Friday", "friday", true],
        ["Saturday", "saturday", true],
        ["Sunday", "sunday", true],
      ].map(([label, value, enabled]) => (
        <InputLabel key={value as string} className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value={value as string} disabled={!enabled} />
          {label}
        </InputLabel>
      ))}
    </RadioGroup>
  );
}
```

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

| Props       | Description                       | Type                                               | Default |
|-------------|-----------------------------------|----------------------------------------------------|---------|
| `variant?`  | Variant(s) to style with          | `string \| string[]`                               |         |
| `checked?`  | Checked state                     | `boolean`                                          |         |
| `label?`    | Label node                        | `ReactNode`                                        |         |
| `helper?`   | Helper node to render below input | `ReactNode`                                        |         |
| `error?`    | Error node                        | `ReactNode`                                        |         |
| `inline?`   | Render items inline               | `boolean`                                          | `false` |
| `onChange?` | Change handler                    | `ChangeEventHandler<{ value: string & string[] }>` |         |
