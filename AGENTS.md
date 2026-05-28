# AGENTS.md — erp-fe (Next.js 16 + shadcn/ui)

Part of the `project-erp` monorepo. Paired with `erp-be/` (Laravel API).

This is **Next.js 16** — APIs, conventions, and file structure may differ from older versions. Read `node_modules/next/dist/docs/` before writing code.

## Dev commands

```bash
npm run dev       # next dev (HMR on port 3000)
npm run build     # next build
npm run lint      # eslint (config: eslint.config.mjs)
npm run format    # prettier --write (config: .prettierrc)
npm run typecheck # tsc --noEmit
```

Run `lint && typecheck` before pushing.

## Code conventions

- **No semicolons** (Prettier: `semi: false`)
- **Double quotes** (Prettier: `singleQuote: false`)
- **Trailing commas** where valid (ES5 style)
- **Tab width: 2**
- **No `default` export** — named exports preferred

## Architecture

- **App Router** (`app/`) with RSC (`"use client"` only where interactivity needed)
- **Path alias**: `@/*` maps to project root (e.g., `@/components/ui/button`, `@/lib/utils`)
- **shadcn/ui** (`radix-mira` style) — components in `components/ui/`. Add with `npx shadcn@latest add <component>`
- **Theme**: `next-themes` with class-based dark mode (`ThemeProvider` wraps root layout). Press `d` to toggle
- **Styling**: Tailwind CSS v4 + `tw-animate-css` + `shadcn/tailwind.css` (imported in `app/globals.css`)

## Component patterns

```tsx
// Use cn() from @/lib/utils for class merging
import { cn } from "@/lib/utils"
```

- **CVA** (`class-variance-authority`) for component variants (see `components/ui/button.tsx`)
- **Radix UI** primitives via `radix-ui` package
- **Lucide** for icons (`lucide-react`)

## Prettier

- Uses `prettier-plugin-tailwindcss` — class sorting applied automatically
- Config in `.prettierrc` (tailwindStylesheet, tailwindFunctions: `cn`, `cva`)
