import React, {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  useState,
  useRef,
} from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import { Popup, PopupController } from "@/components/popup";
import Dropdown from "@/assets/dropdown.svg";
import Check from "@/assets/check.svg";
import {
  InputAddon,
  InputError,
  InputHelper,
  InputInput,
  InputLabel,
  SelectOptionButton,
  SelectOptions,
  SelectButton,
} from "@/components/input-helpers";

const internalPopupController = new PopupController();

export type SelectOptionType = {
  label: string;
  value: string;
};

export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value" | "onChange"> {
  variant?: string | string[];
  options: SelectOptionType[];
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
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [triggerWidth, setTriggerWidth] = useState(0);

    const _className = resolveClassName("select", variant, "select w-full flex flex-col gap-0.5", undefined, className);

    const isMultiSelect = Array.isArray(value);
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
    const selectedLabels = selectedValues.map((val) => options.find((op) => op.value === val)?.label ?? "");

    const optionIsSelected = (option: SelectOptionType) => {
      return selectedValues.includes(option.value);
    };

    const handleOnOptionClicked = (option: SelectOptionType) => {
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
        buttonRef.current?.focus();
      }
    };

    const handleOnKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        internalPopupController.close();
        buttonRef.current?.focus();
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
          <SelectButton ref={combineRefs(ref, buttonRef, (el) => setTriggerWidth(el?.clientWidth ?? 0))} {...rest}>
            {leading && <InputAddon>{leading}</InputAddon>}

            <InputInput
              value={selectedLabels.join(", ")}
              className="text-left flex-1 pointer-events-none !p-0"
              placeholder={placeholder}
              readOnly
              disabled
            />

            <Dropdown {...({ className: "w-3" } as object)} />
          </SelectButton>

          <SelectOptions style={{ minWidth: `${triggerWidth}px` }} onKeyUp={handleOnKeyUp}>
            {options.map((option, idx) => (
              <SelectOptionButton key={idx} onClick={() => handleOnOptionClicked(option)}>
                <span>{option.label}</span>
                {optionIsSelected(option) && <Check {...({ className: "w-3" } as object)} />}
              </SelectOptionButton>
            ))}
          </SelectOptions>
        </Popup>

        {(helper || error) && (
          <div className="flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    );
  },
);
