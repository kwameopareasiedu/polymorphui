import React, { HTMLAttributes, ReactNode } from "react";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default";
  size?: number;
  icon?: ReactNode;
}

export function Spinner({ variant, ...rest }: SpinnerProps) {
  // const { size, icon, ...rest } = merge(themeVariant.spinner, props);
  return <span></span>;
}
