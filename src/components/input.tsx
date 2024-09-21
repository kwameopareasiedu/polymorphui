import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { resolveClassName } from "@/components/utils";

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
      "[&>.w]:bg-white [&>.w]:px-2 [&>.w]:rounded [&>.w]:border-2 [&>.w]:border-gray-300 " +
        "[&>.w:focus-within]:border-blue-400 [&>.w:has(input:disabled)]:opacity-50 [&>.w:has(input:disabled)]:bg-gray-100 " +
        "[&>label]:text-sm [&>label]:text-gray-600 [&_input]:py-2 [&_input]:bg-transparent [&_input:focus]:outline-none " +
        "[&_input]:placeholder:text-sm [&_.e]:text-xs [&_.e]:text-red-500 [&_.h]:text-xs [&_.h]:text-gray-400",
      className,
    );

    return (
      <div className={_className}>
        {label && <label htmlFor={id}>{label}</label>}

        <div className="w flex items-center gap-2">
          {leading && <span className="l inline-grid place-items-center">{leading}</span>}
          <input ref={ref} className="flex-1" {...rest} />
          {trailing && <span className="t inline-grid place-items-center">{trailing}</span>}
        </div>

        {(helper || error) && (
          <div className="f flex items-center justify-between gap-2">
            {error && <span className="e">{error}</span>}
            {helper && <span className="h">{helper}</span>}
          </div>
        )}
      </div>
    );
  },
);
