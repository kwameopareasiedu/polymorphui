export interface ClassNameConfig {
  custom?: string; // Replaces the component's base tailwind classes
  extend?: string; // Appends to component's base tailwind classes
}

export interface ComponentConfig {
  spinner?: ClassNameConfig;
  button?: ClassNameConfig;
  text?: ClassNameConfig;
  tooltip?: ClassNameConfig;
  contextMenuItems?: ClassNameConfig;
  contextMenuItem?: ClassNameConfig;
  inputLabel?: ClassNameConfig;
  inputError?: ClassNameConfig;
  inputHelper?: ClassNameConfig;
  inputAddon?: ClassNameConfig;
  inputWrapper?: ClassNameConfig;
  input?: ClassNameConfig;
  inputInput?: ClassNameConfig;
  textarea?: ClassNameConfig;
  inputTextArea?: ClassNameConfig;
  select?: ClassNameConfig;
  selectButton?: ClassNameConfig;
  selectItems?: ClassNameConfig;
  selectItem?: ClassNameConfig;
  switch?: ClassNameConfig;
  switchThumb?: ClassNameConfig;
  checkbox?: ClassNameConfig;
  checkboxCheck?: ClassNameConfig;
  radioGroup?: ClassNameConfig;
  radioGroupItems?: ClassNameConfig;
  radioGroupItem?: ClassNameConfig;
  dialog?: ClassNameConfig;
  dialogContent?: ClassNameConfig;
  dialogClose?: ClassNameConfig;
  tabs?: ClassNameConfig;
  tabItems?: ClassNameConfig;
  tabItem?: ClassNameConfig;
  tabPanel?: ClassNameConfig;
  accordion?: ClassNameConfig;
  accordionItem?: ClassNameConfig;
  accordionHeader?: ClassNameConfig;
  accordionPanel?: ClassNameConfig;
  badge?: ClassNameConfig;
  pagination?: ClassNameConfig;
  paginationButton?: ClassNameConfig;
  breadcrumbs?: ClassNameConfig;
  breadcrumbItem?: ClassNameConfig;
  breadcrumbSeparator?: ClassNameConfig;
  datePicker?: ClassNameConfig;
  datePickerCalendar?: ClassNameConfig;
  datePickerCalendarDay?: ClassNameConfig;
  table?: ClassNameConfig;
  tableHead?: ClassNameConfig;
  tableRow?: ClassNameConfig;
  tableLoader?: ClassNameConfig;
  detailsTable?: ClassNameConfig;
  detailsTableRow?: ClassNameConfig;
  detailsTableHeader?: ClassNameConfig;
  detailsTableFooter?: ClassNameConfig;
  detailsTableLoader?: ClassNameConfig;
}

export type ComponentNameType = keyof ComponentConfig;
