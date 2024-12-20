# UseQueryParam

[**_Docs_**](../README.md)

A hook which monitors and updates a single query parameter

> Must be a descendant of a router component from [react-router-dom](https://reactrouter.com/7.0.2/home)

```typescript jsx
import { useQueryParam } from "polymorphui/useQueryParam";

// URL: localhost:5173/home?name=Kwame&dialog=create
export function Example() {
  const [name, setName] = useQueryParam("name");
  const [dialog, setDialog] = useQueryParam("dialog");
  
  console.log({ name, dialog }); // { name: "Kwame", dialog: "create" }
  
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
