# Badge

[**_Docs_**](../README.md)

A component which displays a badge next to an anchor element/component.

```typescript jsx
import { Badge } from "polymorphui/badge";

export function Example() {
  const [unreadCount] = useState(20);

  return (
    <Badge placement="bottom-start" offset={[0, 10]} delayMs={500}>
      {/* Anchor element */}
      <p>Unread notifications</p>

      <p>{unreadCount}</p>
    </Badge>
  );
}
```

_Extends_ `HTMLAttributes<HTMLParagraphElement>`

| Props        | Description                        | Type                     | Default        |
| ------------ | ---------------------------------- | ------------------------ | -------------- |
| `variant?`   | Variant(s) to style with           | `string \| string[]`     | `"default"`    |
| `children`   | Children array                     | `[ReactNode, ReactNode]` |                |
| `placement?` | Badge position relative to anchor  | `Placement`              | `bottom-start` |
| `offset?`    | Badge offset from anchor in pixels | `[number, number]`       |                |

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
