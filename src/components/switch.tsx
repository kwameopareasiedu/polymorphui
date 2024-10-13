import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, MouseEvent } from "react";
import { resolveClassName } from "@/components/utils";
import { InputHelperProps } from "@/components/input-helpers";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  variant?: string | string[];
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { variant = "default", className, checked, onChange, onClick, ...rest }: SwitchProps,
  ref,
) {
  const _className = resolveClassName(
    "switch",
    variant,
    "switch relative inline-block w-10 h-6 rounded-full border-2 transition-colors",
    "bg-gray-300 border-gray-300 focus:outline-0 data-[checked=true]:bg-blue-400 " +
      "data-[checked=true]:border-blue-400 disabled:opacity-35 enabled:hover:border-blue-400 " +
      "focus:border-blue-400",
    className,
  );

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onChange?.({ target: { checked: !checked } });
    onClick?.(e);
  };

  return (
    <button ref={ref} type="button" className={_className} onClick={handleOnClick} {...rest} data-checked={checked}>
      <SwitchThumb
        className="absolute top-0 left-0 translate-x-0 transition-all pointer-events-none data-[checked=true]:left-full data-[checked=true]:-translate-x-full"
        data-checked={checked}
      />
    </button>
  );
});

interface SwitchThumbProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: string | string[];
}

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ variant = "default", className, ...rest }: InputHelperProps, ref) => {
    const _className = resolveClassName(
      "switchThumb",
      variant,
      "switchThumb inline-block h-full aspect-square rounded-full transition-all",
      "bg-white",
      className,
    );

    return <span ref={ref} className={_className} {...rest} />;
  },
);
