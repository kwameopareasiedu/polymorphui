import React, {
  ButtonHTMLAttributes,
  cloneElement,
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

const AccordionContext = createContext<{
  values: string[];
  toggleValue: (val: string) => void;
}>(null as never);

interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  multiple?: boolean;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { className, defaultValue, value, multiple, onChange, ...rest }: AccordionProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const [_value, _setValue] = useState(value ?? defaultValue ?? []);

  const toggleItemValue = (itemValue: string) => {
    _setValue((_value) => {
      const newValueSet = new Set(multiple ? _value : _value.includes(itemValue) ? [itemValue] : []);

      if (newValueSet.has(itemValue)) {
        newValueSet.delete(itemValue);
      } else newValueSet.add(itemValue);

      const newValue = Array.from(newValueSet);

      onChange?.(newValue);
      return newValue;
    });
  };

  useEffect(() => {
    if (value) _setValue(value);
  }, [value]);

  return (
    <AccordionContext.Provider value={{ values: _value, toggleValue: toggleItemValue }}>
      <div ref={ref} className={resolveClassName("accordion", "accordion", undefined, className)} {...rest}></div>
    </AccordionContext.Provider>
  );
});

interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: string;
  children: [ReactElement<AccordionHeaderProps>, ReactElement<AccordionPanelProps>];
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, children, value, ...rest }: AccordionItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const accordionContext = useContext(AccordionContext);
  if (!accordionContext) throw "error: <AccordionItem /> must be a child of a <Accordion />";

  const isActive = accordionContext.values.includes(value);

  const [headerChild, panelChild] = useMemo(() => {
    const [headerChild, panelChild] = children;

    const clonedHeaderChild = cloneElement(headerChild, {
      onClick: (e: never) => {
        accordionContext.toggleValue(value);
        headerChild.props?.onClick?.(e);
      },
      ...{ "data-active": isActive },
    });

    const clonedPanelChild = cloneElement(panelChild, {
      ...({ "data-active": isActive } as object),
    });

    return [clonedHeaderChild, clonedPanelChild];
  }, [children, value, isActive]);

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "accordionItem",
        "accordionItem w-full",
        "[&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-gray-300",
        className,
      )}
      {...rest}
      data-active={isActive}>
      {headerChild}
      {isActive && panelChild}
    </div>
  );
});

type AccordionHeaderProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function AccordionHeader(
  { className, children, ...rest }: AccordionHeaderProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <button
      ref={ref}
      className={resolveClassName("accordionHeader", "accordionHeader", "w-full h-8 text-left", className)}
      {...rest}>
      {children}
    </button>
  );
});

type AccordionPanelProps = HTMLAttributes<HTMLDivElement>;

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(function AccordionPanel(
  { className, children, ...rest }: AccordionPanelProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <div
      ref={ref}
      className={resolveClassName("accordionPanel", "accordionPanel", "p-4 bg-gray-100", className)}
      {...rest}>
      {children}
    </div>
  );
});
