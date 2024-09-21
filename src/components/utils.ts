import type { ComponentNameType, VariantsClassNameMap } from "@/components/variant.types";
import variants from "@/components/variants";
import { MutableRefObject } from "react";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function resolveClassName(
  componentName: ComponentNameType,
  variantName: string | string[] | null,
  structuralClassName: string,
  fallbackClassName?: string,
  className?: string,
) {
  if (variantName === null) return cn(structuralClassName, className);

  const componentVariants = (variants[componentName] ?? {}) as VariantsClassNameMap;
  const variantList = Array.isArray(variantName) ? variantName : [variantName];
  const variantClassName = variantList.map((variantName) => componentVariants[variantName] ?? "").join(" ");
  return cn(structuralClassName, variantClassName || fallbackClassName, className);
}

export function combineRefs<T>(...refs: (MutableRefObject<T | null> | ((e: T | null) => void) | null)[]) {
  return (el: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }
  };
}
