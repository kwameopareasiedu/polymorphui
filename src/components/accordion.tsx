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
import { resolveClassName } from "@/components/utils";

interface AccordionContextProps {
  values: any[];
  toggleValue: (val: any) => void;
}

const AccordionContext = createContext<AccordionContextProps>(null as never);

interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: string | string[];
  value?: string[];
  multiple?: boolean;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ variant = "default", className, defaultValue, value, multiple, onChange, ...rest }: AccordionProps, ref) => {
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

    const _className = resolveClassName("accordion", variant, "accordion", undefined, className);

    useEffect(() => {
      if (value) _setValue(value);
    }, [value]);

    return (
      <AccordionContext.Provider value={{ values: _value, toggleValue: toggleItemValue }}>
        <div ref={ref} className={_className} {...rest}></div>
      </AccordionContext.Provider>
    );
  },
);

interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: string | string[];
  value: any;
  children: [ReactElement<AccordionHeaderProps>, ReactElement<AccordionPanelProps>];
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ variant = "default", className, children, value, ...rest }: AccordionItemProps, ref) => {
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

    const _className = resolveClassName(
      "accordionItem",
      variant,
      "accordionItem w-full",
      "[&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-gray-300",
      className,
    );

    return (
      <div ref={ref} className={_className} {...rest} data-active={isActive}>
        {headerChild}
        {isActive && panelChild}
      </div>
    );
  },
);

interface AccordionHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ variant = "default", className, children, ...rest }: AccordionHeaderProps, ref) => {
    const _className = resolveClassName(
      "accordionHeader",
      variant,
      "accordionHeader",
      "w-full h-8 text-left",
      className,
    );

    return (
      <button ref={ref} className={_className} {...rest}>
        {children}
      </button>
    );
  },
);

interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ variant = "default", className, children, ...rest }: AccordionPanelProps, ref) => {
    const _className = resolveClassName("accordionPanel", variant, "accordionPanel", "p-4 bg-gray-100", className);

    return (
      <div ref={ref} className={_className} {...rest}>
        {children}
      </div>
    );
  },
);
