import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useQueryParams<T extends Record<string, string | undefined>>(initialParams: T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(resolveInitialParams(searchParams, initialParams));

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

function resolveInitialParams<T extends Record<string, string | undefined>>(
  searchParams: URLSearchParams,
  initialParams: T,
) {
  const resolved = {} as T;

  for (const key in initialParams) {
    // @ts-expect-error key is defined on resolved
    resolved[key] = searchParams.get(key) ?? initialParams[key];
  }

  return resolved;
}
