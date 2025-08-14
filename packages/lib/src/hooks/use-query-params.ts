import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useQueryParams<T extends Record<string, string | undefined>>(initialParams: T) {
  const [, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(initialParams);

  const handleSetParam = (key: keyof T, value: string | undefined) => {
    setSearchParams((params) => {
      if (value !== undefined) {
        params.set(key as never, value);
      } else params.delete(key as never);

      return params;
    });

    setParams((params) => ({ ...params, [key]: value }));
  };

  useEffect(() => {
    setSearchParams((params) => {
      for (const key in initialParams) {
        if (!params.has(key) && initialParams[key] != undefined) {
          params.set(key, initialParams[key]);
        }
      }

      return params;
    });
  }, []);

  return [params, handleSetParam] as const;
}
