import React, { ButtonHTMLAttributes, forwardRef, MouseEvent, ReactNode } from "react";
import CheckIcon from "../assets/check.svg";
import { InputError, InputHelper, InputLabel } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  checked?: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  rtl?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { id, className, label, rtl, checked, helper, error, onChange, onClick, ...rest }: CheckboxProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onChange?.({ target: { checked: !checked } });
    onClick?.(e);
  };

  return (
    <div className={resolveClassName("checkbox", "checkbox inline-flex flex-col gap-0.5", undefined, className)}>
      <div className="inline-flex gap-2">
        {label && !rtl && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <button
          ref={ref}
          id={id}
          type="button"
          className={resolveClassName(
            "checkboxCheck",
            "checkboxCheck inline-grid place-items-center w-5 h-5 rounded-sm cursor-pointer",
            "border-2 border-gray-300 transition-colors data-[checked=true]:bg-primary-400 " +
              "data-[checked=true]:border-primary-400 disabled:opacity-35 enabled:hover:border-primary-400 focus:outline-0 " +
              "focus:border-primary-400",
            className,
          )}
          onClick={handleOnClick}
          {...rest}
          data-checked={checked}>
          {checked && <CheckIcon {...({ className: "w-4 text-white pointer-events-none" } as object)} />}
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
});
