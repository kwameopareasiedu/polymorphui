export interface ThemeVariants {
  spinner?: ComponentVariantMap<import("@/components/spinner").SpinnerProps>;
}

export default {
  spinner: {
    default: { size: 20 },
    retro: { size: 14 },
  },
} as ThemeVariants;
