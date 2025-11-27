# UseWindowSizeInRange

[**_Docs_**](../README.md)

A hook which returns `true` if the window size is within a specific range, or `false` otherwise

```typescript jsx
import { useEffect } from "react";
import { useWindowSizeInRange } from "polymorphui/use-window-size-in-range";

export function Example() {
  const isMobileScreen = useWindowSizeInRange(0, 640); // isMobile is true if the window size is between 0 and 640 pixels

  useEffect(() => console.log(isMobileScreen), [isMobileScreen]);
}
```
