# UseQueryParam

[**_Docs_**](../README.md)

A hook which monitors and updates a single query parameter

> Must be in a descendant of a router component from [react-router](https://reactrouter.com/7.8.0/home)

```typescript jsx
import { useQueryParam } from "polymorphui/useQueryParam";

// URL: localhost:5173/home?name=Kwame&dialog=create
export function Example() {
  const [name, setName] = useQueryParam("name");
  const [dialog, setDialog] = useQueryParam("dialog");
  
  console.log({ name });    // { name: "Kwame" }
  console.log({ dialog });  // { dialog: "create" }
  
  return (
    <div>
      <button onClick={() => setName("Opare")}>Change name param</button>
      <button onClick={() => setName("update")}>Change dialog param</button>
      
      <button onClick={() => setName(undefined)}>Delete name param</button>
      <button onClick={() => setName(undefined)}>Delete dialog param</button>
    </div>
  );
}
```
