import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import { Popup } from "@/components/popup";
import { Text } from "@/components/text";
import { Placement } from "@popperjs/core";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  variant?: string | string[];
  description: string;
  delayMs?: number;
  offset?: [number, number];
  placement?: Placement;
  children: ReactElement;
}

export const Tooltip = forwardRef<HTMLParagraphElement, TooltipProps>(function Tooltip(
  {
    variant = "default",
    description,
    delayMs,
    className,
    offset = [0, 6],
    placement = "bottom-start",
    children,
    ...rest
  }: TooltipProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName(
    "tooltip",
    variant,
    "tooltip",
    "bg-white border-[0.5px] border-gray-600 text-xs text-gray-600 px-1.5 py-0.5",
    className,
  );

  return (
    <Popup
      openEvent="triggerEnter"
      closeEvent="triggerLeave"
      openDelayMs={delayMs}
      placement={placement}
      offset={offset}>
      {children}

      <Text ref={ref} variant={null} className={_className} {...rest}>
        {description}
      </Text>
    </Popup>
  );
});
