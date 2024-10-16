import React, { forwardRef, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { resolveClassName } from "@/components/utils";

export interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: string | string[];
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(function InputLabel(
  { variant = "default", className, children, ...rest }: InputLabelProps,
  ref,
) {
  const _className = resolveClassName("inputLabel", variant, "inputLabel", "text-sm text-gray-600", className);

  return (
    <label ref={ref} className={_className} {...rest}>
      {children}
    </label>
  );
});

export interface InputHelperProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
}

export const InputHelper = forwardRef<HTMLSpanElement, InputHelperProps>(function InputHelper(
  { variant = "default", className, children, ...rest }: InputHelperProps,
  ref,
) {
  const _className = resolveClassName("inputHelper", variant, "inputHelper", "text-xs text-gray-400", className);

  return (
    <span ref={ref} className={_className} {...rest}>
      {children}
    </span>
  );
});

export const InputError = forwardRef<HTMLSpanElement, InputHelperProps>(function InputError(
  { variant = "default", className, children, ...rest }: InputHelperProps,
  ref,
) {
  const _className = resolveClassName("inputError", variant, "inputError", "text-xs text-red-500", className);

  return (
    <span ref={ref} className={_className} {...rest}>
      {children}
    </span>
  );
});

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
}

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon(
  { variant = "default", className, children, ...rest }: InputAddonProps,
  ref,
) {
  const _className = resolveClassName(
    "inputAddon",
    variant,
    "inputAddon inline-grid place-items-center",
    undefined,
    className,
  );

  return (
    <span ref={ref} className={_className} {...rest}>
      {children}
    </span>
  );
});

export interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(function InputWrapper(
  { variant = "default", className, children, ...rest }: InputWrapperProps,
  ref,
) {
  const _className = resolveClassName(
    "inputWrapper",
    variant,
    "inputWrapper flex items-center gap-2",
    "bg-white px-2 rounded border-2 border-gray-300 focus-within:border-blue-400 " +
      "has-[input:disabled]:opacity-50 has-[input:disabled]:bg-gray-100",
    className,
  );

  return (
    <div ref={ref} className={_className} {...rest}>
      {children}
    </div>
  );
});

export interface InputInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string | string[];
}

export const InputInput = forwardRef<HTMLInputElement, InputInputProps>(function InputInput(
  { variant = "default", className, children, ...rest }: InputInputProps,
  ref,
) {
  const _className = resolveClassName(
    "inputInput",
    variant,
    "inputInput flex-1",
    "py-2 bg-transparent focus:outline-none placeholder:text-sm",
    className,
  );

  return (
    <input ref={ref} className={_className} {...rest}>
      {children}
    </input>
  );
});
