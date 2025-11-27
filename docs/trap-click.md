# Trap Click

[**_Docs_**](../README.md)

A component which prevents click actions from bubbling up to ancestor elements

This is useful if you need to isolate clicks of a nested element

```typescript jsx
import { TrapClick } from "polymorphui/trap-click";

export function Example() {
  return (
    <div onClick={() => console.log("Clicked div")}>
      <TrapClick> {/* Prevents button click from reaching div element onClick */}
        <button onClick={() => console.log("Clicked button")}>Click Me</button>
      </TrapClick>
    </div>
  );
}
```
