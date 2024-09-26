# Text

[**_Docs_**](../README.md)

A component which indicates that an operation is in progress

```typescript jsx
import { Text } from "polymorphui/text";

export function Example() {
  return (
    <Text as="p" inline>
      Hello World!
    </Text>
  );
}
```

_Extends_ `LabelHTMLAttributes<HTMLParagraphElement>`

| Props      | Description               | Type                                                                     | Default     |
|------------|---------------------------|--------------------------------------------------------------------------|-------------|
| `variant?` | Variant(s) to style with  | `string \| string[]`                                                     | `"default"` |
| `as?`      | HTML element to render    | `h1 \| h2 \| h3 \| h4 \| h5 \| h6 \| p \| span \| strong \| li \| label` | `p`         |
| `inline?`  | Render inline with `span` | `boolean`                                                                | `false`     |
