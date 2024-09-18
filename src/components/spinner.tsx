import React, { HTMLAttributes, ReactNode } from "react";
import { useVariantProps } from "@/components/utils";
import RingBg from "@/assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
  icon?: ReactNode;
}

export function Spinner({ variant = "default", ...props }: SpinnerProps) {
  const { icon, ...rest } = useVariantProps({
    componentName: "spinner",
    componentProps: props,
    variantName: variant,
    defaultProps: {
      className: "inline-block w-4 animate-spin",
      icon: <RingBg />,
    },
  });

  console.log(rest);

  return <span {...rest}>{icon}</span>;
}
