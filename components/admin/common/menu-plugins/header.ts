export interface HeaderNavItem {
  label: string
  href: string
}

export type HeaderNavConfig = Record<string, HeaderNavItem[]>

export const headerNavConfig: HeaderNavConfig = {
  inventory: [
    { label: "Operations", href: "/inventory/operations" },
    { label: "Products", href: "/inventory/products" },
    { label: "Configurations", href: "/inventory/warehouses" },
    { label: "Settings", href: "/settings" },
  ],
  blog: [
    { label: "Posts", href: "/blog/posts" },
    { label: "Categories", href: "/blog/categories" },
  ],
  contacts: [
    { label: "All Contacts", href: "/contacts" },
    { label: "Industries", href: "/contacts/industries" },
  ],
  settings: [
    { label: "Roles", href: "/settings/roles" },
    { label: "Companies", href: "/settings/companies" },
    { label: "Teams", href: "/settings/teams" },
    { label: "Users", href: "/settings/users" },
    { label: "Custom Fields", href: "/settings/custom-fields" },
    { label: "Settings", href: "/settings" },
  ],
}
