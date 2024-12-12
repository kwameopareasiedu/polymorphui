import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import RingBg from "@/assets/ring-bg.svg";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: VariantNameType | VariantNameType[];
  icon?: ReactNode;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { variant, icon = <RingBg />, className, ...rest }: SpinnerProps,
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
