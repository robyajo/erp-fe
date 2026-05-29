"use client"

import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  { id: 1, name: "Admin User", email: "admin@mitunierp.com", role: "Admin", status: "Active", avatar: "" },
  { id: 2, name: "John Doe", email: "john@mitunierp.com", role: "Manager", status: "Active", avatar: "" },
  { id: 3, name: "Jane Smith", email: "jane@mitunierp.com", role: "User", status: "Active", avatar: "" },
  { id: 4, name: "Bob Johnson", email: "bob@mitunierp.com", role: "User", status: "Inactive", avatar: "" },
]

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export default function UsersPage() {
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
        { label: "Users", href: "/settings/users", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground text-sm">
              Manage user accounts
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback className="text-[10px]">{getInitials(u.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {u.status}
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
