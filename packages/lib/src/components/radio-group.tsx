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

const RadioGroupContext = createContext<{
  value: unknown;
  setValue: (val: unknown) => void;
}>(null as never);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: unknown;
  inline?: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  onChange?: (e: { target: { value: any } }) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, value, label, children, onChange, helper, error, inline, ...rest }: RadioGroupProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const handleOnChange = (value: unknown) => {
    onChange?.({ target: { value } });
  };

  return (
    <RadioGroupContext.Provider value={{ value, setValue: handleOnChange }}>
      <div
        ref={ref}
        className={resolveClassName("radioGroup", "radioGroup inline-flex flex-col gap-2", undefined, className)}
        {...rest}>
        {label && <InputLabel>{label}</InputLabel>}

        <div
          className={resolveClassName(
            "radioGroupItems",
            "radioGroupItems inline-flex gap-2 flex-col data-[inline=true]:flex-row",
            undefined,
            className,
          )}
          data-inline={inline}>
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

export type RadioGroupItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(function RadioGroupItem(
  { className, onClick, value, ...rest }: RadioGroupItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const radioGroupContext = useContext(RadioGroupContext);

  if (!radioGroupContext) throw "error: <RadioGroupItem /> must be a child of a <RadioGroup />";

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    radioGroupContext.setValue(value);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "radioGroupItem",
        "radioGroupItem relative inline-grid place-items-center w-5 h-5 rounded-full cursor-pointer " +
          'after:w-3 after:h-3 after:rounded-full after:content-[""]',
        "border-2 border-gray-300 transition-colors data-[checked=true]:border-primary " +
          "data-[checked=true]:after:bg-primary disabled:opacity-35 enabled:hover:border-primary " +
          "focus:outline-0 focus:border-primary",
        className,
      )}
      onClick={handleOnClick}
      data-checked={radioGroupContext.value === value}
      {...rest}
    />
  );
});
