import React, { FormEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { combineRefs, resolveClassName } from "@/components/utils";

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
      "[&>.w]:bg-white [&>.w]:px-2 [&>.w]:rounded [&>.w]:border-2 [&>.w]:border-gray-300 " +
        "[&>.w:focus-within]:border-blue-400 [&>.w:has(input:disabled)]:opacity-50 [&>.w:has(input:disabled)]:bg-gray-100 " +
        "[&>label]:text-sm [&>label]:text-gray-600 [&_textarea]:py-2 [&_textarea]:resize-none [&_textarea]:min-h-24 " +
        "[&_textarea]:bg-transparent [&_textarea:focus]:outline-none [&_textarea]:placeholder:text-sm " +
        "[&_textarea]:placeholder:text-sm [&_textarea]:placeholder:pt-0.5 [&_.l]:mt-3 [&_.t]:mt-3 [&_.e]:text-xs [&_.e]:text-red-500 [&_.h]:text-xs " +
        "[&_.h]:text-gray-400",
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
        {label && <label htmlFor={id}>{label}</label>}

        <div className="w flex items-start gap-2">
          {leading && <span className="l inline-grid place-items-center">{leading}</span>}
          <textarea ref={combineRefs(ref, textareaRef)} className="flex-1" {...rest} onInput={handleOnInput} />
          {trailing && <span className="t inline-grid place-items-center">{trailing}</span>}
        </div>

        {(helper || error) && (
          <div className="f flex items-center justify-between gap-2">
            {error && <span className="e">{error}</span>}
            {helper && <span className="h">{helper}</span>}
          </div>
        )}
      </div>
    );
  },
);
