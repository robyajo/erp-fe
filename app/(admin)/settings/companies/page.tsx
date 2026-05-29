"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Building2, MapPin, Globe } from "lucide-react"

const companies = [
  { id: 1, name: "Mitunierp", email: "info@mitunierp.com", phone: "+62 21 1234 5678", city: "Jakarta", country: "Indonesia", active: true },
  { id: 2, name: "PT Tech Solution", email: "contact@techsol.com", phone: "+62 21 8765 4321", city: "Bandung", country: "Indonesia", active: true },
]

export default function CompaniesPage() {
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
        { label: "Companies", href: "/settings/companies", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground text-sm">
              Manage company profiles
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Location</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {companies.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {c.city}, {c.country}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Active
                    </span>
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
