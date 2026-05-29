# ERP Layout Concept & Guidelines (`layout-plugin.md`)

This document serves as the layout design specification for the ERP portal. All custom modules, extensions, and plugins must adhere to this architecture to ensure a consistent, responsive, and premium Odoo-like User Experience.

---

## 1. Core Layout Structure

The layout is wrapped in Next.js's standard `SidebarProvider` layout split. It is split into two primary zones:

1. **Global Top Header (100% Width)**: Persistent at the top across all modules.
2. **Main Layout Split Area**:
   - **Desktop**: Left Sidebar (sticky, static width `w-56`) + Main Content Area.
   - **Mobile**: Hidden Sidebar + Main Content Area with a Sub-Menu Selector.

---

## 2. Global Top Header

The header ([header.tsx](file:///e:/PROJECT%20ROBY/ANY/2026/LARAVEL%2013/project-erp/erp-fe/components/admin/common/header.tsx)) acts as the primary global context launcher.

### Desktop Layout (`md` and above)

```
[ Launcher (9-Dots) ] [ Logo ] [ Module Title ] | [ Sub-Nav Tabs ]  --- (Centered Space) ---  [ Search Bar ] [ Bell ] [ Avatar ]
```

- **Launcher**: Triggers a dropdown with quick-access grids to switch modules (Dashboard, Inventory, Blog, Settings, etc.).
- **Sub-Nav Tabs**: Links for the active module's main sections (e.g., Operations, Products, configurations).
- **Search Bar**: Positioned on the right end of the header, grouped with notifications and profile settings.

### Mobile Layout (below `md`)

```
[ Hamburger ] [ Launcher (9-Dots) ]  ====== [ Centered Search Input ] ======  [ Bell ] [ Avatar ]
```

- **Logo & Module Title**: Hidden to maximize horizontal space.
- **Sub-Nav Tabs**: Hidden from the top header entirely.
- **Search Input**: Expands to take up the middle section (`flex-1` with `max-w-sm`) between the left launcher buttons and right utility icons.
- **Hamburger Button**: Appears on pages that conditionally require mobile drawers/menus.

---

## 3. Left Navigation Menu (Desktop vs. Mobile)

Modules requiring sub-menus (such as Inventory, Blog, and Contacts) utilize a dual-layout responsive architecture.

### Desktop Sidebar Layout

- **Style**: Sticky sidebar, static `w-56`, border right.
- **Organization**: Items are grouped into clear, uppercase sections (e.g., _Transfers_, _Adjustments_).
- **Aesthetics**: Soft blue background pill highlighting (`bg-blue-50 text-blue-600`) with bold text for the active item.
- **Icons**: Every item must render a relevant Lucide icon (e.g. `Inbox`, `Truck`, `ArrowUpDown`, `Trash2`).

### Mobile Selector Layout

- **Component**: Built directly above page contents inside the content area.
- **Style**: A full-width styled button selector with a border and chevron-down icon.
- **Behavior**: Displays the active page title and icon. Clicking the button opens a grouped list matching the sidebar hierarchy (with bold headers and sub-item icons) to navigate instantly without requiring a drawer.

---

## 4. Integration Guide for Custom Plugins

Every page in a plugin must be wrapped in `PageContainerAdmin` to inherit the breadcrumbs, mobile sub-menu dropdown selector, and layout styling automatically.

### Code Pattern Example

When creating a new page (e.g. `/app/(admin)/my-plugin/page.tsx`):

```tsx
"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

// 1. Define breadcrumb array
const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Plugin", href: "/my-plugin", isCurrent: true },
]

// 2. Define main page header nav tabs (shown on desktop headers)
const headerNavTabs = [
  { label: "Overview", href: "/my-plugin" },
  { label: "Settings", href: "/my-plugin/settings" },
]

export default function PluginPage() {
  return (
    <PageContainerAdmin
      title="My Plugin"
      headerNav={headerNavTabs}
      breadcrumb={breadcrumbs}
    >
      <div className="flex flex-col gap-6">
        {/* Page Title Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plugin Overview</h1>
          <p className="text-muted-foreground text-sm">
            Manage your custom plugin features and dashboard
          </p>
        </div>

        {/* Responsive Content Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Package className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-base">Features list</CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainerAdmin>
  )
}
```

### Table Guidelines

When presenting data lists or tables, wrap the native `<table>` element in a scroll container with rounded borders:

```tsx
<div className="overflow-x-auto rounded-lg border">
  <table className="w-full text-sm">
    <thead className="bg-muted/50 text-muted-foreground">
      <tr>
        <th className="px-4 py-3 text-left font-medium">Column A</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr>
        <td className="px-4 py-3">Value A</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 5. SSR & Hydration Safety Guidelines

Since the routing matching supports query parameters (`window.location.search`), you must use the Two-Pass Rendering pattern in all client components containing path validations to prevent hydration mismatches:

```tsx
const [mounted, setMounted] = React.useState(false)
React.useEffect(() => {
  setMounted(true)
}, [])

const getIsActive = (url: string) => {
  if (!mounted) {
    return pathname === url // Server-fallback matching path only
  }
  return pathname === url || (pathname + window.location.search) === url // Safe client evaluation
}
```
