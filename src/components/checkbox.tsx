import React, { ButtonHTMLAttributes, forwardRef, MouseEvent, ReactNode } from "react";
import { resolveClassName } from "@/components/utils";
import Check from "@/assets/check.svg";
import { InputError, InputHelper, InputLabel } from "@/components/input-helpers";

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  variant?: string | string[];
  checked?: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  rtl?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      variant = "default",
      id,
      className,
      label,
      rtl,
      checked,
      helper,
      error,
      onChange,
      onClick,
      ...rest
    }: CheckboxProps,
    ref,
  ) => {
    const _className = resolveClassName(
      "checkbox",
      variant,
      "checkbox inline-flex flex-col gap-0.5",
      undefined,
      className,
    );

    const _checkClassName = resolveClassName(
      "checkboxCheck",
      variant,
      "checkboxCheck inline-grid place-items-center w-5 h-5 rounded-sm cursor-pointer",
      "border-2 border-gray-300 transition-colors data-[checked=true]:bg-blue-400 " +
        "data-[checked=true]:border-blue-400 disabled:opacity-35 enabled:hover:border-blue-400 focus:outline-0 " +
        "focus:border-blue-400",
      className,
    );

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      onChange?.({ target: { checked: !checked } });
      onClick?.(e);
    };

    return (
      <div className={_className}>
        <div className="inline-flex gap-2">
          {label && !rtl && <InputLabel htmlFor={id}>{label}</InputLabel>}

          <button
            ref={ref}
            id={id}
            className={_checkClassName}
            onClick={handleOnClick}
            {...rest}
            data-checked={checked}>
            {checked && <Check {...({ className: "w-4 text-white pointer-events-none" } as object)} />}
          </button>

          {label && rtl && <InputLabel htmlFor={id}>{label}</InputLabel>}
        </div>

        {(helper || error) && (
          <div className="flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    );
  },
);
