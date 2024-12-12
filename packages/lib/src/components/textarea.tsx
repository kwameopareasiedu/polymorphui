import React, { FormEvent, forwardRef, InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import { InputAddon, InputError, InputHelper, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { combineRefs } from "@/utils";
import { VariantNameType } from "@/config/variant";

export interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "children"> {
  variant?: VariantNameType | VariantNameType[];
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  autoResize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    variant,
    label,
    leading,
    trailing,
    id,
    className,
    helper,
    error,
    autoResize = true,
    onInput,
    ...rest
  }: TextAreaProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [autoFocusedInitially, setAutoFocusedInitially] = useState(false);

  const _className = resolveClassName(
    "textarea",
    variant,
    "textarea w-full flex flex-col gap-0.5",
    undefined,
    className,
  );

  const autoResizeTextArea = () => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "10px";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }
  };

  const handleOnInput = (e: FormEvent<HTMLTextAreaElement>) => {
    onInput?.(e);
    autoResizeTextArea();
  };

  if (!autoFocusedInitially) {
    autoResizeTextArea();
    setAutoFocusedInitially(true);
  }

  return (
    <div className={_className}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      <InputWrapper className="!items-start">
        {leading && <InputAddon>{leading}</InputAddon>}
        <InputTextArea ref={combineRefs(ref, textareaRef)} onInput={handleOnInput} {...rest} />
        {trailing && <InputAddon>{trailing}</InputAddon>}
      </InputWrapper>

      {(helper || error) && (
        <div className="flex items-center justify-between gap-2">
          {error && <InputError>{error}</InputError>}
          {helper && <InputHelper>{helper}</InputHelper>}
        </div>
      )}
    </div>
  );
});

interface InputTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  variant?: VariantNameType | VariantNameType[];
}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(function InputTextArea(
  { variant, className, children, ...rest }: InputTextAreaProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
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
});
