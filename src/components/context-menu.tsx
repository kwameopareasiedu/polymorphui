import React, { forwardRef, HTMLAttributes, ReactNode, useRef } from "react";
import { resolveClassName } from "@/components/utils";
import { Popup, PopupController } from "@/components/popup";
import ArrowRight from "@/assets/arrow-right.svg";

export type ContextMenuItem = {
  icon?: ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  items?: ContextMenuItem[];
};

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
  items: ContextMenuItem[];
  controller?: PopupController;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ variant = "default", items, className, controller, children, ...rest }: ContextMenuProps, ref) => {
    const _className = resolveClassName(
      "contextMenu",
      variant,
      "contextMenu",
      "flex flex-col bg-white border-[0.5px] border-gray-300 text-gray-600 overflow-hidden rounded text-sm " +
        "[&>button]:inline-grid [&>button]:gap-2 [&>button]:grid-cols-[30px,1fr,30px] [&>button]:justify-start " +
        "[&>button]:items-center [&>button]:py-1.5 [&>button]:border-t-[0.5px] [&>button]:border-t-gray-300 " +
        "[&>button:first-child]:border-none [&>button:hover]:bg-gray-100 [&>button:disabled]:bg-gray-200 " +
        "[&>button:disabled]:opacity-50 ",
      className,
    );

    const renderContextMenuRoot = (items: ContextMenuItem[]) => {
      return (
        <div className={_className}>
          {items.map((item, idx) => {
            const hasMoreItems = item.items && item.items.length > 0;

            const button = (
              <button key={idx} type="button" onClick={item.onClick} disabled={item.disabled}>
                {item.icon && <span className="col-start-1 col-span-1">{item.icon}</span>}
                <span className="col-start-2 col-span-1">{item.label}</span>
                {hasMoreItems && (
                  <span className="col-start-3 col-span-1 grid place-items-center">
                    <ArrowRight {...({ className: "w-3" } as object)} />
                  </span>
                )}
              </button>
            );

            if (hasMoreItems) {
              return (
                <Popup
                  key={idx}
                  ref={ref}
                  when="click"
                  variant={null}
                  placement="right-start"
                  usePortal={false}
                  offset={[0, 4]}
                  autoClose
                  {...rest}>
                  {button}
                  {renderContextMenuRoot(item.items!)}
                </Popup>
              );
            } else return button;
          })}
        </div>
      );
    };

    return (
      <Popup
        ref={ref}
        when="click"
        variant={null}
        controller={controller}
        placement="right-start"
        offset={[0, 4]}
        autoClose
        {...rest}>
        {children}
        {renderContextMenuRoot(items)}
      </Popup>
    );
  },
);
