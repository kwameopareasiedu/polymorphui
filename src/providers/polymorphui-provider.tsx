import React, { createContext, ReactNode, useContext } from "react";
import { ComponentNameType, ComponentVariants, VariantMap } from "@/config/variant";
import { cn } from "@/utils";

interface PolymorphUiContextProps {
  resolveClassName: (
    componentName: ComponentNameType,
    variantName: string | string[] | null,
    structuralClassName: string,
    fallbackClassName?: string,
    className?: string,
  ) => string;
}

const PolymorphUiContext = createContext<PolymorphUiContextProps>(null as never);

interface PolymorphUiProviderProps {
  children: ReactNode;
  variants: ComponentVariants;
}

export function PolymorphUiProvider({ children, variants }: PolymorphUiProviderProps) {
  const resolveClassName = (
    componentName: ComponentNameType,
    variantName: string | string[] | null,
    structuralClassName: string,
    fallbackClassName?: string,
    className?: string,
  ) => {
    if (variantName === null) return cn(structuralClassName, className);

    const componentVariants = (variants[componentName] ?? {}) as VariantMap;
    const variantList = Array.isArray(variantName) ? variantName : [variantName];
    const variantClassName = variantList.map((variantName) => componentVariants[variantName] ?? "").join(" ");
    return cn(structuralClassName, variantClassName || fallbackClassName, className);
  };

  return (
    <PolymorphUiContext.Provider value={{ resolveClassName: resolveClassName }}>{children}</PolymorphUiContext.Provider>
  );
}

export function usePolymorphUi() {
  const polymorphUiContext = useContext(PolymorphUiContext);

  if (!polymorphUiContext) {
    throw "error: component must be a descendant of a <PolymorphUiProvider />";
  }

  return polymorphUiContext;
}
