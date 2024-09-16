import deepmerge from "deepmerge";
import appVariants from "@/variant.app";
import { useMemo } from "react";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function deepMerge<T, S>(variant1: T, variant2: S) {
  return deepmerge<T | S>(variant1, variant2);
}

type ComponentName = keyof import("@/variant.rollup").ProntoVariants;

export function useComponentVariants<T>(componentName: ComponentName, componentProps: T, variantName: string) {
  const appComponentVariants = (appVariants[componentName] ?? {}) as import("@/variant.rollup").ComponentVariantMap<T>;
  return useMemo(
    () => deepMerge(appComponentVariants[variantName], componentProps),
    [appComponentVariants, variantName, componentProps],
  );
}
