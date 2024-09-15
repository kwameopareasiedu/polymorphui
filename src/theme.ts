export interface ThemeVariants {
  spinner?: ComponentVariantMap<import("@/lib/spinner").SpinnerProps>;
}

export default {
  spinner: {
    default: { size: 20 },
    retro: { size: 14 },
  },
} as ThemeVariants;
