import { ReactNode } from "react";
import { Button } from "polymorphui/button";
import { Tooltip } from "polymorphui/tooltip";
import { ContextMenu, ContextMenuItem, ContextMenuItems } from "polymorphui/context-menu";

export default function Isolate() {
  return (
    <main className="p-4 flex flex-wrap items-start gap-8 ">
      <Showcase title="Context Menu">
        <ContextMenu>
          <span>
            <Tooltip description="Opens the menu">
              <Button>Open menu</Button>
            </Tooltip>
          </span>

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
