export interface Plugin {
  id: number
  name: string
  author: string | null
  summary: string | null
  description: string | null
  icon: string | null
  latest_version: string | null
  license: string | null
  is_core: boolean
  is_active: boolean
  is_installed: boolean
  sort: number
  created_at: string | null
  updated_at: string | null
}

export interface AvailablePlugin {
  name: string
  label: string
  description: string
  icon: string
  latest_version: string
  license: string
  author: string
  installed: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
