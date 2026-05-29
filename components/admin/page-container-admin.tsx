"use client"

import React from "react"
import { Separator } from "../ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BreadcrumbType } from "@/types"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Inbox,
  Truck,
  ArrowUpDown,
  Trash2,
  Package,
  Tags,
  Warehouse,
  FileText,
  Users,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface HeaderNavItem {
  label: string
  href: string
}

interface MenuItem {
  title: string
  url: string
  icon: React.ReactNode
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

function getModuleMenu(pathname: string): MenuGroup[] {
  if (pathname.startsWith("/inventory")) {
    return [
      {
        title: "Transfers",
        items: [
          {
            title: "Receipts",
            url: "/inventory/operations",
            icon: <Inbox className="size-4 shrink-0" />,
          },
          {
            title: "Deliveries",
            url: "/inventory/operations?type=delivery",
            icon: <Truck className="size-4 shrink-0" />,
          },
        ],
      },
      {
        title: "Adjustments",
        items: [
          {
            title: "Quantities",
            url: "/inventory/operations?type=quantity",
            icon: <ArrowUpDown className="size-4 shrink-0" />,
          },
          {
            title: "Scraps",
            url: "/inventory/operations?type=scrap",
            icon: <Trash2 className="size-4 shrink-0" />,
          },
        ],
      },
      {
        title: "Products",
        items: [
          {
            title: "Products List",
            url: "/inventory/products",
            icon: <Package className="size-4 shrink-0" />,
          },
          {
            title: "Categories",
            url: "/inventory/categories",
            icon: <Tags className="size-4 shrink-0" />,
          },
        ],
      },
      {
        title: "Configurations",
        items: [
          {
            title: "Warehouses List",
            url: "/inventory/warehouses",
            icon: <Warehouse className="size-4 shrink-0" />,
          },
        ],
      },
    ]
  }

  if (pathname.startsWith("/blog")) {
    return [
      {
        title: "Blog Management",
        items: [
          {
            title: "Posts",
            url: "/blog/posts",
            icon: <FileText className="size-4 shrink-0" />,
          },
          {
            title: "Categories",
            url: "/blog/categories",
            icon: <Tags className="size-4 shrink-0" />,
          },
        ],
      },
    ]
  }

  if (pathname.startsWith("/contacts")) {
    return [
      {
        title: "Contacts Management",
        items: [
          {
            title: "All Contacts",
            url: "/contacts",
            icon: <Users className="size-4 shrink-0" />,
          },
          {
            title: "Industries",
            url: "/contacts/industries",
            icon: <Warehouse className="size-4 shrink-0" />,
          },
        ],
      },
    ]
  }

  return []
}

export default function PageContainerAdmin({
  children,
  breadcrumb,
  title,
  headerNav,
}: {
  children: React.ReactNode
  breadcrumb: BreadcrumbType[]
  title?: string
  headerNav?: HeaderNavItem[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  const menuGroups = getModuleMenu(pathname)

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getIsActive = (url: string) => {
    if (!mounted) {
      return pathname === url
    }
    return pathname === url || (pathname + window.location.search) === url
  }

  // Find the currently active item
  let activeItem: MenuItem | undefined
  for (const group of menuGroups) {
    const found = group.items.find((item) => getIsActive(item.url))
    if (found) {
      activeItem = found
      break
    }
  }

  // Fallback to first item in the menu groups if none matches
  if (!activeItem && menuGroups.length > 0 && menuGroups[0].items.length > 0) {
    activeItem = menuGroups[0].items[0]
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-6">
          {breadcrumb && breadcrumb.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={`${item.href}-${idx}`}>
                    <BreadcrumbItem>
                      {item.isCurrent ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Mobile sub-menu dropdown selector */}
          {menuGroups.length > 0 && activeItem && (
            <div className="block md:hidden w-full">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-background px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-xs hover:bg-zinc-50 transition-colors outline-none cursor-pointer">
                      <span className="flex items-center gap-2">
                        {activeItem.icon}
                        {activeItem.title}
                      </span>
                      <ChevronDown className="h-4 w-4 text-zinc-500" />
                    </button>
                  }
                />
                <DropdownMenuContent className="w-[calc(100vw-3rem)] max-w-sm p-2 bg-background border shadow-md" align="start" sideOffset={6}>
                  {menuGroups.map((group, groupIdx) => (
                    <React.Fragment key={group.title}>
                      {groupIdx > 0 && <DropdownMenuSeparator className="my-1" />}
                      <DropdownMenuLabel className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {group.title}
                      </DropdownMenuLabel>
                      {group.items.map((item) => {
                        const isActive = getIsActive(item.url)
                        return (
                          <DropdownMenuItem
                            key={item.title}
                            onClick={() => router.push(item.url)}
                            className={cn(
                              "flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-md cursor-pointer transition-colors",
                              isActive
                                ? "bg-blue-50 text-blue-600 font-bold dark:bg-blue-950/40 dark:text-blue-400"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            )}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                          </DropdownMenuItem>
                        )
                      })}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {children}
        </div>
    </>
  )
}
