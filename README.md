# ProntoUI

[**["Pronto" - "_With Great Speed_"]**](https://www.merriam-webster.com/thesaurus/pronto)

**ProntoUI** is a headless component library with the easiest customizability ever and **custom type-safe variants**.
It is inspired by how the [Prisma ORM](https://www.prisma.io/) dynamically builds the prisma client package based on
the `prisma.schema` file.

## Getting Started

Getting started with ProntoUI is the simplest thing ever:

1. Create the config file by running `npx prontoui init`. This creates a `pronto.config.ts` at the root of your project
2. Define component variants in `pronto.config.ts`. This would look something like this:

   ```typescript
   import type { ProntoVariants } from "prontoui/variant";

   export default {
     spinner: {
       default: {},
       amber: { size: 8, className: "stroke-amber-500" },
       bubble: { size: 24, className: "stroke-green-500" },
     },
     button: {
       default: {},
       primary: {},
       secondary: {},
       /* Other button variants (As many variants as you want 😀) */
     },
     /* Other component variants */
   } as ProntoVariants;
   ```

3. Run `npx prontoui generate` and that's it. Seriously!

4. Use ProntoUI components in your app

```typescript jsx
import { Spinner } from "prontoui/spinner";

<Spinner variant="default" />; // The "variant" prop is now limited to "default" | "amber" | "bubble"
```

## Goals

- [x] Set up a build system with Rollup for the following tasks:
  - [x] Compile components from Typescript to Javascript (`*.tsx` -> `*.js`)
  - [x] Generate component typings files (`*.tsx` -> `*.d.ts`)
  - [x] Generate variants typings which exports typings for the host app's config file (`variant.d.ts`)
  - [x] Generate variant placeholder file for the host app's compiled variants (`variant.js`)
  - [x] Compile the CLI to exported binaries
- [x] Set up a CLI with the following commands:
  - [x] `init`: Create `pronto.config.ts` in host app root
  - [x] `generate`: Compile `pronto.config.ts` in host app to `node_modules/prontoui/dist/variant.js`
- [x] Export unstyled customizable components
