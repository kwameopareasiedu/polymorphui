# Table

[**_Docs_**](../README.md)

A responsive table component with grouping and sorting capabilities

```typescript jsx
import { useState } from "react";
import { SortConfig, SortDirection, Table, TableRow } from "polymorphui/table";

export function Example() {
  const [sort, setSort] = useState<SortConfig>({ key: "", direction: SortDirection.NONE });

  return (
    <Table
      columns={[
        { id: "name", label: "Name", visible: true },
        { id: "age", label: "Age", visible: true },
        { id: "occupation", label: "Occupation", visible: true, sortable: false },
      ]}
      sort={sort}
      onSort={setSort}>
      <TableRow
        data={{ name: "John Doe", age: 20, occupation: "Doctor" }}
        defaultColumn={(_, val) => <Text>{val as never}</Text>}
      />
      <TableRow
        data={{ name: "Jane Does", age: 22, occupation: "Farmer" }}
        defaultColumn={(_, val) => <Text>{val as never}</Text>}
      />
    </Table>
  );
}
```

| Props            | Description                             | Type                         | Default |
|------------------|-----------------------------------------|------------------------------|---------|
| `columns`        | Column information array                | `TableColumn[]`              |         |
| `className?`     | Class name for the `<table>` component  | `string`                     |         |
| `headClassName?` | Class name for the `<thead>` component  | `string`                     |         |
| `sort?`          | Sort config for column sorting          | `SortConfig`                 |         |
| `responsive?`    | Use item cards in small screens         | `boolean`                    | `true`  |
| `loading?`       | Display a skeleton loader when `true`   | `boolean`                    |         |
| `onSort?`        | Called when the columns sorting changes | `(sort: SortConfig) => void` |         |

```typescript
interface TableColumn {
  id: string;
  label: ReactNode;
  visible?: boolean;
  sortable?: boolean;
}

enum SortDirection {
  NONE = "none",
  ASC = "asc",
  DESC = "desc",
}

interface SortConfig {
  key: string;
  direction: SortDirection;
}
```
