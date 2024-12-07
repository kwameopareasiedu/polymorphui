export interface VariantMap {
  replaceDefault?: string; // Replaces the component's base tailwind classes
  appendDefault?: string; // Appends to component's base tailwind classes
  [variant: string]: string | undefined;
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
  pagination?: VariantMap;
  paginationButton?: VariantMap;
}

export type ComponentNameType = keyof ComponentVariants;

// type ReservedVariantName = "replaceDefault" | "appendDefault";
// type NotA<T> = T extends ReservedVariantName ? never : T;
// type NotB<T> = ReservedVariantName extends T ? never : T;
// export type VariantNameType<T> = NotA<T> & NotB<T>;
// export type VariantNameType<T> = T & (T extends ReservedVariantName ? never : T);
export type VariantNameType = string;
