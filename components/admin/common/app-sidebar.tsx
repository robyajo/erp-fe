"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavMain } from "./nav-main"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import {
  Package,
  FileText,
  Users,
  Warehouse,
  Tags,
  ArrowLeftRight,
  Inbox,
  Truck,
  ArrowUpDown,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Define dynamic sidebar content based on active path
  const isInventory = pathname.startsWith("/inventory")
  const isBlog = pathname.startsWith("/blog")
  const isContacts = pathname.startsWith("/contacts")

  let sidebarNav: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: { title: string; url: string; icon?: React.ReactNode }[]
  }[] = []

  if (isInventory) {
    if (pathname.includes("/products") || pathname.includes("/categories")) {
      sidebarNav = [
        {
          title: "Products",
          url: "/inventory/products",
          icon: <Package className="size-4" />,
          isActive: true,
          items: [
            {
              title: "Products List",
              url: "/inventory/products",
              icon: <Package className="size-4" />,
            },
            {
              title: "Categories",
              url: "/inventory/categories",
              icon: <Tags className="size-4" />,
            },
          ],
        },
      ]
    } else if (pathname.includes("/warehouses")) {
      sidebarNav = [
        {
          title: "Configurations",
          url: "/inventory/warehouses",
          icon: <Warehouse className="size-4" />,
          isActive: true,
          items: [
            {
              title: "Warehouses List",
              url: "/inventory/warehouses",
              icon: <Warehouse className="size-4" />,
            },
          ],
        },
      ]
    } else {
      // Operations or generic inventory pages (e.g. /inventory)
      sidebarNav = [
        {
          title: "Transfers",
          url: "/inventory/operations",
          icon: <ArrowLeftRight className="size-4" />,
          isActive: true,
          items: [
            {
              title: "Receipts",
              url: "/inventory/operations",
              icon: <Inbox className="size-4" />,
            },
            {
              title: "Deliveries",
              url: "/inventory/operations?type=delivery",
              icon: <Truck className="size-4" />,
            },
          ],
        },
        {
          title: "Adjustments",
          url: "/inventory/operations",
          icon: <Tags className="size-4" />,
          isActive: true,
          items: [
            {
              title: "Quantities",
              url: "/inventory/operations?type=quantity",
              icon: <ArrowUpDown className="size-4" />,
            },
            {
              title: "Scraps",
              url: "/inventory/operations?type=scrap",
              icon: <Trash2 className="size-4" />,
            },
          ],
        },
      ]
    }
  } else if (isBlog) {
    sidebarNav = [
      {
        title: "Blog Management",
        url: "/blog/posts",
        icon: <FileText className="size-4" />,
        isActive: true,
        items: [
          {
            title: "Posts",
            url: "/blog/posts",
            icon: <FileText className="size-4" />,
          },
          {
            title: "Categories",
            url: "/blog/categories",
            icon: <Tags className="size-4" />,
          },
        ],
      },
    ]
  } else if (isContacts) {
    sidebarNav = [
      {
        title: "Contacts Management",
        url: "/contacts",
        icon: <Users className="size-4" />,
        isActive: true,
        items: [
          {
            title: "All Contacts",
            url: "/contacts",
            icon: <Users className="size-4" />,
          },
          {
            title: "Industries",
            url: "/contacts/industries",
            icon: <Warehouse className="size-4" />,
          },
        ],
      },
    ]
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Active sub-item matching helper including query parameter checks
  const getIsSubItemActive = (url: string) => {
    if (!mounted) {
      return pathname === url
    }
    return pathname === url || pathname + window.location.search === url
  }

  return (
    <>
      {/* Desktop Sticky Left Sidebar (Non-Collapsible) */}
      <aside className="hidden h-full w-56 shrink-0 border-r bg-background select-none md:block">
        <div className="flex flex-col gap-5 p-4 py-6">
          {sidebarNav.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <span className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                {group.title}
              </span>
              <div className="flex flex-col gap-1">
                {group.items?.map((item) => {
                  const isActive = getIsSubItemActive(item.url)
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200",
                        isActive
                          ? "bg-blue-50 font-bold text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Collapse Drawer Sidebar */}
      <Sidebar collapsible="icon" className="md:hidden" {...props}>
        <SidebarHeader className="border-b px-6 py-4 flex flex-row items-center gap-3">
          <div className="flex size-7 items-center justify-center rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm shadow-md shadow-blue-500/20">
            M
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground select-none">
            ERP Portal
          </span>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarNav} />
        </SidebarContent>
      </Sidebar>
    </>
  )
}
