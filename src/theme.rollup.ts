export interface ComponentVariantMap<T> {
  default: Omit<T, "variant">;
  [variant: string]: Omit<T, "variant">;
}

export interface ThemeVariants {
  spinner?: ComponentVariantMap<import("@/components/spinner").SpinnerProps>;
}
