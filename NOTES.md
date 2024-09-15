# Notes

A place to organize my thoughts

- `twReact` is imported into a project
- `twReact` exports two theme files:
  - `theme-default.js`: Built from the default theme file from `twReact`
  - `theme-user.js`: Compiled from the `twreact.theme.ts` in target project
- Dev creates `twreact.theme.ts` in project root with the following structure:
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
  } as ThemeVariant
  ```
- When `twreact generate` is run, what I want is for these things to happen:
  - Code in `twreact.theme.ts` is compiled to `node_modules/twreact/dist/theme-user.js` with Rollup
  - For each component in `twreact.theme.ts`, its keys should be a union type for the `variant` type in the component's
    declaration file.

    E.g. For the `Button` component, the `variant` in its declarations file should be `default | secondary | link`
