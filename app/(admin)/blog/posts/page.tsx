"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchBlogPosts } from "@/services/blog"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Loader2 } from "lucide-react"

export default function BlogPostsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["blog-posts-list"],
    queryFn: () => fetchBlogPosts(),
  })

  return (
    <PageContainerAdmin
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Blog", href: "/blog" },
        { label: "Posts", href: "/blog/posts", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground text-sm">
            All blog posts
          </p>
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
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.data?.map((post: any) => (
                  <tr key={post.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3">
                      {post.category?.name || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          post.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
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
