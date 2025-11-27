import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Spinner } from "@/components/spinner";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
  flex?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { leading, trailing, loading, flex, disabled, className, children, ...rest }: ButtonProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "button",
        "button flex justify-center items-center gap-1",
        "bg-primary-500 px-2 py-1 rounded text-white text-sm font-medium transition-opacity enabled:hover:opacity-85 enabled:active:translate-y-[1px] focus:outline-0 focus:opacity-85 disabled:opacity-50 data-[flex=true]:w-full",
        className,
      )}
      disabled={disabled || loading}
      {...rest}
      data-flex={flex}
      data-loading={loading}>
      {loading ? <Spinner /> : <span className="leading">{leading}</span>}
      {children}
      {trailing && <span className="trailing">{trailing}</span>}
    </button>
  );
});
