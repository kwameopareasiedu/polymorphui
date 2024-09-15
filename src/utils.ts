import deepmerge from "deepmerge";
import appTheme from "@/theme.app";
import { useMemo } from "react";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function deepMerge<T, S>(variant1: T, variant2: S) {
  return deepmerge<T | S>(variant1, variant2);
}

type ComponentName = keyof import("@/theme.rollup").ThemeVariants;

export function useVariants<T>(componentName: ComponentName, componentProps: T, variant: string) {
  const userVariants = (appTheme[componentName] ?? {}) as ComponentVariantMap<T>;
  return useMemo(() => deepMerge(userVariants[variant], componentProps), [userVariants, variant, componentProps]);
}
