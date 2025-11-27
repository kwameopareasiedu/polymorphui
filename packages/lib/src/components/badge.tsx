import React, { Children, forwardRef, HTMLAttributes, ReactNode } from "react";
import { Popup } from "@/components/popup";
import { Placement } from "@popperjs/core";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
  disabled?: boolean;
  offset?: [number, number];
  placement?: Placement;
  children: [ReactNode, ReactNode];
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(function Tooltip(
  { delayMs, disabled, className, offset, placement = "right", children, ...rest }: BadgeProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const [anchor, ...content] = Children.toArray(children);

  return (
    <Popup
      openEvent={null}
      closeEvent={null}
      openDelayMs={delayMs}
      placement={placement}
      offset={offset}
      open={!disabled}>
      {anchor}

      <div
        ref={ref}
        className={resolveClassName(
          "badge",
          "badge",
          "px-2 py-0.5 rounded-full bg-primary-500 text-white text-sm",
          className,
        )}
        {...rest}>
        {content}
      </div>
    </Popup>
  );
});
