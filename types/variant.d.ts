interface ComponentVariantMap<T> {
  default: Omit<T, "variant">;
  [variant: string]: Omit<T, "variant">;
}
