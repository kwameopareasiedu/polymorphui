import { Button } from "polymorphui/button";
import { Switch } from "polymorphui/switch";
import { Text } from "polymorphui/text";
import { Tooltip } from "polymorphui/tooltip";
import { useState } from "react";

function App() {
  const [busy, setBusy] = useState(false);
  const [checked, setChecked] = useState(false);

  const startSomething = () => {
    setTimeout(() => setBusy(false), 1500);
    setBusy(true);
  };

  return (
    <div className="space-y-2.5">
      <Text>Hello World</Text>

      <Tooltip description="Action button">
        <Button loading={busy} onClick={startSomething}>
          Start Something
        </Button>
      </Tooltip>

      <Switch
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
}

export default App;
