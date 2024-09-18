import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, resolveClassName } from "@/components/utils";
import { Spinner } from "@/components/spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
  flex?: boolean;
}

export function Button({
  variant = "default",
  leading,
  trailing,
  loading,
  flex,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const _className = resolveClassName(
    "button",
    variant,
    cn("button flex justify-center items-center gap-1", flex && "w-full"),
    "bg-blue-500 px-2 py-1 rounded-sm text-white text-sm font-medium transition-opacity enabled:hover:opacity-85 enabled:active:translate-y-[1px] focus:outline-0 focus:opacity-85 disabled:opacity-50",
    className,
  );

  return (
    <button className={_className} disabled={disabled || loading} {...rest}>
      {loading ? <Spinner variant="button" /> : <span className="leading">{leading}</span>}
      {children}
      {<span className="trailing">{trailing}</span>}
    </button>
  );
}
