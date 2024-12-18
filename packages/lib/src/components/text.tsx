import React, { forwardRef, LabelHTMLAttributes } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";

export interface TextProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  variant?: VariantNameType | VariantNameType[] | null;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "li" | "label";
  inline?: boolean;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { variant, as, inline, className, children, ...rest }: TextProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const Comp = (inline ? "span" : as || "p") as any;
  const _className = resolveClassName("text", variant, "text data-[inline]:inline", undefined, className);

  return (
    <Comp ref={ref} className={_className} {...rest} data-inline={inline}>
      {children}
    </Comp>
  );
});
