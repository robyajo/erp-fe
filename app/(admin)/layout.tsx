"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/admin/common/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/admin/common/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Sidebar is only shown for inventory, blog, and contacts pages
  const showSidebar =
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/contacts")

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
        {/* Global Top Header */}
        <Header />

        {/* Main layout split area */}
        <div className="flex flex-1 overflow-hidden">
          {showSidebar && <AppSidebar />}
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
