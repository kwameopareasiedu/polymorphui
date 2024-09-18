import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, useVariantProps } from "@/components/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
  flex?: boolean;
}

export function Button({ variant = "default", ...props }: ButtonProps) {
  const { className, leading, trailing, loading, flex, disabled, children, ...rest } = useVariantProps({
    componentName: "button",
    componentProps: props,
    variantName: variant,
  });

  const _className = cn(className, flex && "w-full");

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
