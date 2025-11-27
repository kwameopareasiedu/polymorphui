# Trap Focus

[**_Docs_**](../README.md)

A component which prevents focus loss, by cycling focus between all focusable descendants

```typescript jsx
import { TrapFocus } from "polymorphui/trap-focus";

export function Example() {
  return (
    <TrapFocus> {/* Traps and switches focus between the input and button children when Tab is pressed */}
      <input type="text" />
      <button onClick={() => console.log("Clicked button")}>Click Me</button>
    </TrapFocus>
  );
}
```
