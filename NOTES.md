# Notes

A place to organize my thoughts

- `prontoui` is imported into a project
- `prontoui` exports `dist/theme.app.js` into which the user's `/pronto.config.ts` is compiled
- `pronto.theme.ts` in project root with the following structure:
  ```typescript
  export default {
    spinner: {
      default: { ... },
      retro: { ... },
      elegant: { ... },
    },
    text: {
      default: { ... },
      heading1: { ... },
      paragraph: { ... },
    },
    button: {
      default: { ... },
      secondary: { ... },
      link: { ... },
    }
  } as ProntoVariants
  ```
- When `pronto generate` is run, what I want is for these things to happen:
  - Code in `pronto.theme.ts` is compiled to `node_modules/prontoui/dist/theme.app.js` with Rollup
  - For each component in `pronto.theme.ts`, its keys should be a union type for the `variant` type in the component's
    declaration file.

    E.g. For the `Button` component, the `variant` in its declarations file should be `default | secondary | link`
