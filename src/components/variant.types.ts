export interface VariantsClassNameMap {
  default: string;
  [variant: string]: string;
}

export interface ComponentVariants {
  spinner?: VariantsClassNameMap;
  button?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
