# TextArea

[**_Docs_**](../README.md)

Textarea component with auto-height-resize capability

```typescript jsx
import { TextArea } from "polymorphui/textarea";
import { Spinner } from "polymorphui/spinner";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState("");

  return (
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
    />
  );
}
```

_Extends_ `InputHTMLAttributes<HTMLTextAreaElement>`

| Props         | Description                           | Type                                    | Default |
|---------------|---------------------------------------|-----------------------------------------|---------|
| `label?`      | Label node                            | `ReactNode`                             |         |
| `leading?`    | Component to render to left of input  | `ReactNode`                             |         |
| `trailing?`   | Component to render to right of input | `ReactNode`                             |         |
| `helper?`     | Helper node to render below input     | `ReactNode`                             |         |
| `error?`      | Error node                            | `ReactNode`                             |         |
| `autoResize?` | Autoresize textarea to fit text       | `boolean`                               | `true`  |
| `value?`      | Value of the textarea                 | `string`                                |         |
| `onChange?`   | Change handler                        | `ChangeEventHandler<{ value: string }>` |         |
