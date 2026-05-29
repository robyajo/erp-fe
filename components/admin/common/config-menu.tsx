"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { fetchAvailablePlugins } from "@/services/plugin"
import type { AvailablePlugin } from "@/types/plugin"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ChevronsUpDownIcon,
  PlusIcon,
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Puzzle,
} from "lucide-react"

const appConfigMap: Record<
  string,
  { label: string; href: string; icon: React.ReactNode; colorClass: string }
> = {
  inventory: {
    label: "Inventory",
    href: "/inventory",
    icon: <Package className="size-5 transition-transform duration-200 group-hover:scale-110" />,
    colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30",
  },
  blog: {
    label: "Blog",
    href: "/blog",
    icon: <FileText className="size-5 transition-transform duration-200 group-hover:scale-110" />,
    colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30",
  },
  contacts: {
    label: "Contacts",
    href: "/contacts",
    icon: <Users className="size-5 transition-transform duration-200 group-hover:scale-110" />,
    colorClass: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/30",
  },
}

const getAppConfig = (name: string, label: string) => {
  if (appConfigMap[name]) {
    return appConfigMap[name]
  }
  return {
    label: label,
    href: `/${name}`,
    icon: <Puzzle className="size-5 transition-transform duration-200 group-hover:scale-110" />,
    colorClass: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-100/50 dark:border-violet-900/30",
  }
}

const dashboardConfig = {
  label: "Dashboard",
  href: "/dashboard",
  icon: <LayoutDashboard className="size-5 transition-transform duration-200 group-hover:scale-110" />,
  colorClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30",
}

export function ConfigMenu({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  const { data: available } = useQuery({
    queryKey: ["plugins"],
    queryFn: fetchAvailablePlugins,
    staleTime: 5 * 60 * 1000,
  })

  const installedPlugins = available?.filter((p: AvailablePlugin) => p.installed) ?? []

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {activeTeam.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-80 p-3"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Mituni ERP Apps
              </span>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {activeTeam.name}
              </span>
            </div>

            {/* Grid of Apps */}
            <div className="grid grid-cols-3 gap-2">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-accent transition-all text-center"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30">
                  {dashboardConfig.icon}
                </div>
                <span className="mt-1 text-[11px] font-medium text-foreground truncate w-full">
                  {dashboardConfig.label}
                </span>
              </Link>

              {/* Installed Plugins */}
              {installedPlugins.map((plugin: AvailablePlugin) => {
                const config = getAppConfig(plugin.name, plugin.label)
                return (
                  <Link
                    key={plugin.name}
                    href={config.href}
                    className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-accent transition-all text-center"
                  >
                    <div className={`flex size-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm ${config.colorClass}`}>
                      {config.icon}
                    </div>
                    <span className="mt-1 text-[11px] font-medium text-foreground truncate w-full">
                      {config.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            <DropdownMenuSeparator className="my-2" />

            {/* Bottom Actions & Submenus */}
            <div className="flex flex-col gap-1">
              <Link
                href="/plugins"
                className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <Puzzle className="size-4 text-primary" />
                <span>Manage Plugins</span>
              </Link>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex w-full items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer">
                  <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
                  <span>Switch Tenant</span>
                  <span className="ml-auto text-[10px] text-muted-foreground font-normal bg-muted px-1.5 py-0.5 rounded">
                    {activeTeam.name}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56" sideOffset={8}>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Available Teams
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  {teams.map((team, index) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2 cursor-pointer"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border bg-muted text-xs">
                        {team.logo}
                      </div>
                      <span className="text-xs font-medium">{team.name}</span>
                      <DropdownMenuShortcut className="text-[10px]">⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                    <PlusIcon className="size-4 text-muted-foreground" />
                    <span className="text-xs">Add Team</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
