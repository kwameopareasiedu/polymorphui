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
import { Select } from "prontoui/select";
import { Switch } from "prontoui/switch";
import { Checkbox } from "prontoui/checkbox";
import { RadioGroup, RadioGroupItem } from "prontoui/radio-group";
import { InputLabel } from "prontoui/input-helpers";

const popupController = new PopupController();

function App() {
  const [inputText, setInputText] = useState("");
  const [areaText, setAreaText] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioGroupValue, setRadioGroupValue] = useState("");

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
          options={[
            { label: "Apple", value: "apple" },
            { label: "Orange", value: "orange" },
            { label: "Grapes", value: "grapes" },
            { label: "Pear", value: "pear" },
          ]}
          value={selectValue}
          label="Favorite fruits"
          leading={<BiNotepad />}
          placeholder="Select fruit"
          error="Error text"
          helper="Helper text"
          onChange={(e) => {
            setSelectValue(e.target.value);
          }}
        />

        <Select
          options={[
            { label: "Apple", value: "apple" },
            { label: "Orange", value: "orange" },
            { label: "Grapes", value: "grapes" },
            { label: "Pear", value: "pear" },
          ]}
          value={multiSelectValue}
          placeholder="Select fruits"
          error="Error text"
          helper="Helper text"
          onChange={(e) => {
            setMultiSelectValue(e.target.value);
          }}
        />

        <Select options={[]} placeholder="Bio here" disabled />
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

        <div className="inline-flex items-center gap-2">
          <Switch
            id="switch"
            checked={switchChecked}
            onChange={(e) => {
              setSwitchChecked(e.target.checked);
            }}
          />
          <Text as="label" htmlFor="switch">
            I&apos;m a switch
          </Text>
        </div>
      </Showcase>

      <Showcase title="Checkbox">
        <InputLabel className="inline-flex items-center gap-2">
          Sell my privacy
          <Checkbox
            id="checkbox"
            checked={switchChecked}
            onChange={(e) => {
              setSwitchChecked(e.target.checked);
            }}
          />
        </InputLabel>

        <Checkbox disabled />
      </Showcase>

      <Showcase title="Radio Group">
        <InputLabel>Favorite day in the week?</InputLabel>
        <RadioGroup className="w-full" value={radioGroupValue} onChange={(e) => setRadioGroupValue(e.target.value)}>
          {[
            ["Monday", "monday"],
            ["Tuesday", "tuesday"],
            ["Wednesday", "wednesday"],
            ["Thursday", "thursday"],
            ["Friday", "friday"],
            ["Saturday", "saturday"],
            ["Sunday", "sunday"],
          ].map(([label, value]) => (
            <InputLabel className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value={value} />
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
            ["M", "monday"],
            ["T", "tuesday"],
            ["W", "wednesday"],
            ["T", "thursday"],
            ["F", "friday"],
            ["S", "saturday"],
            ["S", "sunday"],
          ].map(([label, value]) => (
            <InputLabel className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value={value} />
              {label}
            </InputLabel>
          ))}
        </RadioGroup>
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
