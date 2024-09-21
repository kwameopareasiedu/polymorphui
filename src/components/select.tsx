import React, { ButtonHTMLAttributes, ChangeEventHandler, forwardRef, ReactNode, useRef } from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import { Popup, PopupController } from "@/components/popup";
import Dropdown from "@/assets/dropdown.svg";
import Check from "@/assets/check.svg";
import { InputAddon, InputError, InputHelper, InputLabel } from "@/components/input-helpers";

const internalPopupController = new PopupController();

export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value" | "onChange"> {
  variant?: string | string[];
  options: SelectOption[];
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  value?: string | string[];
  onChange?: ChangeEventHandler<{ value: string & string[] }>;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant = "default",
      label,
      options,
      leading,
      id,
      className,
      helper,
      error,
      placeholder,
      value,
      onChange,
      ...rest
    }: SelectProps,
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const _className = resolveClassName(
      "select",
      variant,
      "select w-full flex flex-col gap-0.5",
      "[&>button]:bg-white [&>button]:p-2 [&>button]:rounded [&>button]:border-2 [&>button]:border-gray-300 " +
        "[&>button:focus]:border-blue-400 [&>button:focus]:outline-0 [&>button:disabled]:opacity-50 [&>button:disabled]:bg-gray-100 " +
        "[&_.t_input]:placeholder:text-sm",
      className,
    );

    const _optionsClassName = resolveClassName(
      "selectOptions",
      variant,
      "selectOptions",
      "bg-white border-[0.5px] border-gray-300 rounded-sm",
    );

    const _optionClassName = resolveClassName(
      "selectOption",
      variant,
      "selectOption text-left px-2 py-1",
      "w-full flex items-center justify-between text-sm hover:bg-blue-500 hover:text-white transition-colors",
    );

    const isMultiSelect = Array.isArray(value);
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
    const selectedLabels = selectedValues.map((val) => options.find((op) => op.value === val)?.label ?? "");

    const optionIsSelected = (option: SelectOption) => {
      return selectedValues.includes(option.value);
    };

    const handleOnOptionClicked = (option: SelectOption) => {
      if (isMultiSelect) {
        const newValueSet = new Set(selectedValues);
        if (selectedValues.includes(option.value)) {
          newValueSet.delete(option.value);
        } else newValueSet.add(option.value);

        const newValue = Array.from(newValueSet);
        onChange?.({ target: { value: newValue } } as never);
      } else {
        onChange?.({ target: { value: option.value } } as never);
        internalPopupController.close();
      }
    };

    return (
      <div className={_className}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <Popup
          variant={null}
          openEvent="triggerClick"
          closeEvent={["triggerClick", "outsideClick"]}
          controller={internalPopupController}
          placement="bottom-start"
          offset={[0, 8]}>
          <button ref={combineRefs(ref, buttonRef)} className="t flex items-center gap-2" {...rest} type="button">
            {leading && <InputAddon>{leading}</InputAddon>}

            <input
              value={selectedLabels.join(", ")}
              className="text-left flex-1 pointer-events-none"
              placeholder={placeholder}
              readOnly
              disabled
            />

            <Dropdown {...({ className: "w-3" } as object)} />
          </button>

          <div className={_optionsClassName} style={{ minWidth: `${buttonRef.current?.offsetWidth ?? 0}px` }}>
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className={_optionClassName}
                onClick={() => handleOnOptionClicked(option)}>
                <span>{option.label}</span>

                {optionIsSelected(option) && <Check {...({ className: "w-3" } as object)} />}
              </button>
            ))}
          </div>
        </Popup>

        {(helper || error) && (
          <div className="f flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    );
  },
);
