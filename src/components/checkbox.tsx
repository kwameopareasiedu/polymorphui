import React, { ButtonHTMLAttributes, forwardRef, MouseEvent } from "react";
import { resolveClassName } from "@/components/utils";
import Check from "@/assets/check.svg";

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  variant?: string | string[];
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ variant = "default", className, checked, onChange, onClick, ...rest }: CheckboxProps, ref) => {
    const _className = resolveClassName(
      "checkbox",
      variant,
      "checkbox inline-grid place-items-center w-5 h-5 rounded-sm cursor-pointer",
      "border-2 border-gray-300 transition-colors data-[checked=true]:bg-blue-400 " +
        "data-[checked=true]:border-blue-400 disabled:opacity-35",
      className,
    );

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      onChange?.({ target: { checked: !checked } });
      onClick?.(e);
    };

    return (
      <button ref={ref} className={_className} onClick={handleOnClick} {...rest} data-checked={checked}>
        {checked && <Check {...({ className: "w-4 text-white pointer-events-none" } as object)} />}
      </button>
    );
  },
);
