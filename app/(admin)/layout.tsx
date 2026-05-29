"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Header } from "@/components/admin/common/header"
import { usePluginStore } from "@/stores/plugin"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const init = usePluginStore((s) => s.init)
  const plugins = usePluginStore((s) => s.plugins)
  const loading = usePluginStore((s) => s.loading)
  const initialized = usePluginStore((s) => s.initialized)

  React.useEffect(() => {
    init()
  }, [init])

  React.useEffect(() => {
    if (!initialized || loading) return

    const hasPlugin = plugins.some((p) => p.installed)
    const isAllowed = pathname === "/plugins" || pathname === "/settings"

    if (!hasPlugin && !isAllowed) {
      router.replace("/plugins")
    }
  }, [initialized, loading, plugins, pathname, router])

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <Header />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
