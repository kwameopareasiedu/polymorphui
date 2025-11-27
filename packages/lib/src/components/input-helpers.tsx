import React, { forwardRef, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(function InputLabel(
  { className, children, ...rest }: InputLabelProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <label
      ref={ref}
      className={resolveClassName("inputLabel", "inputLabel", "text-sm text-gray-600", className)}
      {...rest}>
      {children}
    </label>
  );
});

export type InputHelperProps = HTMLAttributes<HTMLSpanElement>;

export const InputHelper = forwardRef<HTMLSpanElement, InputHelperProps>(function InputHelper(
  { className, children, ...rest }: InputHelperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <span
      ref={ref}
      className={resolveClassName("inputHelper", "inputHelper", "text-xs text-gray-400", className)}
      {...rest}>
      {children}
    </span>
  );
});

export const InputError = forwardRef<HTMLSpanElement, InputHelperProps>(function InputError(
  { className, children, ...rest }: InputHelperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <span
      ref={ref}
      className={resolveClassName("inputError", "inputError", "text-xs text-red-500", className)}
      {...rest}>
      {children}
    </span>
  );
});

export type InputAddonProps = HTMLAttributes<HTMLSpanElement>;

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon(
  { className, children, ...rest }: InputAddonProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <span
      ref={ref}
      className={resolveClassName("inputAddon", "inputAddon inline-grid place-items-center", undefined, className)}
      {...rest}>
      {children}
    </span>
  );
});

export type InputWrapperProps = HTMLAttributes<HTMLDivElement>;

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(function InputWrapper(
  { className, children, ...rest }: InputWrapperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "inputWrapper",
        "inputWrapper flex items-center gap-2",
        "px-2 rounded border border-gray-300 focus-within:border-primary-400 " +
          "has-[input:disabled]:opacity-50 has-[input:disabled]:bg-gray-100",
        className,
      )}
      {...rest}>
      {children}
    </div>
  );
});

export type InputInputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputInput = forwardRef<HTMLInputElement, InputInputProps>(function InputInput(
  { className, children, ...rest }: InputInputProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <input
      ref={ref}
      className={resolveClassName(
        "inputInput",
        "inputInput flex-1",
        "py-1 bg-transparent focus:outline-none placeholder:text-sm",
        className,
      )}
      {...rest}>
      {children}
    </input>
  );
});
