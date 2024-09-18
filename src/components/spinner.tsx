import React, { HTMLAttributes, ReactNode } from "react";
import { resolveClassName } from "@/components/utils";
import RingBg from "@/assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
  icon?: ReactNode;
}

export function Spinner({ variant = "default", icon = <RingBg />, className, ...rest }: SpinnerProps) {
  const _className = resolveClassName(
    "spinner",
    variant,
    "spinner inline-block animate-spin",
    "fill-blue-500 w-4",
    className,
  );

  return (
    <span className={_className} {...rest}>
      {icon}
    </span>
  );
}
