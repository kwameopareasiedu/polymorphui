export interface VariantsClassNameMap {
  default: string;
  [variant: string]: string;
}

export interface ComponentVariants {
  spinner?: VariantsClassNameMap & { button?: string };
  button?: VariantsClassNameMap;
  text?: VariantsClassNameMap & { tooltip?: string };
  popup?: VariantsClassNameMap & { tooltip?: string };
  tooltip?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
