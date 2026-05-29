"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { usePluginStore } from "@/stores/plugin"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutGrid,
  Search,
  Bell,
  Gauge,
  Warehouse,
  Globe,
  Puzzle,
  Settings,
  User,
  CreditCard,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const user = session?.data?.user
  const displayName = user?.name || "User"
  const email = user?.email || ""
  const avatarUrl = user?.avatarUrl || ""
  const initials = getInitials(displayName)

  const plugins = usePluginStore((s) => s.plugins)

  async function handleLogout() {
    sessionStorage.clear()
    await signOut({ callbackUrl: "/" })
    toast.success("Logged out successfully")
  }

  // App Launcher Items Config — only show installed plugins
  const allApps = [
    {
      name: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <Gauge className="h-6 w-6 text-orange-500" />,
      requiresPlugin: null,
    },
    {
      name: "inventory",
      label: "Inventory",
      href: "/inventory",
      icon: <Warehouse className="h-6 w-6 text-blue-500" />,
      requiresPlugin: "inventory",
    },
    {
      name: "blog",
      label: "Website",
      href: "/blog",
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      requiresPlugin: "blog",
    },
    {
      name: "plugins",
      label: "Plugins",
      href: "/plugins",
      icon: <Puzzle className="h-6 w-6 text-pink-500" />,
      requiresPlugin: null,
    },
    {
      name: "settings",
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-6 w-6 text-blue-600" />,
      requiresPlugin: null,
    },
  ]

  const store = usePluginStore.getState()
  const apps = allApps.filter(
    (app) => app.requiresPlugin === null || store.isInstalled(app.requiresPlugin),
  )

  // Detect current active module
  const isInventory = pathname.startsWith("/inventory")
  const isBlog = pathname.startsWith("/blog")
  const isContacts = pathname.startsWith("/contacts")
  const isPlugins = pathname.startsWith("/plugins")
  const isSettings = pathname.startsWith("/settings")

  const activeModule = isInventory
    ? "inventory"
    : isBlog
      ? "blog"
      : isContacts
        ? "contacts"
      : isSettings
        ? "settings"
        : null

  const pluginMenu = activeModule
    ? usePluginStore.getState().getPluginMenu(activeModule)
    : null

  let activeTitle = isPlugins
    ? "Plugins"
    : isSettings
      ? "Settings"
      : "Dashboard"

  const headerNav = pluginMenu?.headerNav ?? []

  // Active state matching helper
  const getIsActive = (itemHref: string) => {
    if (itemHref === "/inventory/operations") {
      return pathname === "/inventory/operations" || pathname === "/inventory"
    }
    if (itemHref === "/inventory/categories") {
      return pathname === "/inventory/categories" || pathname === "/inventory/warehouses"
    }
    return pathname === itemHref
  }

  const activeNavItem = headerNav.find((item) => getIsActive(item.href)) || headerNav[0]

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 z-50">
      {/* Left section: Launcher, Logo, Module Title & Nav */}
      <div className="flex items-center">
        {/* Left inner wrapper */}
        <div className="flex items-center gap-3 md:w-[208px] shrink-0">
          {/* Launcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors outline-none cursor-pointer">
                  <LayoutGrid className="h-5 w-5" />
                </button>
              }
            />
            <DropdownMenuContent className="w-[320px] p-4" align="start" sideOffset={8}>
              <div className="grid grid-cols-3 gap-3">
                {apps.map((app) => (
                  <Link
                    key={app.name}
                    href={app.href}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-zinc-100 dark:border-zinc-800 shadow-xs hover:shadow-md hover:bg-accent/50 transition-all duration-200 group text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted group-hover:scale-105 transition-transform duration-200">
                      {app.icon}
                    </div>
                    <span className="mt-2 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate w-full">
                      {app.label}
                    </span>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Custom Premium Logo */}
          <div className="hidden md:flex size-7 items-center justify-center rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm shadow-md shadow-blue-500/20">
            M
          </div>

          {/* Module Title */}
          <span className="hidden md:block text-sm font-bold tracking-tight text-foreground select-none">
            {activeTitle}
          </span>
        </div>

        {/* Separator & Sub Navigation (Desktop only) */}
        {headerNav.length > 0 && (
          <div className="hidden md:flex items-center">
            <Separator orientation="vertical" className="h-4" />
            <nav className="flex items-center gap-1.5 ml-3">
              {headerNav.map((item) => {
                const isActive = getIsActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex h-8 items-center rounded-lg px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                      isActive && "bg-accent text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Center section: Search Input (Mobile only) */}
      <div className="flex-1 flex justify-center max-w-sm mx-2 md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-9 py-1 text-sm transition-colors placeholder:text-muted-foreground/75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Right section: Notifications, Avatar */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Search Input (Desktop only) */}
        <div className="hidden md:block relative w-40 lg:w-60">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-9 py-1 text-sm transition-colors placeholder:text-muted-foreground/75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        {/* Notification Bell */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors outline-none cursor-pointer">
          <Bell className="h-4.5 w-4.5" />
        </button>

        {/* Profile Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex size-8 items-center justify-center rounded-full outline-none cursor-pointer hover:ring-2 hover:ring-ring/20 transition-all">
                <Avatar className="size-8">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="bg-zinc-800 text-white font-semibold text-xs">
                    {initials || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            }
          />
          <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="bg-zinc-800 text-white font-semibold text-xs">
                      {initials || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold">{displayName}</span>
                    <span className="truncate text-muted-foreground">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/dashboard/account")} className="cursor-pointer">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/billing")} className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Billing</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
