"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchBlogPosts, fetchBlogCategories } from "@/services/blog"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Loader2, FileText, FolderOpen } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const { data: postsData, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => fetchBlogPosts(),
  })

  const { data: catsData } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => fetchBlogCategories(),
  })

  return (
    <PageContainerAdmin
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Blog", href: "/blog", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
            <p className="text-muted-foreground text-sm">
              Manage blog posts and categories
            </p>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {postsData?.data?.length ?? 0} posts
            </span>
            <span className="flex items-center gap-1">
              <FolderOpen className="h-4 w-4" />
              {catsData?.data?.length ?? 0} categories
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/blog/posts"
            className="rounded-lg border p-4 transition-colors hover:border-primary/50"
          >
            <FileText className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="font-medium">Posts</p>
            <p className="text-sm text-muted-foreground">
              {postsData?.data?.length ?? 0} posts
            </p>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Author</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {postsData?.data?.map((post: any) => (
                  <tr key={post.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3">
                      {post.category?.name || "-"}
                    </td>
                    <td className="px-4 py-3">{post.author_name || "-"}</td>
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
