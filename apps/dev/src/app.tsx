import { Fragment, ReactNode, useState } from "react";
import { CgOptions } from "react-icons/cg";
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
import { BiNotepad, BiUser } from "react-icons/bi";
import { Spinner } from "polymorphui/spinner";
import { Button } from "polymorphui/button";
import { Text } from "polymorphui/text";
import { Popup } from "polymorphui/popup";
import { Tooltip } from "polymorphui/tooltip";
import { ContextMenu, ContextMenuItem, ContextMenuItems } from "polymorphui/context-menu";
import { Input } from "polymorphui/input";
import { TextArea } from "polymorphui/textarea";
import { Select, SelectItem } from "polymorphui/select";
import { Switch } from "polymorphui/switch";
import { Checkbox } from "polymorphui/checkbox";
import { RadioGroup, RadioGroupItem } from "polymorphui/radio-group";
import { InputLabel } from "polymorphui/input-helpers";
import { Dialog, DialogClose, DialogContent } from "polymorphui/dialog";
import { TabItem, TabItems, TabPanel, Tabs } from "polymorphui/tabs";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "polymorphui/accordion";
import { FaChevronDown } from "react-icons/fa6";

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);

  const [inputText, setInputText] = useState("");
  const [areaText, setAreaText] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>(["apples"]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioGroupValue, setRadioGroupValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [activeSection, setActiveSection] = useState<string[]>([]);

  return (
    <main className="p-4 flex flex-wrap items-start gap-8 ">
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

        <Popup placement="top-start" offset={[0, 10]} openEvent="triggerClick" closeEvent="triggerClick">
          <Button>Click popup</Button>
          <Text>Click the button again to close me</Text>
        </Popup>

        <Popup placement="left-start" offset={[0, 10]} openEvent="triggerClick" closeEvent="outsideClick">
          <Button>Outside close popup</Button>
          <Text>Click outside this popup to close me</Text>
        </Popup>

        <Popup
          open={popupOpen}
          offset={[0, 10]}
          placement="right-start"
          openEvent="triggerClick"
          closeEvent={null}
          onChange={setPopupOpen}>
          <Button>Controlled popup</Button>

          <div className="flex flex-col gap-2 py-2">
            <Text>Click the button below to close this popup</Text>
            <Button onClick={() => setPopupOpen(false)} trailing={<AiOutlineClose />}>
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
      </Showcase>

      <Showcase title="Tabs">
        <Tabs as={Fragment}>
          <TabItems>
            <Tooltip description="First tab">
              <TabItem value="first">First</TabItem>
            </Tooltip>
            <TabItem value="second">Second</TabItem>
            <TabItem value="third">Third</TabItem>
          </TabItems>

          <TabPanel value="first" className="w-full p-4 bg-white">
            <Text>First tab panel content</Text>
          </TabPanel>

          <TabPanel value="second" className="w-full p-4 bg-white">
            <Text>Second tab panel content</Text>
          </TabPanel>

          <TabPanel value="third" className="w-full p-4 bg-white">
            <Text>Third tab panel content</Text>
          </TabPanel>
        </Tabs>

        <Tabs
          orientation="vertical"
          defaultValue="second"
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

        <Button onClick={() => setActiveTab("third")} disabled={activeTab === "third"}>
          Go to third panel
        </Button>
      </Showcase>

      <Showcase title="Accordion">
        <Text className="w-full">Single mode, Uncontrolled</Text>

        <Accordion className="w-full">
          <AccordionItem value="section1">
            <AccordionHeader>
              <Text>Section 1</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum debitis, deleniti exercitationem
                omnis placeat.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="section2">
            <AccordionHeader>
              <Text>Section 2</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                A amet cupiditate, dignissimos facere facilis fuga in incidunt magni odio odit porro temporibus
                voluptatum.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <hr className="w-full" />

        <Text className="w-full">Multiple mode, Uncontrolled</Text>

        <Accordion className="w-full" defaultValue={["section2"]} multiple>
          <AccordionItem value="section1">
            <AccordionHeader>
              <Text>Section 1</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum debitis, deleniti exercitationem
                omnis placeat.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="section2">
            <AccordionHeader>
              <Text>Section 2</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                A amet cupiditate, dignissimos facere facilis fuga in incidunt magni odio odit porro temporibus
                voluptatum.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="section3">
            <AccordionHeader>
              <Text>Section 3</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>Ad deleniti enim eos impedit perspiciatis quas quisquam quod.</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <hr className="w-full" />

        <Text className="w-full">Multiple mode, Controlled</Text>

        <Accordion className="w-full" value={activeSection} onChange={setActiveSection} multiple>
          <AccordionItem value="section1">
            <AccordionHeader className="flex items-center justify-between w-full">
              <Text>Section 1</Text>
              <FaChevronDown
                className={`transition-transform ${activeSection.includes("section1") ? "-rotate-90" : ""}`}
              />
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum debitis, deleniti exercitationem
                omnis placeat.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="section2">
            <AccordionHeader>
              <Text>Section 2</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>
                A amet cupiditate, dignissimos facere facilis fuga in incidunt magni odio odit porro temporibus
                voluptatum.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="section3">
            <AccordionHeader>
              <Text>Section 3</Text>
            </AccordionHeader>

            <AccordionPanel>
              <Text>Ad deleniti enim eos impedit perspiciatis quas quisquam quod.</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Showcase>
    </main>
  );
}

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
