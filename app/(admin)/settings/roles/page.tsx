"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Shield, Lock } from "lucide-react"

const roles = [
  { id: 1, name: "Admin", users: 3, permissions: "Full access", isSystem: true },
  { id: 2, name: "Super Admin", users: 1, permissions: "Full access", isSystem: true },
  { id: 3, name: "Manager", users: 5, permissions: "Sales, Inventory, Reports" },
  { id: 4, name: "User", users: 12, permissions: "Sales, Inventory" },
  { id: 5, name: "Accountant", users: 2, permissions: "Invoices, Accounting" },
]

export default function RolesPage() {
  return (
    <PageContainerAdmin
      title="Settings"
      headerNav={[
        { label: "Roles", href: "/settings/roles" },
        { label: "Companies", href: "/settings/companies" },
        { label: "Teams", href: "/settings/teams" },
        { label: "Users", href: "/settings/users" },
        { label: "Custom Fields", href: "/settings/custom-fields" },
        { label: "Settings", href: "/settings" },
      ]}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings" },
        { label: "Roles", href: "/settings/roles", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
            <p className="text-muted-foreground text-sm">
              Manage roles and permissions
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Users</th>
                <th className="px-4 py-3 text-left font-medium">Permissions</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{role.name}</td>
                  <td className="px-4 py-3">{role.users}</td>
                  <td className="px-4 py-3">{role.permissions}</td>
                  <td className="px-4 py-3">
                    {role.isSystem ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        <Lock className="h-3 w-3" />
                        System
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        <Shield className="h-3 w-3" />
                        Custom
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainerAdmin>
  )
}
