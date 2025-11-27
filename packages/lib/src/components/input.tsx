import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, leading, trailing, id, className, helper, error, ...rest }: InputProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <fieldset className={resolveClassName("input", "input w-full flex flex-col gap-0.5", undefined, className)}>
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
    </fieldset>
  );
});
