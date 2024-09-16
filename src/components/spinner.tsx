import React, { HTMLAttributes, ReactNode } from "react";
import { cn, useComponentVariants } from "@/components/utils";
import RingBg from "@/assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default";
  size?: number;
  icon?: ReactNode;
}

export function Spinner({ variant = "default", ...props }: SpinnerProps) {
  const { size = 8, icon = <RingBg />, className, ...rest } = useComponentVariants("spinner", props, variant);
  const _className = cn(className, "inline-block");

  return (
    <span className={_className} {...rest} style={{ width: size + "px", height: size + "px" }}>
      {icon}
    </span>
  );
}
