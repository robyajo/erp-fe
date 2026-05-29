import axios from "@/lib/axios"
import { getSession } from "next-auth/react"

async function getToken() {
  const session = await getSession()
  return (session as Record<string, unknown> | null)?.accessToken as
    | string
    | undefined
}

export interface Partner {
  id: number
  account_type: "individual" | "company"
  name: string
  email: string | null
  phone: string | null
  mobile: string | null
  job_title: string | null
  city: string | null
  is_active: boolean
  title?: { id: number; name: string }
  industry?: { id: number; name: string }
  company?: { id: number; name: string }
  tags?: { id: number; name: string }[]
}

export async function fetchPartners(page = 1) {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/contacts/partners", {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, per_page: 15 },
  })
  return data
}
