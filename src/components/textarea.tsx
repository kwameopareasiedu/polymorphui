import React, { FormEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import {
  InputAddon,
  InputError,
  InputHelper,
  InputLabel,
  InputTextArea,
  InputWrapper,
} from "@/components/input-helpers";

export interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "children"> {
  variant?: string | string[];
  label?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  autoResize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = "default",
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
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    useEffect(() => {
      autoResizeTextArea();
    }, []);

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
  },
);
