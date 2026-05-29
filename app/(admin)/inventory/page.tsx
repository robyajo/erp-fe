"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Warehouse, Tags, ArrowLeftRight } from "lucide-react"
import Link from "next/link"

const links = [
  { href: "/inventory/products", label: "Products", icon: Package },
  { href: "/inventory/categories", label: "Categories", icon: Tags },
  { href: "/inventory/warehouses", label: "Warehouses", icon: Warehouse },
  { href: "/inventory/operations", label: "Operations", icon: ArrowLeftRight },
]

const inventoryNav = [
  { label: "Products", href: "/inventory/products" },
  { label: "Categories", href: "/inventory/categories" },
  { label: "Warehouses", href: "/inventory/warehouses" },
  { label: "Operations", href: "/inventory/operations" },
]

export default function InventoryPage() {
  return (
    <PageContainerAdmin
      title="Inventory"
      headerNav={inventoryNav}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Inventory", href: "/inventory", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground text-sm">
            Manage products, warehouses, and stock operations
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="cursor-pointer transition-colors hover:border-primary/50">
                <CardHeader className="pb-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base">{label}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainerAdmin>
  )
}
