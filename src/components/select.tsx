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
  MouseEvent,
  createContext,
  ReactElement,
  useContext,
} from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import { Popup } from "@/components/popup";
import Dropdown from "@/assets/dropdown.svg";
import Check from "@/assets/check.svg";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel } from "@/components/input-helpers";

type SelectItemDataType = {
  label: string;
  value: any;
};

interface SelectContextProps {
  selectedValues: any[];
  setItemValue: (val: any) => void;
  registerItem: (item: SelectItemDataType) => void;
}

const SelectContext = createContext<SelectContextProps>(null as never);

export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  variant?: string | string[];
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  value?: string | string[];
  children?: ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[];
  onChange?: ChangeEventHandler<{ value: string & string[] }>;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    variant = "default",
    label,
    leading,
    id,
    className,
    helper,
    error,
    placeholder,
    value,
    onChange,
    children,
    ...rest
  }: SelectProps,
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [items, setItems] = useState<SelectItemDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const _className = resolveClassName("select", variant, "select  w-full flex flex-col gap-0.5", undefined, className);

  const isMultiSelect = Array.isArray(value);
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selectedLabels = selectedValues.map((val) => items.find((op) => op.value === val)?.label ?? "");

  const registerItem = (item: SelectItemDataType) => {
    setItems((items) => {
      const existingItemValues = items.map((item) => item.value);
      if (!existingItemValues.includes(item.value)) {
        return [...items, item];
      } else return items;
    });
  };

  const handleOnClickItem = (itemValue: any) => {
    if (isMultiSelect) {
      const newValueSet = new Set(selectedValues);

      if (selectedValues.includes(itemValue)) {
        newValueSet.delete(itemValue);
      } else newValueSet.add(itemValue);

      const newValue = Array.from(newValueSet);
      onChange?.({ target: { value: newValue } } as never);
    } else {
      onChange?.({ target: { value: itemValue } } as never);
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <SelectContext.Provider value={{ selectedValues, registerItem, setItemValue: handleOnClickItem }}>
      <div className={_className}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <Popup
          open={isOpen}
          openEvent="triggerClick"
          closeEvent={["triggerClick", "outsideClick"]}
          placement="bottom-start"
          renderWhenClosed
          offset={[0, 4]}
          onChange={setIsOpen}>
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

          <SelectItems style={{ minWidth: `${triggerWidth}px` }} onKeyUp={handleOnKeyUp}>
            {children}
          </SelectItems>
        </Popup>

        {(helper || error) && (
          <div className="flex items-center justify-between gap-2">
            {error && <InputError>{error}</InputError>}
            {helper && <InputHelper>{helper}</InputHelper>}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
});

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(function SelectButton(
  { variant = "default", className, children, ...rest }: SelectButtonProps,
  ref,
) {
  const _className = resolveClassName(
    "selectButton",
    variant,
    "selectButton flex items-center gap-2",
    "bg-white p-2 rounded border-2 border-gray-300 focus:border-blue-400 focus:outline-0 " +
      "disabled:opacity-50 disabled:bg-gray-100 ",
    className,
  );

  return (
    <button ref={ref} type="button" className={_className} {...rest}>
      {children}
    </button>
  );
});

interface SelectItemsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

const SelectItems = forwardRef<HTMLDivElement, SelectItemsProps>(function SelectItems(
  { variant = "default", className, children, onKeyDownCapture, onKeyUp, ...rest }: SelectItemsProps,
  ref,
) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [childCount] = useState(Children.count(children));
  const [focusedInitially, setFocusedInitially] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const _className = resolveClassName(
    "selectItems",
    variant,
    "selectItems",
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

  if (!focusedInitially) {
    optionsRef.current?.focus();
    setFocusedInitially(true);
  }

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
});

export interface SelectItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  variant?: string | string[];
  value: any;
  children: string;
}

export const SelectItem = forwardRef<HTMLButtonElement, SelectItemProps>(function SelectItem(
  { variant = "default", className, children, value, onClick, ...rest }: SelectItemProps,
  ref,
) {
  const selectContext = useContext(SelectContext);

  if (!selectContext) throw "error: <SelectItem /> must be a child of a <Select />";

  const _className = resolveClassName(
    "selectItem",
    variant,
    "selectItem text-left px-2 py-1",
    "w-full flex items-center justify-between text-sm transition-colors hover:bg-blue-500 " +
      "hover:text-white focus:bg-blue-500 focus:text-white focus:outline-0",
    className,
  );

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    selectContext.setItemValue(value);
    onClick?.(e);
  };

  useEffect(() => {
    selectContext.registerItem({
      label: children,
      value: value,
    });
  }, []);

  return (
    <button ref={ref} type="button" className={_className} onClick={handleOnClick} {...rest}>
      {children} {selectContext.selectedValues.includes(value) && <Check {...({ className: "w-3" } as object)} />}
    </button>
  );
});
