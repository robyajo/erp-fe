"use client"

import type { UnifiedPlugin } from "./v-page"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Box,
  FileText,
  Users,
  Puzzle,
  Loader2,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  LifeBuoy,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  package: <Box className="h-5 w-5 text-white" />,
  "file-text": <FileText className="h-5 w-5 text-white" />,
  users: <Users className="h-5 w-5 text-white" />,
  helpdesk: <LifeBuoy className="h-5 w-5 text-white" />,
}

interface PluginCardProps {
  plugin: UnifiedPlugin
  installing: boolean
  uninstalling: boolean
  onInstall: (name: string, isExtra?: boolean) => void
  onUninstall: (name: string, isExtra?: boolean) => void
  onViewDetails: (plugin: UnifiedPlugin) => void
}

export function PluginCard({
  plugin,
  installing,
  uninstalling,
  onInstall,
  onUninstall,
  onViewDetails,
}: PluginCardProps) {
  const isPending = installing || uninstalling

  return (
    <Card
      key={plugin.name}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border-zinc-200 bg-card transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:hover:shadow-zinc-950/50"
    >
      {/* Processing Overlay Loader */}
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-xs dark:bg-background/75">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-500" />
            <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
              {installing ? "Installing..." : "Uninstalling..."}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-4 p-4">
        {/* Vibrant App Logo Container with Decorative Badge */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl shadow-xs",
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
              <Puzzle className="h-6 w-6 text-white" />
            )}
          </div>
          {/* Bottom-right mini avatar identifier */}
          <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-100 bg-background text-[10px] shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            {plugin.name === "inventory" && "📦"}
            {plugin.name === "blog" && "📝"}
            {plugin.name === "contacts" && "👤"}
            {plugin.name === "crm" && "💼"}
            {plugin.name === "helpdesk" && "🤝"}
            {!["inventory", "blog", "contacts", "crm", "helpdesk"].includes(
              plugin.name,
            ) && "🔌"}
          </span>
        </div>

        {/* Plugin Info Block */}
        <div className="min-w-0 flex-1 pr-6">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <h3 className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {plugin.label}
            </h3>
            <span className="dark:text-zinc-550 dark:border-zinc-850/70 rounded border border-zinc-200/50 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 dark:bg-zinc-900/45">
              {plugin.latest_version}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {plugin.description}
          </p>

          {/* Status / Meta Labels */}
          <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase">
            {plugin.installed ? (
              <span className="dark:text-green-450 rounded border border-green-100 bg-green-50 px-1.5 py-0.5 text-green-600 dark:border-green-900/30 dark:bg-green-950/20">
                Installed
              </span>
            ) : (
              <span className="rounded border border-zinc-200/60 bg-zinc-50 px-1.5 py-0.5 text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400">
                Not Installed
              </span>
            )}
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="dark:text-amber-450 rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5 text-amber-600 dark:border-amber-900/30 dark:bg-amber-950/20">
              1 Dependencies
            </span>
          </div>
        </div>
      </div>

      {/* Dropdown Action Menu Trigger */}
      <div className="absolute right-3 top-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-zinc-400 outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                <MoreVertical className="h-4 w-4" />
              </button>
            }
          />
          <DropdownMenuContent
            className="min-w-30 border bg-card p-1 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => onViewDetails(plugin)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              <Eye className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>View Details</span>
            </DropdownMenuItem>
            {plugin.installed ? (
              <DropdownMenuItem
                onClick={() => onUninstall(plugin.name, plugin.isExtra)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 dark:focus:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                <span>Uninstall</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => onInstall(plugin.name, plugin.isExtra)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/30 dark:focus:bg-blue-950/30 dark:focus:text-blue-400"
              >
                <Download className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <span>Install</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
