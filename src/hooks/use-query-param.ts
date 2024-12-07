import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParam(paramName: string, defaultParamValue?: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName) as string | undefined;

  const setParam = (newValue: string | undefined) => {
    setSearchParams((params) => {
      if (newValue !== undefined) {
        params.set(paramName, newValue);
      } else params.delete(paramName);
      return params;
    });
  };

  useEffect(() => {
    if (defaultParamValue && !paramValue) {
      setParam(defaultParamValue);
    }
  }, []);

  return [paramValue, setParam] as const;
}
