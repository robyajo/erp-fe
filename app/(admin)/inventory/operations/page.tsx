"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchOperations } from "@/services/inventory"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Loader2 } from "lucide-react"

const stateColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  confirmed: "bg-blue-100 text-blue-700",
  assigned: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
}
const inventoryNav = [
  { label: "Products", href: "/inventory/products" },
  { label: "Categories", href: "/inventory/categories" },
  { label: "Warehouses", href: "/inventory/warehouses" },
  { label: "Operations", href: "/inventory/operations" },
]


export default function OperationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["inventory-operations"],
    queryFn: () => fetchOperations(),
  })

  return (
    <PageContainerAdmin
      title="Inventory"
      headerNav={inventoryNav}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Inventory", href: "/inventory" },
        {
          label: "Operations",
          href: "/inventory/operations",
          isCurrent: true,
        },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Operations</h1>
            <p className="text-muted-foreground text-sm">
              Stock operations and movements
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
                  <th className="px-4 py-3 text-left font-medium">Reference</th>
                  <th className="px-4 py-3 text-left font-medium">State</th>
                  <th className="px-4 py-3 text-left font-medium">Scheduled</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.data?.map((op: any) => (
                  <tr key={op.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{op.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {op.reference || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${stateColors[op.state] || "bg-gray-100 text-gray-600"}`}
                      >
                        {op.state}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {op.scheduled_at
                        ? new Date(op.scheduled_at).toLocaleDateString()
                        : "-"}
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
