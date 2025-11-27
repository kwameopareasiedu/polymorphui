import React, {
  ButtonHTMLAttributes,
  Children,
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Popup } from "@/components/popup";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import ArrowRightIcon from "../assets/arrow-right.svg";

const ContextMenuContext = createContext<{
  onClose: () => void;
}>(null as never);

export interface ContextMenuProps {
  children: [ReactNode, ReactElement<ContextMenuItemsProps>];
}

export const ContextMenu = ({ children }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, items] = children;

  return (
    <ContextMenuContext.Provider value={{ onClose: () => setIsOpen(false) }}>
      <Popup
        open={isOpen}
        offset={[0, 4]}
        openEvent="triggerClick"
        closeEvent={["triggerClick", "outsideClick"]}
        placement="right-start"
        onChange={setIsOpen}>
        {anchor}
        {items}
      </Popup>
    </ContextMenuContext.Provider>
  );
};

export interface ContextMenuItemsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: OneOrMany<ReactElement>;
}

export const ContextMenuItems = forwardRef<HTMLDivElement, ContextMenuItemsProps>(function ContextMenuItems(
  { className, children, ...rest }: ContextMenuItemsProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "contextMenuItems",
        "contextMenuItems flex flex-col overflow-hidden",
        "bg-white border-[0.5px] border-gray-300 text-gray-600 rounded-sm text-sm",
        className,
      )}
      {...rest}>
      {children}
    </div>
  );
});

export interface ContextMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: ReactNode;
  icon?: ReactNode;
  children?: ReactElement;
}

export const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(function ContextMenuItem(
  { label, icon, className, children, disabled, onClick, ...rest }: ContextMenuItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const contextMenuContext = useContext(ContextMenuContext);
  if (!contextMenuContext) throw "<ContextMenuItem /> must be a descendant of <ContextMenu />";

  const hasItems = Children.count(children) > 0;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hasItems) contextMenuContext.onClose();

    onClick?.(e);
  };

  const base = (
    <button
      {...rest}
      ref={ref}
      type="button"
      className={resolveClassName(
        "contextMenuItem",
        "contextMenuItem inline-grid grid-cols-[32px,1fr,32px] gap-2 items-center whitespace-nowrap",
        "py-1.5 border-t-[0.5px] border-t-gray-300 first:border-none hover:bg-gray-100 disabled:bg-gray-200 disabled:opacity-50 ",
        className,
      )}
      onClick={handleOnClick}
      disabled={disabled}>
      {icon && <span className="col-start-1 col-span-1">{icon}</span>}

      <span className="col-start-2 col-span-1">{label}</span>

      {hasItems && (
        <span className="col-start-3 col-span-1 grid place-items-center">
          <ArrowRightIcon {...({ className: "w-3" } as object)} />
        </span>
      )}
    </button>
  );

  if (hasItems) {
    return (
      <Popup
        openEvent="triggerEnter"
        closeEvent={["outsideClick", "triggerLeave"]}
        placement="right-start"
        offset={[0, -4]}>
        {base}
        {children}
      </Popup>
    );
  } else return base;
});
