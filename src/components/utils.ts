import type { ComponentNameType, VariantsClassNameMap } from "@/components/variant.types";
import variants from "@/components/variants";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function resolveClassName(
  componentName: ComponentNameType,
  variantName: string | string[],
  structuralClassName: string,
  fallbackClassName?: string,
  className?: string,
) {
  const componentVariants = (variants[componentName] ?? {}) as VariantsClassNameMap;
  const variantList = Array.isArray(variantName) ? variantName : [variantName];
  const variantClasses = variantList.map((variantName) => componentVariants[variantName] ?? "").join(" ");
  return cn(structuralClassName, variantClasses || fallbackClassName, className);
}
