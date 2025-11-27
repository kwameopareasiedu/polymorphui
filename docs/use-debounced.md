# UseDebounced

[**_Docs_**](../README.md)

A hook which debounces a state value some time after the last change

A classic use-case is debouncing filter state values before calling an API

```typescript jsx
import { useDebounced } from "polymorphui/use-debounced";

export function Example() {
  const [value, debouncedValue, setValue] = useDebounced("name", 1000); // debouncedValue updates 1000ms after the last update of value

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)}/>
      <p>Debounced value (updates after 1000ms): {debounced}</p>
    </div>
  );
}
```
