# ContextMenu

[**_Docs_**](../README.md)

A component which displays action buttons related to a component

```typescript jsx
import { ContextMenu, ContextMenuItem, ContextMenuItems } from "polymorphui/context-menu";
import { Button } from "polymorphui/button";

export function Example() {
  return (
    <ContextMenu>
      <Button>Open menu</Button>

      <ContextMenuItems>
        <ContextMenuItem label="Option 1" onClick={() => alert("Option 1 clicked")} />

        <ContextMenuItem label="Option 2">
          <ContextMenuItems>
            <ContextMenuItem label="Nested 1" />
            <ContextMenuItem label="Nested 2" />
          </ContextMenuItems>
        </ContextMenuItem>
      </ContextMenuItems>
    </ContextMenu>
  );
}
```

| Props      | Description    | Type                                               | Default |
|------------|----------------|----------------------------------------------------|---------|
| `children` | Children array | `[ReactNode, ReactElement<ContextMenuItemsProps>]` |         |
