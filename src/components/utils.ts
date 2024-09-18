import { useMemo } from "react";
import deepmerge from "deepmerge";
import type { ComponentNameType, VariantNameType, VariantPropsMap } from "@/components/variant.types";
import variants from "@/components/variants";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function useVariantProps<P>(args: {
  componentName: ComponentNameType;
  componentProps: P;
  variantName: string | string[];
  defaultProps?: Partial<Omit<P, VariantNameType>>;
}) {
  const { componentName, componentProps, variantName, defaultProps = {} } = args;

  return useMemo(() => {
    const componentVariants = (variants[componentName] ?? {}) as VariantPropsMap<P>;
    const _variantName = Array.isArray(variantName) ? variantName : [variantName];
    const variantPropsList = _variantName.map((variantName) => componentVariants[variantName] ?? {});
    const stringProps = ["className"];

    return deepmerge.all([defaultProps, ...variantPropsList, componentProps], {
      customMerge: (key) => (stringProps.includes(key) ? concatStrings : undefined),
    }) as Omit<P, VariantNameType>;
  }, [variantName, componentProps, defaultProps]);
}

const concatStrings = (strA: string, strB: string) => [strA, strB].join(" ");
