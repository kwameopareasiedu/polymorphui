# Spinner

[**_Docs_**](../README.md)

A component which indicates that an operation is in progress

```typescript jsx
import { Spinner } from "polymorphui/spinner";

export function Example() {
  return <Spinner />;
}
```

_Extends_ `HTMLAttributes<HTMLSpanElement>`

| Props   | Description            | Type        | Default              |
|---------|------------------------|-------------|----------------------|
| `icon?` | Spinner icon to render | `ReactNode` | `<Ring />` (Inbuilt) |
