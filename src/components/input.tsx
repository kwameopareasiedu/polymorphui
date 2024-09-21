import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { resolveClassName } from "@/components/utils";
import { InputAddon, InputError, InputHelper, InputLabel, InputWrapper } from "@/components/input-helpers";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  variant?: string | string[];
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", label, leading, trailing, id, className, helper, error, ...rest }: InputProps, ref) => {
    const _className = resolveClassName(
      "input",
      variant,
      "input w-full flex flex-col gap-0.5",
      "[&_input]:py-2 [&_input]:bg-transparent [&_input:focus]:outline-none [&_input]:placeholder:text-sm",
      className,
    );

    return (
      <div className={_className}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <InputWrapper>
          {leading && <InputAddon>{leading}</InputAddon>}
          <input ref={ref} className="flex-1" {...rest} />
          {trailing && <InputAddon>{trailing}</InputAddon>}
        </InputWrapper>

        {(helper || error) && (
          <div className="f flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    );
  },
);
