# Button

[**_Docs_**](../README.md)

A control component which triggers an action

```typescript jsx
import { Button } from "polymorphui/button";

export function Example() {
  return <Button flex>Click Me!</Button>;
}
```

_Extends_ `ButtonHTMLAttributes<HTMLButtonElement>`

| Props       | Description                          | Type                 | Default     |
|-------------|--------------------------------------|----------------------|-------------|
| `variant?`  | Variant(s) to style with             | `string \| string[]` | `"default"` |
| `leading?`  | Component to render to left of text  | `ReactNode`          |             |
| `trailing?` | Component to render to right of text | `ReactNode`          |             |
| `loading?`  | Show loading indicator               | `boolean`            | `false`     |
| `flex?`     | Use full width                       | `boolean`            | `false`     |
