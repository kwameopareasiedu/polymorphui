import deepmerge from "deepmerge";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function deepMerge<T, S>(variant1: T, variant2: S) {
  return deepmerge<T | S>(variant1, variant2);
}
