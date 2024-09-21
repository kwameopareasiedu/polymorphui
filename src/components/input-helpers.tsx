import React, {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import { combineRefs, resolveClassName } from "@/components/utils";

export interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: string | string[];
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ variant = "default", className, children, ...rest }: InputLabelProps, ref) => {
    const _className = resolveClassName("inputLabel", variant, "inputLabel", "text-sm text-gray-600", className);

    return (
      <label ref={ref} className={_className} {...rest}>
        {children}
      </label>
    );
  },
);

export interface InputHelperProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
}

export const InputHelper = forwardRef<HTMLSpanElement, InputHelperProps>(
  ({ variant = "default", className, children, ...rest }: InputHelperProps, ref) => {
    const _className = resolveClassName("inputHelper", variant, "inputHelper", "text-xs text-gray-400", className);

    return (
      <span ref={ref} className={_className} {...rest}>
        {children}
      </span>
    );
  },
);

export const InputError = forwardRef<HTMLSpanElement, InputHelperProps>(
  ({ variant = "default", className, children, ...rest }: InputHelperProps, ref) => {
    const _className = resolveClassName("inputError", variant, "inputError", "text-xs text-red-500", className);

    return (
      <span ref={ref} className={_className} {...rest}>
        {children}
      </span>
    );
  },
);

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string | string[];
}

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
  ({ variant = "default", className, children, ...rest }: InputAddonProps, ref) => {
    const _className = resolveClassName(
      "inputAddon",
      variant,
      "inputAddon inline-grid place-items-center",
      undefined,
      className,
    );

    return (
      <span ref={ref} className={_className} {...rest}>
        {children}
      </span>
    );
  },
);

export interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ variant = "default", className, children, ...rest }: InputWrapperProps, ref) => {
    const _className = resolveClassName(
      "inputWrapper",
      variant,
      "inputWrapper flex items-center gap-2",
      "bg-white px-2 rounded border-2 border-gray-300 focus-within:border-blue-400 " +
        "has-[input:disabled]:opacity-50 has-[input:disabled]:bg-gray-100",
      className,
    );

    return (
      <div ref={ref} className={_className} {...rest}>
        {children}
      </div>
    );
  },
);

export interface InputInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string | string[];
}

export const InputInput = forwardRef<HTMLInputElement, InputInputProps>(
  ({ variant = "default", className, children, ...rest }: InputInputProps, ref) => {
    const _className = resolveClassName(
      "inputInput",
      variant,
      "inputInput flex-1",
      "py-2 bg-transparent focus:outline-none placeholder:text-sm",
      className,
    );

    return (
      <input ref={ref} className={_className} {...rest}>
        {children}
      </input>
    );
  },
);

export interface InputTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  variant?: string | string[];
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ variant = "default", className, children, ...rest }: InputTextAreaProps, ref) => {
    const _className = resolveClassName(
      "inputTextArea",
      variant,
      "inputTextArea flex-1",
      "min-h-24 py-2 bg-transparent resize-none focus:outline-none " +
        "placeholder:text-sm placeholder:text-sm placeholder:pt-0.5",
      className,
    );

    return (
      <textarea ref={ref} className={_className} {...rest}>
        {children}
      </textarea>
    );
  },
);

export interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

export const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
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

export interface SelectOptionsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

export const SelectOptions = forwardRef<HTMLDivElement, SelectOptionsProps>(
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

export interface SelectOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
}

export const SelectOptionButton = forwardRef<HTMLButtonElement, SelectOptionButtonProps>(
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

export interface SwitchThumbProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: string | string[];
}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ variant = "default", className, ...rest }: InputHelperProps, ref) => {
    const _className = resolveClassName(
      "switchThumb",
      variant,
      "switchThumb inline-block h-full aspect-square rounded-full transition-all",
      "bg-white",
      className,
    );

    return <span ref={ref} className={_className} {...rest} />;
  },
);
