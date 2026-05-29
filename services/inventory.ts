import axios from "@/lib/axios"
import { getSession } from "next-auth/react"

async function getToken(): Promise<string | undefined> {
  const session = await getSession()
  return (session as Record<string, unknown> | null)?.accessToken as
    | string
    | undefined
}

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  parent_id: number | null
  is_active: boolean
  sort: number
}

export interface Product {
  id: number
  category_id: number | null
  name: string
  sku: string
  price: number
  unit: string
  barcode: string | null
  min_stock: number
  is_active: boolean
  category?: Category
}

export interface Warehouse {
  id: number
  name: string
  code: string
  address: string | null
  city: string | null
  is_active: boolean
}

export interface Location {
  id: number
  name: string
  warehouse_id: number
  parent_id: number | null
  parent_path: string | null
  is_active: boolean
}

export interface Operation {
  id: number
  name: string
  reference: string | null
  operation_type_id: number
  source_location_id: number
  destination_location_id: number
  state: string
  scheduled_at: string | null
  validated_at: string | null
  notes: string | null
}

export async function fetchCategories(
  page = 1,
  perPage = 15,
): Promise<{ data: Category[] }> {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/inventory/categories", {
    ...authHeaders(token!),
    params: { page, per_page: perPage },
  })
  return data
}

export async function fetchProducts(
  page = 1,
  perPage = 15,
): Promise<{ data: Product[] }> {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/inventory/products", {
    ...authHeaders(token!),
    params: { page, per_page: perPage },
  })
  return data
}

export async function fetchWarehouses(): Promise<{ data: Warehouse[] }> {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/inventory/warehouses", {
    ...authHeaders(token!),
  })
  return data
}

export async function fetchOperations(
  page = 1,
  perPage = 15,
): Promise<{ data: Operation[] }> {
  const token = await getToken()
  const { data } = await axios.get("/api/v1/inventory/operations", {
    ...authHeaders(token!),
    params: { page, per_page: perPage },
  })
  return data
}
