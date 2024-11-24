import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  variant?: string | string[];
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "default", label, leading, trailing, id, className, helper, error, ...rest }: InputProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName("input", variant, "input w-full flex flex-col gap-0.5", undefined, className);

  return (
    <div className={_className}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      <InputWrapper>
        {leading && <InputAddon>{leading}</InputAddon>}
        <InputInput ref={ref} {...rest} />
        {trailing && <InputAddon>{trailing}</InputAddon>}
      </InputWrapper>

      {(helper || error) && (
        <div className="flex items-center justify-between gap-2">
          {error && <InputError>{error}</InputError>}
          {helper && <InputHelper>{helper}</InputHelper>}
        </div>
      )}
    </div>
  );
});
