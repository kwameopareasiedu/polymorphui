import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, useComponentVariants } from "@/components/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default";
  size?: "sm" | "md" | "lg";
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
  flex?: boolean;
}

export function Button({ variant = "default", ...props }: ButtonProps) {
  const { size, className, leading, trailing, loading, flex, disabled, children, ...rest } = useComponentVariants({
    componentName: "button",
    componentProps: props,
    variantName: variant,
    defaultProps: { size: "md" },
  });

  const _className = cn(flex && "w-full", className);

  return (
    <button className={_className} disabled={disabled || loading} {...rest}>
      <span className="inline-grid items-center grid-cols-[auto,auto,auto] gap-2">
        {leading}
        {children}
        {trailing}
      </span>
    </button>
  );
}
