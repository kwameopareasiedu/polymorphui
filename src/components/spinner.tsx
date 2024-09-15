import React, { HTMLAttributes, ReactNode } from "react";
import themeDefault from "@/theme-default";
import themeUser from "@/theme-user";
import { cn, deepMerge } from "@/utils";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default";
  size?: number;
  icon?: ReactNode;
}

const defaultVariants = themeDefault.spinner ?? ({} as ComponentVariantMap<SpinnerProps>);
const userVariants = themeUser.spinner ?? ({} as ComponentVariantMap<SpinnerProps>);
const mergedVariants = deepMerge(defaultVariants, userVariants);

export function Spinner({ variant = "default", ...props }: SpinnerProps) {
  const { size, icon, className, ...rest } = deepMerge(mergedVariants[variant] ?? {}, props);
  const _className = cn(className, "inline-block");

  return (
    <span className={_className} {...rest} style={{ width: size + "px", height: size + "px" }}>
      {icon}
    </span>
  );
}
