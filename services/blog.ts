import axios from "@/lib/axios"
import { getSession } from "next-auth/react"

async function getToken() {
  const session = await getSession()
  return (session as Record<string, unknown> | null)?.accessToken as
    | string
    | undefined
}

export interface Post {
  id: number
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  category_id: number | null
  is_published: boolean
  published_at: string | null
  featured_image: string | null
  author_name: string | null
  category?: { id: number; name: string }
  tags?: { id: number; name: string }[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  is_active: boolean
  sort: number
}

export async function fetchBlogPosts(page = 1) {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/blog/posts", {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, per_page: 15 },
  })
  return data
}

export async function fetchBlogCategories() {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/blog/categories", {
    headers: { Authorization: `Bearer ${token}` },
    params: { per_page: 50 },
  })
  return data
}
