export { headerNavConfig } from "./header"
export type { HeaderNavItem } from "./header"

export { inventorySidebar } from "./inventory"
export { blogSidebar } from "./blog"
export { contactsSidebar } from "./contacts"

export { getIcon } from "./icons"

export type {
  SidebarItem,
  SidebarSection,
  SidebarTabConfig,
  SidebarConfig,
} from "./sidebar"

import type { SidebarTabConfig } from "./sidebar"

const sidebarRegistry: Record<string, SidebarTabConfig> = {
  inventory: {
    hasSidebar: true,
    tabs: {
      operations: [
        {
          label: "Transfers",
          items: [
            { title: "Receipts", url: "/inventory/operations", icon: "inbox" },
            { title: "Deliveries", url: "/inventory/operations", icon: "truck" },
          ],
        },
        {
          label: "Adjustments",
          items: [
            { title: "Quantities", url: "/inventory/operations", icon: "clipboard-list" },
            { title: "Scraps", url: "/inventory/operations", icon: "trash-2" },
          ],
        },
      ],
      products: [
        {
          label: "Products",
          items: [
            { title: "Products", url: "/inventory/products", icon: "package" },
            { title: "Categories", url: "/inventory/categories", icon: "tags" },
          ],
        },
      ],
      configurations: [
        {
          label: "Warehouse Management",
          items: [
            { title: "Warehouses", url: "/inventory/warehouses", icon: "warehouse" },
            { title: "Operation Types", url: "/inventory/operations", icon: "settings" },
          ],
        },
        {
          label: "Products",
          items: [
            { title: "Categories", url: "/inventory/categories", icon: "tags" },
            { title: "Attributes", url: "/inventory/products", icon: "package" },
          ],
        },
      ],
    },
  },
  blog: {
    hasSidebar: true,
    tabs: {
      posts: [
        {
          label: "Content",
          items: [
            { title: "Posts", url: "/blog/posts", icon: "file-text" },
            { title: "Categories", url: "/blog/categories", icon: "tags" },
          ],
        },
      ],
    },
  },
  contacts: {
    hasSidebar: true,
    tabs: {
      contacts: [
        {
          label: "Contacts",
          items: [
            { title: "All Contacts", url: "/contacts", icon: "users" },
            { title: "Industries", url: "/contacts/industries", icon: "building-2" },
          ],
        },
      ],
    },
  },
}

export function hasSidebar(moduleName: string): boolean {
  return sidebarRegistry[moduleName]?.hasSidebar ?? false
}

export function getActiveTab(
  moduleName: string,
  pathname: string,
): string | null {
  const config = sidebarRegistry[moduleName]
  if (!config) return null

  const tabs = Object.keys(config.tabs)
  return (
    tabs.find((tab) => {
      const sections = config.tabs[tab]
      return sections?.some((s) =>
        s.items.some((item) => pathname.startsWith(item.url)),
      )
    }) ?? tabs[0]
  )
}

export function getSidebarSections(
  moduleName: string,
  tab: string,
) {
  return sidebarRegistry[moduleName]?.tabs[tab] ?? null
}
