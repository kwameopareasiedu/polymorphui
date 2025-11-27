# Breadcrumbs

[**_Docs_**](../README.md)

A component which displays the current navigation using a hierarchy of links

```typescript jsx
import { Link } from "react-router";
import { BreadcrumbItem, Breadcrumbs } from "polymorphui/breadcrumbs";
import { FiChevronsRight } from "react-icons/fi";

export function Example() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href="/home/profile">Profile</BreadcrumbItem>
        <BreadcrumbItem href="/home/profile/settings">Settings</BreadcrumbItem>
      </Breadcrumbs>

      <Breadcrumbs separator=">">
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href="/home/profile">Profile</BreadcrumbItem>
        <BreadcrumbItem href="/home/profile/settings">Settings</BreadcrumbItem>
      </Breadcrumbs>

      <Breadcrumbs separator={<FiChevronsRight />}>
        <BreadcrumbItem as={Link} to="/home">Home</BreadcrumbItem>
        <BreadcrumbItem as={Link} to="/home/profile">Profile</BreadcrumbItem>
        <BreadcrumbItem as={Link} to="/home/profile/settings">Settings</BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
}
```

_Extends_ `HTMLAttributes<HTMLDivElement>`

| Props        | Description                                | Type                 | Default |
|--------------|--------------------------------------------|----------------------|---------|
| `separator?` | String or component to separate items with | `ReactNode`          | `"/"`   |
