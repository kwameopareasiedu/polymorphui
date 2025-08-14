# UseQueryParams

[**_Docs_**](../README.md)

A hook which monitors and updates multiple query parameters

> Must be in a descendant of a router component from [react-router](https://reactrouter.com/7.8.0/home)

```typescript jsx
import { useQueryParams } from "polymorphui/useQueryParams";

// URL: localhost:5173/home?name=Kwame&region=Eastern
export function Example() {
  const [params, setParam] = useQueryParams({ name: "Kwame", region: "Eastern" })

  console.log(params); // { name: "Kwame", region: "Eastern" }

  return (
    <div>
      <button onClick={() => setParam("name", "Opare")}>Change name param</button>
      <button onClick={() => setParam("region", "update")}>Change region param</button>

      <button onClick={() => setParam("name", undefined)}>Delete name param</button>
      <button onClick={() => setParam("region", undefined)}>Delete region param</button>
    </div>
  );
}
```
