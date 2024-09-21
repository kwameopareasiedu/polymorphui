import React, { ButtonHTMLAttributes, forwardRef, MouseEvent } from "react";
import { cn, resolveClassName } from "@/components/utils";
import { SwitchThumb } from "@/components/input-helpers";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  variant?: string | string[];
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ variant = "default", className, checked, onChange, onClick, ...rest }: SwitchProps, ref) => {
    const _className = resolveClassName(
      "switch",
      variant,
      "switch relative inline-block w-10 h-6 rounded-full border-2",
      "bg-gray-300 border-gray-300 focus:outline-0 data-[checked=true]:bg-blue-400 " +
        "data-[checked=true]:border-blue-400 disabled:opacity-35",
      className,
    );

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      onChange?.({ target: { checked: !checked } });
      onClick?.(e);
    };

    return (
      <button ref={ref} className={_className} onClick={handleOnClick} {...rest} data-checked={checked}>
        <SwitchThumb
          className={cn("absolute top-0 transition-all", !checked ? "left-0" : "left-full -translate-x-full")}
          data-checked={checked}
        />
      </button>
    );
  },
);
