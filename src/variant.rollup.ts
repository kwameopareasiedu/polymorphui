export interface ComponentVariantMap<T> {
  default: Omit<T, "variant">;
  [variant: string]: Omit<T, "variant">;
}

export interface ProntoVariants {
  spinner?: ComponentVariantMap<import("@/components/spinner").SpinnerProps>;
}
