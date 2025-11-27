import React, { ElementType, forwardRef, LabelHTMLAttributes } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

export interface TextProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "li" | "label";
  inline?: boolean;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as, inline, className, children, ...rest }: TextProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const Comp = (inline ? "span" : as || "p") as ElementType;

  return (
    <Comp
      ref={ref}
      className={resolveClassName("text", "text data-[inline]:inline", undefined, className)}
      {...rest}
      data-inline={inline}>
      {children}
    </Comp>
  );
});
