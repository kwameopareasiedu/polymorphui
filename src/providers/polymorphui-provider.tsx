import React, { createContext, ReactNode, useContext } from "react";
import { ComponentNameType, ComponentVariants, VariantMap, VariantNameType } from "@/config/variant";
import { cn } from "@/utils";

interface PolymorphUiContextProps {
  resolveClassName: (
    componentName: ComponentNameType,
    variantName: VariantNameType | VariantNameType[] | null | undefined,
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

export function PolymorphUiProvider({ children, variants: allVariants }: PolymorphUiProviderProps) {
  const resolveClassName = (
    componentName: ComponentNameType,
    variantName: VariantNameType | VariantNameType[] | null | undefined,
    structuralClassName: string,
    defaultClassName?: string,
    className?: string,
  ) => {
    const { replaceDefault, appendDefault, ...restOfVariants } = (allVariants[componentName] ?? {}) as VariantMap;
    const resolvedDefaultClassName = replaceDefault ?? cn(defaultClassName, appendDefault);
    if (!variantName) return cn(structuralClassName, resolvedDefaultClassName, className);

    const variantList = Array.isArray(variantName) ? variantName : [variantName];
    const variantClassName = variantList.map((variantName) => restOfVariants[variantName] ?? "").join(" ");
    return cn(structuralClassName, resolvedDefaultClassName, variantClassName, className);
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
