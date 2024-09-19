export interface VariantsClassNameMap {
  default: string;
  [variant: string]: string;
}

export interface ComponentVariants {
  spinner?: VariantsClassNameMap & { button?: string };
  button?: VariantsClassNameMap;
  text?: VariantsClassNameMap;
  popup?: VariantsClassNameMap;
  tooltip?: VariantsClassNameMap;
  contextMenu?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
