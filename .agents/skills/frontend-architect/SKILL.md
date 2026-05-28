---
name: frontend-architect
description: Build Next.js 16 frontend for ERP with shadcn/ui, Tailwind CSS v4, and dark mode.
license: MIT
compatibility: opencode
metadata:
    audience: frontend-engineers
---

# Project Context

- **Repo**: `project-erp/erp-fe` — Next.js 16 + shadcn/ui
- **Pair**: `project-erp/erp-be` (Laravel API)
- **Docs**: `AGENTS.md`, `README.md`
- **Progress**: `progress.txt`

---

# Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2 (App Router) |
| React | 19 |
| UI Library | shadcn/ui (`radix-mira` style) |
| Styling | Tailwind CSS v4 + `tw-animate-css` |
| Icons | Lucide React |
| Primitives | Radix UI (`radix-ui` package) |
| Theme | next-themes (class-based dark mode) |
| Formatting | Prettier + prettier-plugin-tailwindcss |
| Linting | ESLint 9 (next core-web-vitals + typescript) |

---

# Dev Commands

```bash
npm run dev       # next dev (HMR :3000)
npm run build     # next build
npm run lint      # eslint
npm run format    # prettier --write
npm run typecheck # tsc --noEmit
```

Run `lint && typecheck` before pushing.

---

# Code Conventions

- **No semicolons**, **double quotes**, trailing ES5 commas, tab width 2
- **Named exports** preferred over default exports
- **Path alias**: `@/*` maps to project root
- **`cn()`** from `@/lib/utils` for Tailwind class merging
- **CVA** (`class-variance-authority`) for component variants
- `"use client"` only where interactivity is needed (RSC by default)

---

# Key Files

| File | Purpose |
|------|---------|
| `app/globals.css` | Tailwind v4 + shadcn theme variables |
| `app/layout.tsx` | Root layout with Geist font + ThemeProvider |
| `app/page.tsx` | Landing page |
| `components/ui/` | shadcn components (add via `npx shadcn@latest add`) |
| `components/theme-provider.tsx` | Dark mode (`d` key to toggle) |
| `lib/utils.ts` | `cn()` utility |
| `components.json` | shadcn configuration |

---

# Architecture

- **App Router** (`app/`) with RSC — only add `"use client"` where interactivity is needed
- **shadcn/ui** (`radix-mira` style, neutral base, lucide icons)
- **Theme provider** wraps root layout; press `d` to toggle dark/light
- **Tailwind v4** via `@tailwindcss/postcss` — no tailwind.config needed
- **Prettier** auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`

---

# After Every Task

- Update `progress.txt` (append, never overwrite)