import React, { ButtonHTMLAttributes, Children, forwardRef, HTMLAttributes, ReactElement, ReactNode } from "react";
import { resolveClassName } from "@/components/utils";
import { Popup, PopupController } from "@/components/popup";
import ArrowRight from "@/assets/arrow-right.svg";

const internalPopupController = new PopupController();

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  controller?: PopupController;
  children: [ReactNode, ReactElement<ContextMenuItemsProps>];
}

export const ContextMenu = ({ controller, children, ...rest }: ContextMenuProps) => {
  const [anchor, items] = children;

  return (
    <Popup
      openEvent="triggerClick"
      closeEvent="outsideClick"
      controller={controller ? [controller, internalPopupController] : internalPopupController}
      placement="right-start"
      offset={[0, 4]}
      {...rest}>
      {anchor}
      {items}
    </Popup>
  );
};

export interface ContextMenuItemsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: string | string[];
  children: OneOrMany<ReactElement>;
}

export const ContextMenuItems = forwardRef<HTMLDivElement, ContextMenuItemsProps>(
  ({ variant = "default", className, children, ...rest }: ContextMenuItemsProps, ref) => {
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
  },
);

export interface ContextMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: string | string[];
  label: ReactNode;
  icon?: ReactNode;
  children?: ReactElement;
}

export const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  (
    { variant = "default", label, icon, className, children, disabled, onClick, ...rest }: ContextMenuItemProps,
    ref,
  ) => {
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
        internalPopupController.close();
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
  },
);
