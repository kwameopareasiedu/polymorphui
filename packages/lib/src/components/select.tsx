import React, {
  ButtonHTMLAttributes,
  Children,
  createContext,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { combineRefs, isDefined } from "@/utils";
import { Popup } from "@/components/popup";
import CheckIcon from "../assets/check.svg";
import DropdownIcon from "../assets/dropdown.svg";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { TrapFocus } from "@/components/trap-focus";

interface SelectItemData {
  label: string;
  value: unknown;
}

const SelectContext = createContext<{
  selectedValues: unknown[];
  onItemClick: (value: never) => void;
}>(null as never);

export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  children?: ReactNode;
  itemsClassName?: string;
  value: string | string[];
  onChange: (e: { target: { value: string & string[] } }) => void;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
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
    itemsClassName,
    ...rest
  }: SelectProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const items = useMemo(() => {
    const mappedChildren = Children.toArray(children) as ReactElement<SelectItemProps>[];

    return mappedChildren.map((child) => {
      return {
        label: child.props.children,
        value: child.props.value,
      } satisfies SelectItemData;
    });
  }, [children]);

  const selectedValues = Array.isArray(value) ? value : isDefined(value) ? [value] : [];
  const selectedLabels = selectedValues.map((val) => items.find((op) => op.value === val)?.label ?? "");

  const handleOnClickItem = (itemValue: never) => {
    if (Array.isArray(value)) {
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

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <SelectContext.Provider value={{ selectedValues, onItemClick: handleOnClickItem }}>
      <div className={resolveClassName("select", "select w-full flex flex-col gap-0.5", undefined, className)}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <Popup
          open={isOpen}
          offset={[0, 4]}
          openEvent="triggerClick"
          closeEvent={["triggerClick", "outsideClick"]}
          placement="bottom-start"
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

            <DropdownIcon {...({ className: "w-3" } as object)} />
          </SelectButton>

          <TrapFocus
            style={{ minWidth: `${triggerWidth}px` }}
            className={resolveClassName(
              "selectItems",
              "selectItems",
              "bg-white border-[0.5px] border-gray-300 rounded-sm z-[100]",
              itemsClassName,
            )}
            onKeyUp={handleOnKeyUp}>
            {children}
          </TrapFocus>
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

type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(function SelectButton(
  { className, children, ...rest }: SelectButtonProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "selectButton",
        "selectButton flex items-center gap-2",
        "px-2 py-1 rounded border border-slate-300 focus:border-primary-400 focus:outline-0 " +
          "disabled:opacity-50 disabled:bg-slate-100 ",
        className,
      )}
      {...rest}>
      {children}
    </button>
  );
});

export interface SelectItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: unknown;
  children: string;
}

export const SelectItem = forwardRef<HTMLButtonElement, SelectItemProps>(function SelectItem(
  { className, children, value, onClick, ...rest }: SelectItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const selectContext = useContext(SelectContext);
  if (!selectContext) throw "error: <SelectItem /> must be a child of a <Select />";

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    selectContext.onItemClick(value as never);
    onClick?.(e);
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if ([" ", "Enter"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      selectContext.onItemClick(value as never);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "selectItem",
        "selectItem text-left px-2 py-1",
        "w-full flex items-center justify-between text-sm transition-colors hover:bg-primary-500 " +
          "hover:text-white focus:bg-primary-500 focus:text-white focus:outline-0",
        className,
      )}
      onKeyUp={handleOnKeyUp}
      onClick={handleOnClick}
      {...rest}>
      {children} {selectContext.selectedValues.includes(value) && <CheckIcon {...({ className: "w-3" } as object)} />}
    </button>
  );
});
