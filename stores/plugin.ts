import { create } from "zustand"
import {
  fetchAvailablePlugins,
  installPlugin,
  uninstallPlugin,
} from "@/services/plugin"
import { fetchPluginMenus } from "@/services/menu"
import type { AvailablePlugin } from "@/types/plugin"
import type { PluginMenus } from "@/types/menu"

interface PluginState {
  plugins: AvailablePlugin[]
  menus: PluginMenus
  loading: boolean
  error: string | null
  initialized: boolean

  reset: () => void
  init: () => Promise<void>
  refresh: () => Promise<void>
  install: (name: string) => Promise<string>
  uninstall: (name: string) => Promise<string>
  isInstalled: (name: string) => boolean
  installedPlugins: () => AvailablePlugin[]
  getPluginMenu: (name: string) => PluginMenus[string] | undefined
}

export const usePluginStore = create<PluginState>((set, get) => ({
  plugins: [],
  menus: {},
  loading: false,
  error: null,
  initialized: false,

  reset: () => {
    set({ plugins: [], menus: {}, loading: false, error: null, initialized: false })
  },

  init: async () => {
    if (get().initialized) return
    await get().refresh()
  },

  refresh: async () => {
    set({ loading: true, error: null })
    try {
      const [plugins, menus] = await Promise.all([
        fetchAvailablePlugins(),
        fetchPluginMenus(),
      ])
      set({ plugins, menus, loading: false, initialized: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch plugins"
      set({ error: message, loading: false })
    }
  },

  install: async (name: string) => {
    const res = await installPlugin(name)
    await get().refresh()
    return res.message || "Plugin installed"
  },

  uninstall: async (name: string) => {
    const res = await uninstallPlugin(name)
    await get().refresh()
    return res.message || "Plugin uninstalled"
  },

  isInstalled: (name: string) => {
    return get().plugins.some((p) => p.name === name && p.installed)
  },

  installedPlugins: () => {
    return get().plugins.filter((p) => p.installed)
  },

  getPluginMenu: (name: string) => {
    return get().menus[name]
  },
}))
