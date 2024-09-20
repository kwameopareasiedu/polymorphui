import React, { forwardRef, HTMLAttributes } from "react";
import { resolveClassName } from "@/components/utils";
import { Popup } from "@/components/popup";
import { Text } from "@/components/text";
import { Placement } from "@popperjs/core";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
  description: string;
  delayMs?: number;
  offset?: [number, number];
  placement?: Placement;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
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
  ) => {
    const _className = resolveClassName(
      "tooltip",
      variant,
      "tooltip",
      "bg-white border-[0.5px] border-gray-600 text-xs text-gray-600 px-1.5 py-0.5",
      className,
    );

    return (
      <Popup
        ref={ref}
        trigger="hover"
        variant={null}
        hoverDelayMs={delayMs}
        placement={placement}
        offset={offset}
        {...rest}>
        {children}
        <Text variant={null} className={_className}>
          {description}
        </Text>
      </Popup>
    );
  },
);
