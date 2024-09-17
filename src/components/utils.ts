import { useMemo } from "react";
import deepmerge from "deepmerge";
import appVariants from "./variant"; // IMPORTANT: LEAVE AS RELATIVE IMPORT

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function deepMerge<T, S>(variant1: T, variant2: S) {
  return deepmerge<T | S>(variant1, variant2);
}

type ComponentName = keyof import("@/components/variant.types").ProntoVariants;

export function useComponentVariants<T>(args: {
  componentName: ComponentName;
  componentProps: T;
  variantName: string;
  defaultProps: Partial<Omit<T, "variant">>;
}) {
  const { componentName, componentProps, variantName, defaultProps } = args;

  return useMemo(() => {
    const componentVariants = (appVariants[componentName] ??
      {}) as import("@/components/variant.types").ComponentVariantMap<T>;
    const variantProps = componentVariants[variantName] ?? {};
    return deepMerge(deepmerge(defaultProps, variantProps), componentProps);
  }, [variantName, componentProps, defaultProps]);
}
