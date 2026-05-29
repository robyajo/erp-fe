import axios from "@/lib/axios"
import type { ApiResponse, Plugin, AvailablePlugin } from "@/types/plugin"
import { getSession } from "next-auth/react"

async function getToken() {
  const session = await getSession()
  return (session as Record<string, unknown> | null)?.accessToken as
    | string
    | undefined
}

export async function fetchPlugins(): Promise<Plugin[]> {
  const token = await getToken()
  const { data } = await axios.get<ApiResponse<Plugin[]>>("/api/v1/plugins", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data.data
}

export async function fetchAvailablePlugins(): Promise<AvailablePlugin[]> {
  const token = await getToken()
  const { data } = await axios.get<ApiResponse<AvailablePlugin[]>>(
    "/api/v1/plugins/available",
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data.data
}

export async function installPlugin(name: string): Promise<ApiResponse<null>> {
  const token = await getToken()
  const { data } = await axios.post<ApiResponse<null>>(
    "/api/v1/plugins/install",
    { name },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data
}

export async function uninstallPlugin(
  name: string,
): Promise<ApiResponse<null>> {
  const token = await getToken()
  const { data } = await axios.post<ApiResponse<null>>(
    "/api/v1/plugins/uninstall",
    { name },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data
}
