import React, { createContext, ReactNode, useContext } from "react";
import { ComponentNameType, ComponentConfig, ClassNameConfig } from "@/config/config";
import { cn } from "@/utils";

interface PolymorphUiContextProps {
  resolveClassName: (
    componentName: ComponentNameType,
    structuralClassName: string,
    defaultClassName?: string,
    className?: string,
  ) => string;
}

const PolymorphUiContext = createContext<PolymorphUiContextProps>(null as never);

interface PolymorphUiProviderProps {
  children: ReactNode;
  config: ComponentConfig;
}

export function PolymorphUiProvider({ children, config }: PolymorphUiProviderProps) {
  const resolveClassName = (
    componentName: ComponentNameType,
    structuralClassName: string,
    defaultClassName?: string,
    className?: string,
  ) => {
    const { custom, extend } = (config[componentName] ?? {}) as ClassNameConfig;
    return cn(structuralClassName, custom ?? cn(defaultClassName, extend), className);
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
