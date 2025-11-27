import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import { Popup } from "@/components/popup";
import { Text } from "@/components/text";
import { Placement } from "@popperjs/core";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  description: string;
  delayMs?: number;
  disabled?: boolean;
  offset?: [number, number];
  placement?: Placement;
  children: ReactElement;
}

export const Tooltip = forwardRef<HTMLParagraphElement, TooltipProps>(function Tooltip(
  {
    description,
    delayMs,
    disabled,
    className,
    offset = [0, 6],
    placement = "bottom-start",
    children,
    ...rest
  }: TooltipProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <Popup
      openEvent="triggerEnter"
      closeEvent="triggerLeave"
      openDelayMs={delayMs}
      placement={placement}
      offset={offset}
      open={disabled ? false : undefined}>
      {children}

      <Text
        ref={ref}
        className={resolveClassName(
          "tooltip",
          "tooltip",
          "bg-white border-[0.5px] border-gray-600 text-xs text-gray-600 px-1.5 py-0.5",
          className,
        )}
        {...rest}>
        {description}
      </Text>
    </Popup>
  );
});
