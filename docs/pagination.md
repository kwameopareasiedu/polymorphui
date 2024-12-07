# Pagination

[**_Docs_**](../README.md)

A component which displays pagination buttons for a list of items

```typescript jsx
import { Pagination } from "polymorphui/pagination";
import { useState } from "react";

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      pageSize={50}
      totalCount={1000}
      visibleWidth={3}
      onPageChange={page => setPage(page)}
    />
  );
}
```

_Extends_ `HTMLAttributes<HTMLDivElement>`

| Props           | Description                          | Type                     | Default |
|-----------------|--------------------------------------|--------------------------|---------|
| `variant?`      | Variant(s) to style with             | `string \| string[]`     |         |
| `page`          | Current page of the list             | `number`                 |         |
| `pageSize`      | Number of items per page             | `number`                 |         |
| `totalCount`    | Total number of items in data source | `number`                 |         |
| `visibleWidth?` | Number of visible page buttons       | `number`                 |         |
| `onPageChange?` | Function to call on page change      | `(page: number) => void` |         |
