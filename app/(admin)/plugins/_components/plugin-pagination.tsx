"use client"

import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PluginPaginationProps {
  totalCount: number
  showingCount: number
}

export function PluginPagination({ totalCount, showingCount }: PluginPaginationProps) {
  return (
    <div className="dark:border-zinc-850/60 mt-6 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-5 text-xs font-medium text-zinc-500 sm:flex-row dark:text-zinc-400">
      <div>
        Showing 1 to {showingCount} of {totalCount} results
      </div>
      <div className="flex items-center gap-1.5">
        <button
          className="h-8 cursor-pointer rounded-lg border border-zinc-200 px-3 transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
          disabled
        >
          Previous
        </button>
        <button className="dark:bg-blue-650 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-xs">
          1
        </button>
        <button
          className="h-8 cursor-pointer rounded-lg border border-zinc-200 px-3 transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
          disabled
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span>Per page</span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
                16
                <ChevronDown className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
              </button>
            }
          />
          <DropdownMenuContent className="min-w-20 border bg-card p-1 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <DropdownMenuItem className="dark:text-zinc-355 cursor-pointer text-xs">
              8
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:text-zinc-355 cursor-pointer text-xs">
              16
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:text-zinc-355 cursor-pointer text-xs">
              32
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
