import React, {
  ButtonHTMLAttributes,
  createContext,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useContext,
} from "react";
import { InputError, InputHelper, InputLabel } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

interface RadioGroupContextProps {
  value: unknown;
  setValue: (val: unknown) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps>(null as never);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: string | string[];
  value: unknown;
  inline?: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  onChange?: (e: { target: { value: any } }) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { variant = "default", className, value, label, children, onChange, helper, error, inline, ...rest }: RadioGroupProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const _className = resolveClassName(
    "radioGroup",
    variant,
    "radioGroup inline-flex flex-col gap-2",
    undefined,
    className,
  );

  const _itemsClassName = resolveClassName(
    "radioGroupItems",
    variant,
    "radioGroupItems inline-flex gap-2 flex-col data-[inline=true]:flex-row",
    undefined,
    className,
  );

  const handleOnChange = (value: unknown) => {
    onChange?.({ target: { value } });
  };

  return (
    <RadioGroupContext.Provider value={{ value, setValue: handleOnChange }}>
      <div ref={ref} className={_className} {...rest}>
        {label && <InputLabel>{label}</InputLabel>}

        <div className={_itemsClassName} data-inline={inline}>
          {children}
        </div>

        {(helper || error) && (
          <div className="flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
});

export interface RadioGroupItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: string | string[];
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(function RadioGroupItem(
  { variant = "default", className, onClick, value, ...rest }: RadioGroupItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const radioGroupContext = useContext(RadioGroupContext);

  if (!radioGroupContext) throw "error: <RadioGroupItem /> must be a child of a <RadioGroup />";

  const _className = resolveClassName(
    "radioGroupItem",
    variant,
    "radioGroupItem relative inline-grid place-items-center w-5 h-5 rounded-full cursor-pointer " +
      'after:w-3 after:h-3 after:rounded-full after:content-[""]',
    "border-2 border-gray-300 transition-colors data-[checked=true]:border-blue-400 " +
      "data-[checked=true]:after:bg-blue-400 disabled:opacity-35 enabled:hover:border-blue-400 " +
      "focus:outline-0 focus:border-blue-400",
    className,
  );

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    radioGroupContext.setValue(value);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={_className}
      onClick={handleOnClick}
      data-checked={radioGroupContext.value === value}
      {...rest}
    />
  );
});
