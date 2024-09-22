import React, {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  useState,
  useRef,
  HTMLAttributes,
  Children,
  useEffect,
} from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import { Popup, PopupController } from "@/components/popup";
import Dropdown from "@/assets/dropdown.svg";
import Check from "@/assets/check.svg";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel } from "@/components/input-helpers";

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

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  ({ variant = "default", className, children, ...rest }: SelectButtonProps, ref) => {
    const _className = resolveClassName(
      "selectButton",
      variant,
      "selectButton flex items-center gap-2",
      "bg-white p-2 rounded border-2 border-gray-300 focus:border-blue-400 focus:outline-0 " +
        "disabled:opacity-50 disabled:bg-gray-100 ",
      className,
    );

    return (
      <button ref={ref} className={_className} {...rest} type="button">
        {children}
      </button>
    );
  },
);

interface SelectOptionsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

const SelectOptions = forwardRef<HTMLDivElement, SelectOptionsProps>(
  ({ variant = "default", className, children, onKeyDownCapture, onKeyUp, ...rest }: SelectOptionsProps, ref) => {
    const optionsRef = useRef<HTMLDivElement>(null);
    const [childCount] = useState(Children.count(children));
    const [focusIndex, setFocusIndex] = useState(-1);

    const _className = resolveClassName(
      "selectOptions",
      variant,
      "selectOptions",
      "bg-white border-[0.5px] border-gray-300 rounded-sm",
      className,
    );

    const handleOnKeyDownCapture = (e: KeyboardEvent<HTMLDivElement>) => {
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }

      onKeyDownCapture?.(e);
    };

    const handleOnKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowDown") setFocusIndex((idx) => Math.min(idx + 1, childCount - 1));
      else if (e.key === "ArrowUp") setFocusIndex((idx) => Math.max(0, idx - 1));
      onKeyUp?.(e);
    };

    useEffect(() => {
      if (optionsRef.current && optionsRef.current.childElementCount > 0 && focusIndex >= 0) {
        const targetElement = optionsRef.current.children.item(focusIndex) as HTMLElement | null;
        targetElement?.focus();
      }
    }, [focusIndex]);

    useEffect(() => {
      optionsRef.current?.focus();
    }, []);

    return (
      <div
        ref={combineRefs(ref, optionsRef)}
        className={_className}
        onKeyUp={handleOnKeyUp}
        onKeyDownCapture={handleOnKeyDownCapture}
        {...rest}
        tabIndex={0}>
        {children}
      </div>
    );
  },
);

interface SelectOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

const SelectOptionButton = forwardRef<HTMLButtonElement, SelectOptionButtonProps>(
  ({ variant = "default", className, children, ...rest }: SelectOptionButtonProps, ref) => {
    const _className = resolveClassName(
      "selectOptionButton",
      variant,
      "selectOptionButton text-left px-2 py-1",
      "w-full flex items-center justify-between text-sm hover:bg-blue-500 hover:text-white " +
        "focus:bg-blue-500 focus:text-white focus:outline-0 transition-colors",
      className,
    );

    return (
      <button ref={ref} type="button" className={_className} {...rest}>
        {children}
      </button>
    );
  },
);
