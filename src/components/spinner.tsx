import React, { HTMLAttributes, ReactNode } from "react";
import { cn, useComponentVariants } from "@/components/utils";
import RingBg from "@/assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default";
  size?: number;
  icon?: ReactNode;
}

export function Spinner({ variant = "default", ...props }: SpinnerProps) {
  const { size, icon, className, style, ...rest } = useComponentVariants({
    componentName: "spinner",
    componentProps: props,
    variantName: variant,
    defaultProps: { size: 20, icon: <RingBg /> },
  });

  return (
    <span
      className={cn("inline-block stroke-gray-600", className)}
      style={{ ...style, width: size + "px", height: size + "px" }}
      {...rest}>
      {icon}
    </span>
  );
}
