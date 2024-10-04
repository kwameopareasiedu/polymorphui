# Accordion

[**_Docs_**](../README.md)

A component which shows and hides sections of related content on a page

```typescript jsx
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "polymorphui/accordion";
import { Text } from "polymorphui/text";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <Accordion>
      <AccordionItem value="section1">
        <AccordionHeader>
          <Text>Section 1 Header</Text>
        </AccordionHeader>

        <AccordionPanel>
          <Text>Section 1 Content</Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="section2">
        <AccordionHeader>
          <Text>Section 2 Header</Text>
        </AccordionHeader>

        <AccordionPanel>
          <Text>Section 2 Content</Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="section3">
        <AccordionHeader>
          <Text>Section 3 Header</Text>
        </AccordionHeader>

        <AccordionPanel>
          <Text>Section 3 Content</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
```

_Extends_ `HTMLAttributes<HTMLDivElement>`

| Props           | Description                                        | Type                        | Default     |
|-----------------|----------------------------------------------------|-----------------------------|-------------|
| `variant?`      | Variant(s) to style with                           | `string \| string[]`        | `"default"` |
| `multiple?`     | Display multiple open sections                     | `boolean`                   | `false`     |
| `defaultValue?` | Section value(s) to open initially if uncontrolled | `string[]`                  |             |
| `value?`        | Opened section value(s) if controlled              | `string[]`                  |             |
| `onChange?`     | Called when the value changes if controlled        | `(value: string[]) => void` |             |
