export interface SidebarItem {
  title: string
  url: string
  icon: string
}

export interface SidebarSection {
  label: string
  items: SidebarItem[]
}

export interface SidebarTabConfig {
  hasSidebar: boolean
  tabs: Record<string, SidebarSection[]>
}

export type SidebarConfig = Record<string, SidebarTabConfig>
