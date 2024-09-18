import React, { forwardRef, HTMLAttributes } from "react";
import { cn, resolveClassName } from "@/components/utils";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: string | string[];
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "li";
  inline?: boolean;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "default", as, inline, className, children, ...rest }: TextProps, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = (inline ? "span" : as || "p") as any;

    const _className = resolveClassName("text", variant, cn("text", inline && "inline"), undefined, className);

    return (
      <Comp ref={ref} className={_className} {...rest}>
        {children}
      </Comp>
    );
  },
);
