"use client"

import type { UnifiedPlugin } from "../page"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Box,
  FileText,
  Users,
  Puzzle,
  X,
  LifeBuoy,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  package: <Box className="h-8 w-8 text-white" />,
  "file-text": <FileText className="h-8 w-8 text-white" />,
  users: <Users className="h-8 w-8 text-white" />,
  helpdesk: <LifeBuoy className="h-8 w-8 text-white" />,
}

interface PluginModalProps {
  plugin: UnifiedPlugin
  onClose: () => void
  onInstall: (name: string, isExtra?: boolean) => void
  onUninstall: (name: string, isExtra?: boolean) => void
}

export function PluginModal({
  plugin,
  onClose,
  onInstall,
  onUninstall,
}: PluginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs dark:bg-black/60">
      <div className="relative w-full max-w-lg animate-in rounded-xl border border-zinc-200 bg-card p-6 shadow-lg duration-200 zoom-in-95 fade-in dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={onClose}
          className="dark:hover:text-zinc-355 absolute right-4 top-4 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex gap-4">
          <div
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white shadow-xs",
              plugin.name === "inventory" && "bg-blue-500",
              plugin.name === "blog" && "bg-emerald-500",
              plugin.name === "contacts" && "bg-amber-500",
              plugin.name === "crm" && "bg-indigo-500",
              plugin.name === "helpdesk" && "bg-rose-500",
              !["inventory", "blog", "contacts", "crm", "helpdesk"].includes(
                plugin.name,
              ) && "bg-zinc-500",
            )}
          >
            {iconMap[plugin.icon] || (
              <Puzzle className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {plugin.label}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              <span>By {plugin.author}</span>
              <span>•</span>
              <span>Version {plugin.latest_version}</span>
              <span>•</span>
              <span className="rounded bg-blue-50 px-1 py-0.5 text-[9px] font-bold tracking-wider text-blue-600 uppercase dark:bg-blue-950/30 dark:text-blue-400">
                {plugin.license} License
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
          <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Description
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            {plugin.description}
          </p>
        </div>

        <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
          <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Dependencies
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold"
            >
              core-module v1.0.0
            </Badge>
            {plugin.name === "inventory" && (
              <Badge
                variant="secondary"
                className="text-[10px] font-semibold"
              >
                warehouse-api v1.0.0
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer border-zinc-200 px-4 py-2 text-xs font-semibold dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={onClose}
          >
            Close
          </Button>
          {plugin.installed ? (
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer px-4 py-2 text-xs font-semibold"
              onClick={() => {
                onUninstall(plugin.name, plugin.isExtra)
                onClose()
              }}
            >
              Uninstall
            </Button>
          ) : (
            <Button
              size="sm"
              className="cursor-pointer bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              onClick={() => {
                onInstall(plugin.name, plugin.isExtra)
                onClose()
              }}
            >
              Install
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
