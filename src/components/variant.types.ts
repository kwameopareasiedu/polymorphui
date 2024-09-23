export interface VariantsClassNameMap {
  default: string;
  [variant: string]: string;
}

export interface ComponentVariants {
  spinner?: VariantsClassNameMap & { button?: string };
  button?: VariantsClassNameMap;
  text?: VariantsClassNameMap;
  tooltip?: VariantsClassNameMap;
  contextMenuItems?: VariantsClassNameMap;
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
  selectItems?: VariantsClassNameMap;
  selectItem?: VariantsClassNameMap;
  switch?: VariantsClassNameMap;
  switchThumb?: VariantsClassNameMap;
  checkbox?: VariantsClassNameMap;
  checkboxCheck?: VariantsClassNameMap;
  radioGroup?: VariantsClassNameMap;
  radioGroupItems?: VariantsClassNameMap;
  radioGroupItem?: VariantsClassNameMap;
  dialog?: VariantsClassNameMap;
  dialogContent?: VariantsClassNameMap;
  dialogClose?: VariantsClassNameMap;
  tabs?: VariantsClassNameMap;
  tabItems?: VariantsClassNameMap;
  tabItem?: VariantsClassNameMap;
  tabPanel?: VariantsClassNameMap;
}

export type ComponentNameType = keyof ComponentVariants;
