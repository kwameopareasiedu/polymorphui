interface ComponentThemeVariants<T> {
  [variant: string]: T;
}

interface Theme {
  spinner: ComponentThemeVariants<SpinnerTheme>;
}

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  icon?: React.ReactNode;
}
