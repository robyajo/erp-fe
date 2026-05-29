# FE-BE Plugin Contract

## Endpoints

| Method | Endpoint | FE Usage |
|--------|----------|----------|
| `GET` | `/api/v1/plugins` | All tracked plugins (from DB) |
| `GET` | `/api/v1/plugins/available` | **FE main source** — list of installable plugins with `installed` status |
| `POST` | `/api/v1/plugins/install` | `{ name: "inventory" }` → triggers `{name}:install` Artisan command |
| `POST` | `/api/v1/plugins/uninstall` | `{ name: "inventory" }` → marks `is_installed=false, is_active=false` |

## Available Plugin Response

```typescript
interface AvailablePlugin {
  name: string       // "inventory" | "blog" | "contacts"
  label: string      // "Inventory" | "Blog" | "Contacts"
  description: string
  icon: string        // "package" | "file-text" | "users"
  latest_version: string
  license: string
  author: string
  installed: boolean  // true if currently installed
}
```

## FE Plugin Registration (Sidebar)

Each plugin must have an entry in `pluginNavItems` in `app-sidebar.tsx`:

```typescript
const pluginNavItems = {
  inventory: {
    title: "Inventory",
    items: [
      { title: "Products", url: "/inventory/products", icon: <Package /> },
      ...
    ],
  },
  blog: { ... },
  contacts: { ... },
}
```

The sidebar reads from `GET /api/v1/plugins/available`, filters `installed: true`, and maps to `pluginNavItems[plugin.name]` to build navigation.

## Adding a New Plugin

1. **BE**: Create `plugins/mitunierp/{name}/` with `composer.json`, ServiceProvider, routes, migrations
2. **BE**: Register provider in `bootstrap/providers.php`
3. **BE**: Add to `PluginController::available()` response
4. **FE**: Add to `pluginNavItems` in `app-sidebar.tsx`
5. **FE**: Add icon to `iconMap` in `plugins/page.tsx`
6. **FE**: Create pages under `app/(admin)/{name}/`

## Plugin Fields (plugins table)

```
name, author, summary, description, icon, latest_version, license,
is_core, is_active, is_installed, sort
```
