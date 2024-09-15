declare module "*.svg" {
  const content: string;
  export default content;
}

interface ComponentVariantMap<T> {
  default: Omit<T, "variant">;
  [variant: string]: Omit<T, "variant">;
}
