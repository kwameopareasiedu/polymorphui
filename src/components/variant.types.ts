export type VariantNameType = "variant";

export interface VariantPropsMap<T> {
  default: Omit<T, VariantNameType>;
  [variant: string]: Omit<T, VariantNameType>;
}

export interface ComponentVariants {
  spinner?: VariantPropsMap<import("@/components/spinner").SpinnerProps>;
  button?: VariantPropsMap<import("@/components/button").ButtonProps>;
}

export type ComponentNameType = keyof ComponentVariants;
