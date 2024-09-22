/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ButtonHTMLAttributes, createContext, forwardRef, HTMLAttributes, MouseEvent, useContext } from "react";
import { cn, resolveClassName } from "@/components/utils";

type RadioGroupContextProps = { value: any; setValue: (val: any) => void };

const RadioGroupContext = createContext<RadioGroupContextProps>(null as never);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: string | string[];
  value?: any;
  inline?: boolean;
  onChange?: (e: { target: { value: any } }) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ variant = "default", className, value, children, onChange, inline, ...rest }: RadioGroupProps, ref) => {
    const _className = resolveClassName(
      "radioGroup",
      variant,
      cn("radioGroup inline-flex gap-2", inline ? "flex-row" : "flex-col"),
      undefined,
      className,
    );

    const handleOnChange = (value?: any) => {
      onChange?.({ target: { value } });
    };

    return (
      <RadioGroupContext.Provider value={{ value, setValue: handleOnChange }}>
        <div ref={ref} className={_className} {...rest}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

export interface RadioGroupItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: string | string[];
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ variant = "default", className, onClick, value, ...rest }: RadioGroupItemProps, ref) => {
    const radioGroupContext = useContext(RadioGroupContext);

    if (!radioGroupContext) throw "error: <RadioGroupItem /> must be a child of a <RadioGroup />";

    const _className = resolveClassName(
      "radioGroupItem",
      variant,
      "radioGroupItem relative inline-grid place-items-center w-5 h-5 rounded-full cursor-pointer " +
        'after:w-3 after:h-3 after:rounded-full after:content-[""]',
      "border-2 border-gray-300 transition-colors data-[checked=true]:border-blue-400 " +
        "data-[checked=true]:after:bg-blue-400 disabled:opacity-35 hover:border-blue-400 focus:outline-0 " +
        "focus:border-blue-400",
      className,
    );

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      radioGroupContext.setValue(value);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={_className}
        onClick={handleOnClick}
        data-checked={radioGroupContext.value === value}
        {...rest}
        type="button"
      />
    );
  },
);
