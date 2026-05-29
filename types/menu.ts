export interface MenuItem {
  title: string
  url: string
  icon: string
}

export interface SidebarSection {
  label: string
  items: MenuItem[]
}

export interface PluginMenu {
  headerNav: { label: string; href: string }[]
  sidebar: Record<string, SidebarSection[]>
}

export type PluginMenus = Record<string, PluginMenu>
