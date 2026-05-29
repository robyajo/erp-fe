import axios from "@/lib/axios"
import type { PluginMenus } from "@/types/menu"
import { getSession } from "next-auth/react"

export async function fetchPluginMenus(): Promise<PluginMenus> {
  const session = await getSession()
  const token = (session as Record<string, unknown> | null)?.accessToken as
    | string
    | undefined
  const { data } = await axios.get("/api/v1/plugins/menus", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data.data
}
