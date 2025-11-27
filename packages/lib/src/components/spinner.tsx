import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import RingBgIcon from "../assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: ReactNode;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { icon = <RingBgIcon />, className, ...rest }: SpinnerProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <span
      ref={ref}
      className={resolveClassName("spinner", "spinner inline-block animate-spin", "fill-primary size-4", className)}
      {...rest}>
      {icon}
    </span>
  );
});
