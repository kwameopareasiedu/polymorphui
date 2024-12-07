import React, { forwardRef, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";

export interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: VariantNameType | VariantNameType[];
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(function InputLabel(
  { variant, className, children, ...rest }: InputLabelProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName("inputLabel", variant, "inputLabel", "text-sm text-gray-600", className);

  return (
    <label ref={ref} className={_className} {...rest}>
      {children}
    </label>
  );
});

export interface InputHelperProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: VariantNameType | VariantNameType[];
}

export const InputHelper = forwardRef<HTMLSpanElement, InputHelperProps>(function InputHelper(
  { variant, className, children, ...rest }: InputHelperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName("inputHelper", variant, "inputHelper", "text-xs text-gray-400", className);

  return (
    <span ref={ref} className={_className} {...rest}>
      {children}
    </span>
  );
});

export const InputError = forwardRef<HTMLSpanElement, InputHelperProps>(function InputError(
  { variant, className, children, ...rest }: InputHelperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName("inputError", variant, "inputError", "text-xs text-red-500", className);

  return (
    <span ref={ref} className={_className} {...rest}>
      {children}
    </span>
  );
});

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: VariantNameType | VariantNameType[];
}

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon(
  { variant, className, children, ...rest }: InputAddonProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
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
  variant?: VariantNameType | VariantNameType[];
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(function InputWrapper(
  { variant, className, children, ...rest }: InputWrapperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
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
  variant?: VariantNameType | VariantNameType[];
}

export const InputInput = forwardRef<HTMLInputElement, InputInputProps>(function InputInput(
  { variant, className, children, ...rest }: InputInputProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
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
