import type { SidebarTabConfig } from "./sidebar"

export const blogSidebar: SidebarTabConfig = {
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
}
