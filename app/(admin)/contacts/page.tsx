"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchPartners } from "@/services/contacts"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Loader2, Users, Building2 } from "lucide-react"

export default function ContactsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["contacts-partners"],
    queryFn: () => fetchPartners(),
  })

  const individuals =
    data?.data?.filter((p: any) => p.account_type === "individual").length ?? 0
  const companies =
    data?.data?.filter((p: any) => p.account_type === "company").length ?? 0

  return (
    <PageContainerAdmin
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Contacts", href: "/contacts", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
            <p className="text-muted-foreground text-sm">
              Manage partners, customers, and companies
            </p>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {individuals} individuals
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {companies} companies
            </span>
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
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Phone</th>
                  <th className="px-4 py-3 text-left font-medium">City</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.data?.map((partner: any) => (
                  <tr key={partner.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{partner.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          partner.account_type === "company"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {partner.account_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{partner.email || "-"}</td>
                    <td className="px-4 py-3">{partner.phone || "-"}</td>
                    <td className="px-4 py-3">{partner.city || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          partner.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {partner.is_active ? "Active" : "Inactive"}
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
