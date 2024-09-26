# Tabs

[**_Docs_**](../README.md)

A component which displays a single tab panel based on the active tab

```typescript jsx
import { Dialog, DialogContent, DialogClose } from "polymorphui/dialog";
import { Button } from "polymorphui/button";
import { Text } from "polymorphui/text";

export function Example() {
  const [activeTab, setActiveTab] = useState("second");

  return (
    <Tabs
      orientation="horizontal"
      className="w-full flex items-start"
      value={activeTab}
      onChange={setActiveTab}>
      <TabItems>
        <Tooltip description="First tab">
          <TabItem value="first">First</TabItem>
        </Tooltip>
        <TabItem value="second">Second</TabItem>
        <TabItem value="third">Third</TabItem>
      </TabItems>

      <TabPanel value="first" className="w-full h-full p-4 bg-white">
        <Text>First tab panel content</Text>
      </TabPanel>

      <TabPanel value="second" className="w-full h-full p-4 bg-white">
        <Text>Second tab panel content</Text>
      </TabPanel>

      <TabPanel value="third" className="w-full h-full p-4 bg-white">
        <Text>Third tab panel content</Text>
      </TabPanel>
    </Tabs>
  );
}
```

_Extends_ `HTMLAttributes<HTMLDivElement`

| Props           | Description                                       | Type                             | Default        |
|-----------------|---------------------------------------------------|----------------------------------|----------------|
| `variant?`      | Variant(s) to style with                          | `string \| string[]`             | `"default"`    |
| `as?`           | Element or component to use as root               | `"div" \| (props) => JSXElement` | `"div"`        |
| `orientation?`  | Orientation of tabs                               | `"horizontal" \| "vertical"`     | `"horizontal"` |
| `value?`        | Controlled tab value                              | `string`                         |                |
| `defaultValue?` | Uncontrolled initial tab value                    | `string`                         |                |
| `onChange`      | Function to call on tab change in controlled mode | `(value: string) => void`        |                |
