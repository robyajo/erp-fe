"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Building2,
  Users,
  UserCog,
  Database,
  Activity,
} from "lucide-react"
import Link from "next/link"

const settingsLinks = [
  { href: "/settings/roles", label: "Roles", icon: Shield, desc: "Manage roles and permissions" },
  { href: "/settings/companies", label: "Companies", icon: Building2, desc: "Manage company profiles" },
  { href: "/settings/teams", label: "Teams", icon: Users, desc: "Manage teams and groups" },
  { href: "/settings/users", label: "Users", icon: UserCog, desc: "Manage user accounts" },
  { href: "/settings/custom-fields", label: "Custom Fields", icon: Database, desc: "Create custom data fields" },
  { href: "/settings/manage-activity", label: "Activity", icon: Activity, desc: "Activity and email settings" },
]

export default function SettingsPage() {
  return (
    <PageContainerAdmin
      title="Settings"
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage system configuration
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {settingsLinks.map(({ href, label, icon: Icon, desc }) => (
            <Link key={href} href={href}>
              <Card className="cursor-pointer transition-colors hover:border-primary/50 h-full">
                <CardHeader className="pb-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base">{label}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainerAdmin>
  )
}
