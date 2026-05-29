"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/services/inventory"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Loader2 } from "lucide-react"

const inventoryNav = [
  { label: "Products", href: "/inventory/products" },
  { label: "Categories", href: "/inventory/categories" },
  { label: "Warehouses", href: "/inventory/warehouses" },
  { label: "Operations", href: "/inventory/operations" },
]

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["inventory-products"],
    queryFn: () => fetchProducts(),
  })

  return (
    <PageContainerAdmin
      title="Inventory"
      headerNav={inventoryNav}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Inventory", href: "/inventory" },
        { label: "Products", href: "/inventory/products", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground text-sm">
              Manage product catalog
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">SKU</th>
                  <th className="px-4 py-3 text-left font-medium">Price</th>
                  <th className="px-4 py-3 text-left font-medium">Unit</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.data?.map((product: any) => (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{product.sku}</td>
                    <td className="px-4 py-3">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </td>
                    <td className="px-4 py-3">{product.unit}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainerAdmin>
  )
}
