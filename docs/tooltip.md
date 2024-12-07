# Tooltip

[**_Docs_**](../README.md)

A component which displays text info about another component when hovered

```typescript jsx
import { Tooltip } from "polymorphui/tooltip";


export function Example() {
  return (
    <Tooltip
      description="User signed up for service on June 19th, 2024"
      placement="bottom-start"
      offset={[0, 10]}
      delayMs={500}>
      {/* Anchor element */}
      <p>3 months ago</p>
    </Tooltip>
  );
}
```

_Extends_ `HTMLAttributes<HTMLParagraphElement>`

| Props         | Description                           | Type                 | Default        |
|---------------|---------------------------------------|----------------------|----------------|
| `variant?`    | Variant(s) to style with              | `string \| string[]` |                |
| `description` | Description for tooltip               | `string`             |                |
| `delayMs?`    | Delay before opening                  | `number`             | `250`          |
| `placement?`  | Tooltip position relative to trigger  | `Placement`          | `bottom-start` |
| `offset?`     | Tooltip offset from trigger in pixels | `[number, number]`   | `[0, 6]`       |

```typescript
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
