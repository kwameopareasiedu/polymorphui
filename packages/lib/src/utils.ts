import { MutableRefObject } from "react";

export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}

export function combineRefs<T>(...refs: (MutableRefObject<T | null> | ((e: T | null) => void) | null)[]) {
  return (el: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }
  };
}
