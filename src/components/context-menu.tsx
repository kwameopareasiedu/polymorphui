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
import { resolveClassName } from "@/components/utils";
import { Popup } from "@/components/popup";
import ArrowRight from "@/assets/arrow-right.svg";

interface ContextMenuContextProps {
  onClose: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextProps>(null as never);

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
  variant?: string | string[];
  children: OneOrMany<ReactElement>;
}

export const ContextMenuItems = forwardRef<HTMLDivElement, ContextMenuItemsProps>(function ContextMenuItems(
  { variant = "default", className, children, ...rest }: ContextMenuItemsProps,
  ref,
) {
  const _className = resolveClassName(
    "contextMenuItems",
    variant,
    "contextMenuItems",
    "flex flex-col bg-white border-[0.5px] border-gray-300 text-gray-600 overflow-hidden rounded-sm text-sm",
    className,
  );

  return (
    <div ref={ref} className={_className} {...rest}>
      {children}
    </div>
  );
});

export interface ContextMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: string | string[];
  label: ReactNode;
  icon?: ReactNode;
  children?: ReactElement;
}

export const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(function ContextMenuItem(
  { variant = "default", label, icon, className, children, disabled, onClick, ...rest }: ContextMenuItemProps,
  ref,
) {
  const contextMenuContext = useContext(ContextMenuContext);

  if (!contextMenuContext) throw "<ContextMenuItem /> must be a descendant of <ContextMenu />";

  const hasItems = Children.count(children) > 0;

  const _className = resolveClassName(
    "contextMenuItem",
    variant,
    "contextMenuItem inline-grid grid-cols-[32px,1fr,32px] gap-2 items-center whitespace-nowrap",
    "py-1.5 border-t-[0.5px] border-t-gray-300 first:border-none hover:bg-gray-100 disabled:bg-gray-200 disabled:opacity-50 ",
    className,
  );

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (!hasItems) {
      contextMenuContext.onClose();
    }
  };

  const base = (
    <button {...rest} ref={ref} type="button" className={_className} onClick={handleOnClick} disabled={disabled}>
      {icon && <span className="col-start-1 col-span-1">{icon}</span>}
      <span className="col-start-2 col-span-1">{label}</span>
      {hasItems && (
        <span className="col-start-3 col-span-1 grid place-items-center">
          <ArrowRight {...({ className: "w-3" } as object)} />
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
