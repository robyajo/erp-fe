"use client"

import { cn } from "@/lib/utils"

export type TabType = "apps" | "extra" | "installed" | "not-installed"

interface PluginTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  counts: {
    apps: number
    extra: number
    installed: number
    notInstalled: number
  }
}

export function PluginTabs({ activeTab, onTabChange, counts }: PluginTabsProps) {
  const TabButton = ({
    tabType,
    label,
    count,
  }: {
    tabType: TabType
    label: string
    count: number
  }) => {
    const active = activeTab === tabType
    return (
      <button
        onClick={() => onTabChange(tabType)}
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-lg border border-transparent px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200",
          active
            ? "border-zinc-200/50 bg-background text-zinc-900 shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors",
            active
              ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              : "bg-zinc-200/60 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400",
          )}
        >
          {count}
        </span>
      </button>
    )
  }

  return (
    <div className="flex w-full justify-center">
      <div className="no-scrollbar flex max-w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-xl border border-zinc-200/30 bg-zinc-100/80 p-1 shadow-2xs dark:border-zinc-800/50 dark:bg-zinc-900/60">
        <TabButton tabType="apps" label="Apps" count={counts.apps} />
        <TabButton tabType="extra" label="Extra" count={counts.extra} />
        <TabButton tabType="installed" label="Installed" count={counts.installed} />
        <TabButton tabType="not-installed" label="Not Installed" count={counts.notInstalled} />
      </div>
    </div>
  )
}
