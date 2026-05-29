"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Database, Type, ToggleLeft, ListChecks, Calendar } from "lucide-react"

const fieldTypes = [
  { type: "text", label: "Text", icon: Type, count: 8 },
  { type: "select", label: "Select", icon: ListChecks, count: 3 },
  { type: "toggle", label: "Toggle", icon: ToggleLeft, count: 2 },
  { type: "datetime", label: "Date/Time", icon: Calendar, count: 1 },
]

export default function CustomFieldsPage() {
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
        { label: "Custom Fields", href: "/settings/custom-fields", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Custom Fields</h1>
            <p className="text-muted-foreground text-sm">
              Create custom data fields for any module
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fieldTypes.map((ft) => (
            <div key={ft.type} className="rounded-lg border p-4">
              <ft.icon className="mb-2 h-5 w-5 text-muted-foreground" />
              <p className="font-medium text-sm">{ft.label}</p>
              <p className="text-xs text-muted-foreground">{ft.count} fields</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-lg border border-dashed py-20 text-muted-foreground text-sm">
          <Database className="mr-2 h-4 w-4" />
          Custom fields management — connect to backend API
        </div>
      </div>
    </PageContainerAdmin>
  )
}
