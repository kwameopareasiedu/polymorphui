import React, { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { resolveClassName } from "@/components/utils";
import { InputLabel } from "@/components/input-helpers";
import Check from "@/assets/check.svg";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string | string[];
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant = "default", className, checked, onChange, id, ...rest }: CheckboxProps, ref) => {
    const _className = resolveClassName(
      "checkbox",
      variant,
      "checkbox inline-grid place-items-center w-5 h-5 rounded-sm cursor-pointer",
      "border-2 border-gray-300 transition-colors data-[checked=true]:bg-blue-400 " +
        "data-[checked=true]:border-blue-400",
      className,
    );

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.checked = !checked;
      onChange?.(e);
    };

    return (
      <InputLabel className={_className} htmlFor={id} data-checked={checked}>
        <input id={id} ref={ref} onChange={handleOnChange} {...rest} type="checkbox" hidden />
        {checked && <Check {...({ className: "w-4 text-white" } as object)} />}
      </InputLabel>
    );
  },
);
