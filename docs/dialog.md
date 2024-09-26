# Dialog

[**_Docs_**](../README.md)

A component which displays content over the primary window

```typescript jsx
import { Dialog, DialogContent, DialogClose } from "polymorphui/dialog";
import { Button } from "polymorphui/button";
import { Text } from "polymorphui/text";

export function Example() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>Open Dialog</Button>

      {showDialog && (
        <Dialog onClose={() => setShowDialog(false)} dismissible>
          <DialogContent>
            <DialogClose />

            <Text as="h1" className="!text-5xl">
              Hello World
            </Text>

            <Text as="h1" className="mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, incidunt, minus? Architecto, atque
              consequatur distinctio dolorem ea fugiat fugit illum iusto nulla quaerat, ratione repellendus similique
              suscipit temporibus tenetur voluptatibus.
            </Text>

            <Text as="h1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, incidunt, minus? Architecto, atque
              consequatur distinctio dolorem ea fugiat fugit illum iusto nulla quaerat, ratione repellendus similique
              suscipit temporibus tenetur voluptatibus.
            </Text>

            <div className="flex justify-end">
              <Button className="bg-black" onClick={() => setShowDialog(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
```

_Extends_ `HTMLAttributes<HTMLDivElement`

| Props          | Description                                              | Type                 | Default     |
|----------------|----------------------------------------------------------|----------------------|-------------|
| `variant?`     | Variant(s) to style with                                 | `string \| string[]` | `"default"` |
| `dismissible?` | Close dialog if escape is pressed or backdrop is clicked | `boolean`            | `false`     |
| `onClose`      | Function to call when a close event occurs               | `() => void`         |             |
