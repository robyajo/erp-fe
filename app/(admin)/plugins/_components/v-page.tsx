"use client"

import * as React from "react"
import { usePluginStore } from "@/stores/plugin"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Puzzle, Loader2, RefreshCw, Search } from "lucide-react"

import { PluginCard } from "./plugin-card"
import { PluginModal } from "./plugin-modal"
import { ErrorAlert } from "./error-alert"
import { PluginTabs } from "./plugin-tabs"
import { PluginPagination } from "./plugin-pagination"
import type { TabType } from "./plugin-tabs"

export interface UnifiedPlugin {
  name: string
  label: string
  description: string
  icon: string
  latest_version: string
  license: string
  author: string
  installed: boolean
  isExtra?: boolean
}

export default function ViewPagePlugins() {
  const { plugins, loading, install, uninstall, refresh } = usePluginStore()
  const [installing, setInstalling] = React.useState<string | null>(null)
  const [uninstalling, setUninstalling] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [installedExtras, setInstalledExtras] = React.useState<string[]>([])
  const [selectedPlugin, setSelectedPlugin] =
    React.useState<UnifiedPlugin | null>(null)
  const [activeTab, setActiveTab] = React.useState<TabType>("apps")
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    usePluginStore.getState().init()
  }, [])

  const allPlugins = React.useMemo<UnifiedPlugin[]>(() => {
    const storePlugins = plugins.map((p) => ({ ...p, isExtra: false }))
    const extras: UnifiedPlugin[] = [
      {
        name: "crm",
        label: "CRM",
        description:
          "Track leads, close opportunities, and get accurate forecasts",
        icon: "users",
        latest_version: "1.0.0",
        license: "MIT",
        author: "Mitunierp",
        installed: installedExtras.includes("crm"),
        isExtra: true,
      },
      {
        name: "helpdesk",
        label: "Helpdesk",
        description:
          "Agile customer service ticket tracker and customer support portal",
        icon: "helpdesk",
        latest_version: "1.0.0",
        license: "MIT",
        author: "Mitunierp",
        installed: installedExtras.includes("helpdesk"),
        isExtra: true,
      },
    ]
    return [...storePlugins, ...extras]
  }, [plugins, installedExtras])

  const handleInstall = async (name: string, isExtra?: boolean) => {
    setInstalling(name)
    setError(null)
    try {
      if (isExtra) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setInstalledExtras((prev) => [...prev, name])
        toast.success(`Plugin '${name}' installed successfully.`)
      } else {
        const msg = await install(name)
        toast.success(msg)
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Install failed"
      setError(msg)
      toast.error(msg)
    } finally {
      setInstalling(null)
    }
  }

  const handleUninstall = async (name: string, isExtra?: boolean) => {
    setUninstalling(name)
    setError(null)
    try {
      if (isExtra) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setInstalledExtras((prev) => prev.filter((x) => x !== name))
        toast.success(`Plugin '${name}' uninstalled successfully.`)
      } else {
        const msg = await uninstall(name)
        toast.success(msg)
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Uninstall failed"
      setError(msg)
      toast.error(msg)
    } finally {
      setUninstalling(null)
    }
  }

  const counts = React.useMemo(() => {
    const appsList = allPlugins.filter((p) => !p.isExtra)
    const extraList = allPlugins.filter((p) => p.isExtra)
    const installedList = allPlugins.filter((p) => p.installed)
    const notInstalledList = allPlugins.filter((p) => !p.installed)
    return {
      apps: appsList.length,
      extra: extraList.length,
      installed: installedList.length,
      notInstalled: notInstalledList.length,
    }
  }, [allPlugins])

  const filteredPlugins = React.useMemo(() => {
    let list = [...allPlugins]
    if (activeTab === "apps") list = list.filter((p) => !p.isExtra)
    else if (activeTab === "extra") list = list.filter((p) => p.isExtra)
    else if (activeTab === "installed") list = list.filter((p) => p.installed)
    else if (activeTab === "not-installed")
      list = list.filter((p) => !p.installed)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.label.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q)
      )
    }
    return list
  }, [allPlugins, activeTab, searchQuery])

  return (
    <PageContainerAdmin
      breadcrumb={[
        { label: "Plugin", href: "/plugins" },
        { label: "List", href: "/plugins", isCurrent: true },
      ]}
    >
      <div className="mx-auto flex w-full flex-col gap-6 py-2">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Plugins
            </h1>
          </div>
          <Button
            onClick={refresh}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Sync Available Plugins
          </Button>
        </div>

        {/* Tabs switcher */}
        <PluginTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {/* Search Toolbar */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800/60">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Showing 1 to {filteredPlugins.length} of {filteredPlugins.length}{" "}
            results
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pr-4 pl-9 text-xs text-zinc-900 placeholder-zinc-400 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Error Alert Message */}
        <ErrorAlert message={error} onDismiss={() => setError(null)} />

        {/* Plugin Cards list */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-500" />
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlugins.map((plugin) => (
              <PluginCard
                key={plugin.name}
                plugin={plugin}
                installing={installing === plugin.name}
                uninstalling={uninstalling === plugin.name}
                onInstall={handleInstall}
                onUninstall={handleUninstall}
                onViewDetails={setSelectedPlugin}
              />
            ))}
          </div>
        )}

        {/* Empty State when no results found */}
        {!loading && filteredPlugins.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900/20">
            <Puzzle className="mb-3 h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              No plugins found
            </h3>
            <p className="mt-1 max-w-[280px] text-xs text-zinc-500 dark:text-zinc-400">
              Try adjusting your tab selection or search query to find available
              plugins.
            </p>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredPlugins.length > 0 && (
          <PluginPagination
            totalCount={filteredPlugins.length}
            showingCount={filteredPlugins.length}
          />
        )}
      </div>

      {/* Detail Popup Modal */}
      {selectedPlugin && (
        <PluginModal
          plugin={selectedPlugin}
          onClose={() => setSelectedPlugin(null)}
          onInstall={handleInstall}
          onUninstall={handleUninstall}
        />
      )}
    </PageContainerAdmin>
  )
}
