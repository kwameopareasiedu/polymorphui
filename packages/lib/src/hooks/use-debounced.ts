import { useEffect, useRef, useState } from "react";

function defaultCompare<T>(item1: T, item2: T) {
  return JSON.stringify(item1) === JSON.stringify(item2);
}

export function useDebounced<T>(initial: T, timeout = 750, compare = defaultCompare) {
  const timer = useRef<number>(0);
  const [value, setValue] = useState(initial);
  const [debounced, setDebounced] = useState(initial);

  useEffect(() => {
    if (!compare(value, debounced)) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setDebounced(value), timeout);
    }
  }, [value]);

  return [value, debounced, setValue] as const;
}
