# Popup

[**_Docs_**](../README.md)

A component which displays popup content when the trigger is activated

```typescript jsx
import { Popup } from "polymorphui/popup";
import { Button } from "polymorphui/button";
import { Text } from "polymorphui/text";

export function Example() {
  return (
    <Popup
      openEvent="triggerEnter"
      closeEvent={["triggerLeave", "outsideClick"]}
      placement="bottom-start"
      offset={[0, 0]}
      openDelayMs={500}
      closeDelayMs={250}
      onOpen={() => console.log("Opened")}
      onClose={() => console.log("Closed")}>
      {/* Trigger element */}
      <Button>Open Popup</Button>

      {/* Popup/Floating element */}
      <div className="w-32">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ducimus incidunt minus nam quod rerum
          saepe sequi, voluptas voluptate voluptatibus. Aspernatur assumenda consectetur debitis dolorem inventore
          possimus praesentium quas suscipit!
        </Text>
      </div>
    </Popup>
  );
}
```

| Props           | Description                                                   | Type                                   | Default      |
|-----------------|---------------------------------------------------------------|----------------------------------------|--------------|
| `variant?`      | Variant(s) to style with                                      | `string \| string[]`                   | `"default"`  |
| `openEvent?`    | Event(s) to open popup                                        | `OpenEventType \| OpenEventType[]`     |              |
| `closeEvent?`   | Event(s) to close popup                                       | `CloseEventType \| CloseEventType[]`   |              |
| `children`      | Children array                                                | `[ReactNode, ReactNode]`               |              |
| `placement?`    | Popup position relative to trigger                            | `Placement`                            | `auto-start` |
| `offset?`       | Popup offset from trigger in pixels                           | `[number, number]`                     |              |
| `openDelayMs?`  | If `openEvent` includes `triggerEnter`, delay before opening  | `number`                               | `250`        |
| `closeDelayMs?` | If `closeEvent` includes `triggerLeave`, delay before closing | `number`                               | `250`        |
| `onOpen?`       | Called when popup opens                                       | `() => void`                           |              |
| `onClose?`      | Called when popup closes                                      | `() => void`                           |              |
| `controller?`   | Controller object(s) to control popup externally              | `PopupController \| PopupController[]` |              |

```typescript
type OpenEventType = "triggerEnter" | "triggerClick";

type CloseEventType = "triggerLeave" | "triggerClick" | "outsideClick";

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
