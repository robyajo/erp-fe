"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  getActiveTab,
  getSidebarSections,
  getIcon,
} from "@/components/admin/common/menu-plugins"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const tab = getActiveTab("blog", pathname) ?? ""
  const sections = getSidebarSections("blog", tab)

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="fixed left-4 top-20 z-50 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent">
                <Menu className="h-5 w-5" />
              </button>
            }
          />
          <SheetContent side="left" className="w-64 p-4 pt-6">
            {sections && (
              <div className="flex flex-col gap-4">
                {sections.map((section) => (
                  <div key={section.label}>
                    <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.label}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                            pathname === item.url &&
                              "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
                          )}
                        >
                          {getIcon(item.icon)}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {sections && (
        <aside className="hidden w-56 shrink-0 border-r bg-background md:block">
          <div
            className="sticky top-16 overflow-y-auto p-3"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <div key={section.label}>
                  <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.label}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                          pathname === item.url &&
                            "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
                        )}
                      >
                        {getIcon(item.icon)}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
