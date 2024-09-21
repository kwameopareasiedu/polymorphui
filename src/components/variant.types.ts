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
  inputInput?: VariantsClassNameMap;
  textarea?: VariantsClassNameMap;
  inputTextArea?: VariantsClassNameMap;
  select?: VariantsClassNameMap;
  selectButton?: VariantsClassNameMap;
  selectOptions?: VariantsClassNameMap;
  selectOptionButton?: VariantsClassNameMap;
  switch?: VariantsClassNameMap;
  switchThumb?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
