import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, MouseEvent } from "react";
import { InputHelperProps } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { cn } from "@/utils";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> {
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked, onChange, onClick, ...rest }: SwitchProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onChange?.({ target: { checked: !checked } });
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "switch",
        "switch group relative inline-block w-10 h-6 rounded-full border-2 transition-colors",
        cn(
          "bg-gray-300 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-0 data-[checked=true]:bg-primary",
          "data-[checked=true]:border-primary disabled:opacity-35 dark:disabled:opacity-20 enabled:hover:border-primary",
          "focus:border-primary",
        ),
        className,
      )}
      onClick={handleOnClick}
      {...rest}
      data-checked={checked}>
      <SwitchThumb
        className="absolute top-0 left-0 translate-x-0 transition-all pointer-events-none data-[checked=true]:left-full data-[checked=true]:-translate-x-full"
        data-checked={checked}
      />
    </button>
  );
});

type SwitchThumbProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(function SwitchThumb(
  { className, ...rest }: InputHelperProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName(
    "switchThumb",
    "switchThumb inline-block h-full aspect-square rounded-full transition-all",
    "bg-white dark:group-hover:bg-white dark:data-[checked=false]:bg-gray-500",
    className,
  );

  return <span ref={ref} className={_className} {...rest} />;
});
