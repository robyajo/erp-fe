"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Activity, Bell, Mail, Clock } from "lucide-react"

export default function ManageActivityPage() {
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
        { label: "Activity", href: "/settings/manage-activity", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
            <p className="text-muted-foreground text-sm">
              Activity and email settings
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <Bell className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="font-medium text-sm">Notifications</p>
            <p className="text-xs text-muted-foreground">Configure notification preferences</p>
          </div>
          <div className="rounded-lg border p-4">
            <Mail className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="font-medium text-sm">Email Templates</p>
            <p className="text-xs text-muted-foreground">Manage email notification templates</p>
          </div>
          <div className="rounded-lg border p-4">
            <Clock className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="font-medium text-sm">Activity Plans</p>
            <p className="text-xs text-muted-foreground">Configure automated activity plans</p>
          </div>
        </div>
      </div>
    </PageContainerAdmin>
  )
}
