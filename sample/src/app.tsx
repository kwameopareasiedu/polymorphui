import { ReactNode } from "react";
import { CgOptions } from "react-icons/cg";
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
import { Spinner } from "prontoui/spinner";
import { Button } from "prontoui/button";
import { Text } from "prontoui/text";
import { Popup, PopupController } from "prontoui/popup";
import { Tooltip } from "prontoui/tooltip";
import { ContextMenu } from "prontoui/context-menu";

const popupController = new PopupController();

function App() {
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
        <Popup placement="top-start" offset={[0, 10]}>
          <Button>Hover popup</Button>
          <Text>Move the cursor out to close me</Text>
        </Popup>

        <Popup placement="top-start" offset={[0, 10]} when="click">
          <Button>Click popup</Button>
          <Text>Click the button again to close me</Text>
        </Popup>

        <Popup placement="left-start" offset={[0, 10]} when="click" autoClose>
          <Button>Outside close popup</Button>

          <Text>Click outside this popup to close me</Text>
        </Popup>

        <Popup controller={popupController} placement="right-start" offset={[0, 10]} when="click">
          <Button>Controller popup</Button>

          <div className="flex flex-col gap-2 py-2">
            <Text>Click the button below to close this popup</Text>
            <Button onClick={popupController.close} trailing={<AiOutlineClose />}>
              Close
            </Button>
          </div>
        </Popup>

        <Popup placement="bottom-start" offset={[0, 10]} hoverDelayMs={1500} autoClose>
          <Button>Long hover popup (1.5s)</Button>
          <Text>Move the cursor out to close me</Text>
        </Popup>
      </Showcase>

      <Showcase title="Context Menu">
        <ContextMenu
          controller={popupController}
          items={[
            { label: "Option 1" },
            {
              label: "Option 2",
              onClick: () => alert("Option 2 clicked"),
              items: [
                { label: "Nested 1" },
                {
                  label: "Nested 2",
                  items: [{ label: "Double Nested 1" }],
                },
              ],
            },
            {
              label: "Option 3",
              onClick: () => alert("Option 3 clicked"),
            },
          ]}>
          <Button>Open menu</Button>
        </ContextMenu>
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
    <div className="max-w-full sm:max-w-[386px] flex flex-col items-start gap-4 p-4 shadow-lg bg-slate-50 rounded-md">
      <p className="uppercase text-sm font-medium text-gray-700 tracking-wide">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
