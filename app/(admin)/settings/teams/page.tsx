"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"

const teams = [
  { id: 1, name: "Sales Team", members: 5, lead: "John Doe" },
  { id: 2, name: "Operations", members: 3, lead: "Jane Smith" },
  { id: 3, name: "Support", members: 4, lead: "Bob Johnson" },
]

export default function TeamsPage() {
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
        { label: "Teams", href: "/settings/teams", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
            <p className="text-muted-foreground text-sm">
              Manage teams and groups
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Members</th>
                <th className="px-4 py-3 text-left font-medium">Team Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teams.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3">{t.members}</td>
                  <td className="px-4 py-3">{t.lead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainerAdmin>
  )
}
