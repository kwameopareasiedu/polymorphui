import React, { FormEvent, forwardRef, InputHTMLAttributes, ReactNode, useRef } from "react";
import { InputAddon, InputError, InputHelper, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { combineRefs } from "@/utils";

export interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "children"> {
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  autoResize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, leading, trailing, id, className, helper, error, autoResize = true, onInput, ...rest }: TextAreaProps,
  ref,
) {
  const autoResizedInitially = useRef(false);
  const { resolveClassName } = usePolymorphUi();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const _className = resolveClassName("textarea", "textarea w-full flex flex-col gap-0.5", undefined, className);

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

  if (!autoResizedInitially.current) {
    autoResizeTextArea();
    autoResizedInitially.current = true;
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

type InputTextAreaProps = InputHTMLAttributes<HTMLTextAreaElement>;

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(function InputTextArea(
  { className, children, ...rest }: InputTextAreaProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <textarea
      ref={ref}
      className={resolveClassName(
        "inputTextArea",
        "inputTextArea flex-1",
        "min-h-24 py-2 bg-transparent resize-none focus:outline-none " + "placeholder:text-sm placeholder:pt-0.5",
        className,
      )}
      {...rest}>
      {children}
    </textarea>
  );
});
