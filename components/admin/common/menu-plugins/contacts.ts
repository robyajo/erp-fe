import type { SidebarTabConfig } from "./sidebar"

export const contactsSidebar: SidebarTabConfig = {
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
}
