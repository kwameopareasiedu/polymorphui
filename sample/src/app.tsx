import { ReactNode, useState } from "react";
import { CgOptions } from "react-icons/cg";
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
import { BiNotepad, BiUser } from "react-icons/bi";
import { Spinner } from "prontoui/spinner";
import { Button } from "prontoui/button";
import { Text } from "prontoui/text";
import { Popup, PopupController } from "prontoui/popup";
import { Tooltip } from "prontoui/tooltip";
import { ContextMenu, ContextMenuItem, ContextMenuItems } from "prontoui/context-menu";
import { Input } from "prontoui/input";
import { TextArea } from "prontoui/textarea";
import { Select, SelectItem } from "prontoui/select";
import { Switch } from "prontoui/switch";
import { Checkbox } from "prontoui/checkbox";
import { RadioGroup, RadioGroupItem } from "prontoui/radio-group";
import { InputLabel } from "prontoui/input-helpers";
import { Dialog, DialogClose, DialogContent } from "prontoui/dialog";

const popupController = new PopupController();

function App() {
  const [inputText, setInputText] = useState("");
  const [areaText, setAreaText] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioGroupValue, setRadioGroupValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  return (
    <main className="p-4 flex flex-wrap items-start gap-8">
      <Showcase title="Spinner">
        <Spinner />
      </Showcase>

      <Showcase title="Button">
        <Button>Button</Button>
        <Button leading={<CgOptions />}>Button with leading</Button>
        <Button trailing={<AiFillAlert />}>Button with trailing</Button>
        <Button loading>Loading button...</Button>
        <Button flex>Flex button</Button>
      </Showcase>

      <Showcase title="Text">
        <Text as="h3">Paragraph!</Text>
        <Text inline>Inline 1</Text>
        <Text inline>Inline 2</Text>
      </Showcase>

      <Showcase title="Tooltip">
        <Tooltip description="Update button description">
          <Button flex>Update</Button>
        </Tooltip>
      </Showcase>

      <Showcase title="Popup">
        <Popup placement="top-start" offset={[0, 10]} openEvent="triggerEnter" closeEvent="triggerLeave">
          <Button>Hover popup</Button>
          <Text>Move the cursor out to close me</Text>
        </Popup>

        <Popup
          placement="top-start"
          offset={[0, 10]}
          openEvent="triggerClick"
          closeEvent="triggerClick"
          onOpen={() => console.log("Opened")}
          onClose={() => console.log("Closed")}>
          <Button>Click popup</Button>
          <Text>Click the button again to close me</Text>
        </Popup>

        <Popup placement="left-start" offset={[0, 10]} openEvent="triggerClick" closeEvent="outsideClick">
          <Button>Outside close popup</Button>
          <Text>Click outside this popup to close me</Text>
        </Popup>

        <Popup
          placement="right-start"
          offset={[0, 10]}
          controller={popupController}
          openEvent="triggerClick"
          closeEvent={null}>
          <Button>Controller popup</Button>

          <div className="flex flex-col gap-2 py-2">
            <Text>Click the button below to close this popup</Text>
            <Button onClick={popupController.close} trailing={<AiOutlineClose />}>
              Close
            </Button>
          </div>
        </Popup>

        <Popup
          placement="bottom-start"
          offset={[0, 10]}
          openDelayMs={1500}
          openEvent="triggerEnter"
          closeEvent="triggerLeave">
          <Button>Long hover popup (1.5s)</Button>
          <Text>Move the cursor out to close me</Text>
        </Popup>
      </Showcase>

      <Showcase title="Context Menu">
        <ContextMenu>
          <Button>Open menu</Button>

          <ContextMenuItems>
            <p className="text-xs font-medium text-gray-500 bg-slate-50 px-4">Header 1</p>
            <ContextMenuItem label="Option 1" onClick={() => alert("Option 1 clicked")} />
            <ContextMenuItem label="Option 2">
              <ContextMenuItems>
                <ContextMenuItem label="Nested 1" onClick={() => alert("Nested 1 clicked")} />
                <ContextMenuItem label="Nested 2" onClick={() => alert("Nested 2 clicked")} />
              </ContextMenuItems>
            </ContextMenuItem>
            <ContextMenuItem label="Option 3" onClick={() => alert("Option 3 clicked")} />
            <ContextMenuItem label="Option 4">
              <ContextMenuItems>
                <ContextMenuItem label="Nested 1" onClick={() => alert("Nested 1 clicked")} />
                <ContextMenuItem label="Nested 2" onClick={() => alert("Nested 2 clicked")} />
                <ContextMenuItem label="Nested 3" onClick={() => alert("Nested 3 clicked")} />
                <ContextMenuItem label="Nested 4" onClick={() => alert("Nested 4 clicked")} />
              </ContextMenuItems>
            </ContextMenuItem>
          </ContextMenuItems>
        </ContextMenu>
      </Showcase>

      <Showcase title="Input">
        <Input placeholder="Input" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <Input leading={<BiUser />} placeholder="Disabled Input" disabled />
        <Input
          label="Label"
          value={inputText}
          trailing={<Spinner variant="default" />}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Tooltip description="Input showcase" offset={[0, 0]}>
          <Input
            error="Error text"
            helper="Helper text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Tooltip>
      </Showcase>

      <Showcase title="TextArea">
        <TextArea
          label={
            <div className="flex items-center justify-between">
              <span>Label</span>
              <small>{areaText.length} chars</small>
            </div>
          }
          leading={<BiNotepad className="mt-3" />}
          trailing={<Spinner variant="default" className="mt-3" />}
          placeholder="Bio here"
          value={areaText}
          error="Error text"
          helper="Helper text"
          onChange={(e) => setAreaText(e.target.value)}
        />
      </Showcase>

      <Showcase title="Select">
        <Select
          value={selectValue}
          label="Favorite fruit"
          leading={<BiNotepad />}
          placeholder="Select fruit"
          error="Error text"
          helper="Helper text"
          onChange={(e) => setSelectValue(e.target.value)}>
          <SelectItem value="apples">Apples</SelectItem>
          <SelectItem value="oranges">Oranges</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pears">Pears</SelectItem>
        </Select>

        <Select
          value={multiSelectValue}
          label="Favorite fruits"
          leading={<BiNotepad />}
          placeholder="Select fruits"
          error="Error text"
          helper="Helper text"
          onChange={(e) => setMultiSelectValue(e.target.value)}>
          <SelectItem value="apples">Apples</SelectItem>
          <SelectItem value="oranges">Oranges</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pears">Pears</SelectItem>
        </Select>

        <Select placeholder="Bio here" disabled />
      </Showcase>

      <Showcase title="Switch">
        <Switch
          checked={switchChecked}
          onChange={(e) => {
            setSwitchChecked(e.target.checked);
          }}
        />

        <Tooltip description="Disabled switch" placement="top-start">
          <span>
            <Switch disabled />
          </span>
        </Tooltip>

        <InputLabel className="inline-flex items-center gap-2" htmlFor="switch">
          <Switch
            id="switch"
            checked={switchChecked}
            onChange={(e) => {
              setSwitchChecked(e.target.checked);
            }}
          />
          I&apos;m a switch
        </InputLabel>
      </Showcase>

      <Showcase title="Checkbox">
        <Checkbox
          checked={switchChecked}
          onChange={(e) => {
            setSwitchChecked(e.target.checked);
          }}
        />

        <Checkbox
          id="checkbox"
          error="Error text"
          label="Sell my privacy"
          checked={switchChecked}
          onChange={(e) => {
            setSwitchChecked(e.target.checked);
          }}
        />

        <Checkbox disabled />
      </Showcase>

      <Showcase title="Radio Group">
        <RadioGroup
          label="Favorite day in the week?"
          className="w-full"
          value={radioGroupValue}
          error="Error text"
          helper="Helper text"
          onChange={(e) => setRadioGroupValue(e.target.value)}>
          {[
            ["Monday", "monday", false],
            ["Tuesday", "tuesday", true],
            ["Wednesday", "wednesday", true],
            ["Thursday", "thursday", true],
            ["Friday", "friday", true],
            ["Saturday", "saturday", true],
            ["Sunday", "sunday", true],
          ].map(([label, value, enabled]) => (
            <InputLabel key={value as string} className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value={value as string} disabled={!enabled} />
              {label}
            </InputLabel>
          ))}
        </RadioGroup>

        <RadioGroup
          className="w-full"
          value={radioGroupValue}
          onChange={(e) => setRadioGroupValue(e.target.value)}
          inline>
          {[
            ["M", "monday", false],
            ["T", "tuesday", true],
            ["W", "wednesday", true],
            ["T", "thursday", true],
            ["F", "friday", true],
            ["S", "saturday", true],
            ["S", "sunday", true],
          ].map(([label, value, enabled]) => (
            <InputLabel key={value as string} className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value={value as string} disabled={!enabled} />
              {label}
            </InputLabel>
          ))}
        </RadioGroup>
      </Showcase>

      <Showcase title="Dialog">
        <Button onClick={() => setShowDialog(true)}>Open Dialog</Button>

        {showDialog && (
          <Dialog onClose={() => setShowDialog(false)} dismissible>
            <DialogContent>
              <DialogClose />

              <Text as="h1" className="text-5xl">
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
      </Showcase>
    </main>
  );
}

export default App;

interface ShowcaseProps {
  title: string;
  children: ReactNode;
}

function Showcase({ title, children }: ShowcaseProps) {
  return (
    <div className="max-w-full sm:max-w-[386px] flex flex-col items-start gap-4 p-4 shadow-lg bg-gray-200 rounded-md">
      <p className="uppercase text-sm font-medium text-gray-700 tracking-wide">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
