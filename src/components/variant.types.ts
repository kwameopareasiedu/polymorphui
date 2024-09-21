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
  contextMenuItem?: VariantsClassNameMap;
  inputLabel?: VariantsClassNameMap;
  inputError?: VariantsClassNameMap;
  inputHelper?: VariantsClassNameMap;
  inputAddon?: VariantsClassNameMap;
  inputWrapper?: VariantsClassNameMap;
  input?: VariantsClassNameMap;
  textarea?: VariantsClassNameMap;
  select?: VariantsClassNameMap;
  selectOptions?: VariantsClassNameMap;
  selectOption?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
