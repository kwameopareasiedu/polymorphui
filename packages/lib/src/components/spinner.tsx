import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";
import RingBgIcon from "../assets/ring-bg.svg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: VariantNameType | VariantNameType[];
  icon?: ReactNode;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { variant, icon = <RingBgIcon />, className, ...rest }: SpinnerProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName(
    "spinner",
    variant,
    "spinner inline-block animate-spin",
    "fill-blue-500 w-4",
    className,
  );

  return (
    <span ref={ref} className={_className} {...rest}>
      {icon}
    </span>
  );
});
