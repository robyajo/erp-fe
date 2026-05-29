import type { SidebarTabConfig } from "./sidebar"

export const inventorySidebar: SidebarTabConfig = {
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
}
