# Menu Plan — ERP Plugin Navigation

## Default State (no plugins installed)

```
Sidebar
├── Plugins       /plugins     — install/uninstall plugins
└── Settings      /settings    — application settings
```

When user installs a plugin, its menu group appears automatically.

## Full State (all plugins installed)

```
Sidebar
├── Plugins          /plugins
│   ├── Inventory    → /inventory
│   ├── Blog         → /blog
│   └── Contacts     → /contacts
│
├── Inventory        /inventory
│   ├── Products     /inventory/products
│   ├── Categories   /inventory/categories
│   ├── Warehouses   /inventory/warehouses
│   └── Operations   /inventory/operations
│
├── Blog             /blog
│   ├── Posts        /blog/posts
│   └── Categories   /blog/categories
│
├── Contacts         /contacts
│   ├── All Contacts /contacts
│   └── Industries   /contacts/industries
│
├── Plugins          /plugins     — manage plugins
└── Settings         /settings    — app settings
```

## App Switcher (ConfigMenu — sidebar header dropdown)

Always visible. Grid layout with Dashboard + installed plugins:

```
┌─────────────────────────────────┐
│  Mituni ERP Apps       Active   │
├─────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐       │
│ │  D  │ │  I  │ │  B  │       │
│ │ ash │ │ nv  │ │ log │       │
│ └─────┘ └─────┘ └─────┘       │
│ ┌─────┐ ┌─────┐ ┌─────┐       │
│ │  C  │ │     │ │     │       │
│ │ ont │ │     │ │     │       │
│ └─────┘ └─────┘ └─────┘       │
├─────────────────────────────────┤
│ 🔧 Manage Plugins              │
│ 🔄 Switch Tenant    Active ▼   │
└─────────────────────────────────┘
```

## Rules

1. **Only installed plugins** appear in sidebar navigation
2. **Plugin menu group** appears immediately after install (no page reload needed — React Query refetch)
3. **Plugins menu** always visible — shows all available plugins with status
4. **Settings** only visible to admin users
5. **Dashboard** only accessible via ConfigMenu app switcher (not in sidebar for clean layout)
6. **ConfigMenu** shows Dashboard + all installed plugins as grid icons
7. **Sidebar nav group** title is the plugin name, items are the plugin's sub-pages

## Plugin Registration

Each plugin must be registered in:

| File | Purpose |
|------|---------|
| `config-menu.tsx` — `appConfigMap` | Grid icon + color for app switcher |
| `app-sidebar.tsx` — `pluginNavItems` | Sidebar navigation items |
| `plugins/page.tsx` — `iconMap` | Plugin card icon |

## Adding a New Plugin

1. Create BE plugin (`plugins/mitunierp/{name}/`)
2. Register in `bootstrap/providers.php`
3. Add to `PluginController::available()`
4. Add to `appConfigMap` in `config-menu.tsx`
5. Add to `pluginNavItems` in `app-sidebar.tsx`
6. Add to `iconMap` in `plugins/page.tsx`
7. Create FE pages under `app/(admin)/{name}/`
