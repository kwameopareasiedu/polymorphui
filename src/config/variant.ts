export interface VariantMap {
  default: string;
  [variant: string]: string;
}

export interface ComponentVariants {
  spinner?: VariantMap & { button?: string };
  button?: VariantMap;
  text?: VariantMap;
  tooltip?: VariantMap;
  contextMenuItems?: VariantMap;
  contextMenuItem?: VariantMap;
  inputLabel?: VariantMap;
  inputError?: VariantMap;
  inputHelper?: VariantMap;
  inputAddon?: VariantMap;
  inputWrapper?: VariantMap;
  input?: VariantMap;
  inputInput?: VariantMap;
  textarea?: VariantMap;
  inputTextArea?: VariantMap;
  select?: VariantMap;
  selectButton?: VariantMap;
  selectItems?: VariantMap;
  selectItem?: VariantMap;
  switch?: VariantMap;
  switchThumb?: VariantMap;
  checkbox?: VariantMap;
  checkboxCheck?: VariantMap;
  radioGroup?: VariantMap;
  radioGroupItems?: VariantMap;
  radioGroupItem?: VariantMap;
  dialog?: VariantMap;
  dialogContent?: VariantMap;
  dialogClose?: VariantMap;
  tabs?: VariantMap;
  tabItems?: VariantMap;
  tabItem?: VariantMap;
  tabPanel?: VariantMap;
  accordion?: VariantMap;
  accordionItem?: VariantMap;
  accordionHeader?: VariantMap;
  accordionPanel?: VariantMap;
  badge?: VariantMap;
}

export type ComponentNameType = keyof ComponentVariants;
