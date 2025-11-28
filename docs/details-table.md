# DetailsTable

[**_Docs_**](../README.md)

A 2-column table component for display an object's details

```typescript jsx
import { DetailsTable } from "polymorphui/details-table";
import { Text } from "polymorphui/text";
import { Button } from "polymorphui/button";

export function Example() {
  return (
    <DetailsTable
      className="[&_p]:text-sm"
      loading={assets.isPending}
      data={[
        ["Name", "John Doe", true, /* Visible */],
        [<Text key="key">Age</Text>, <Text key="key">29</Text>, true /* Hidden */],
      ]}
      footer={
        <Button>Edit</Button>
      }
    />
  );
}
```

| Props      | Description                                                                   | Type                                | Default |
|------------|-------------------------------------------------------------------------------|-------------------------------------|---------|
| `header?`  | Optional header component to display                                          | `ReactNode`                         |         |
| `footer?`  | Optional footer component to display                                          | `ReactNode`                         |         |
| `data`     | Data rows to display. This array has the format [`label`, `value`, `visible`] | `[ReactNode, ReactNode, boolean][]` |         |
| `loading?` | Display a skeleton loader when `true`                                         | `boolean`                           |         |
