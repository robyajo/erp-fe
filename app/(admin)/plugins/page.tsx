"use client"

import * as React from "react"
import { usePluginStore } from "@/stores/plugin"
import PageContainerAdmin from "@/components/admin/page-container-admin"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Box,
  FileText,
  Users,
  Puzzle,
  Loader2,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  package: <Box className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
}

export default function PluginsPage() {
  const { plugins, loading, install, uninstall, refresh } = usePluginStore()
  const [installing, setInstalling] = React.useState<string | null>(null)
  const [uninstalling, setUninstalling] = React.useState<string | null>(null)

  React.useEffect(() => {
    usePluginStore.getState().init()
  }, [])

  const handleInstall = async (name: string) => {
    setInstalling(name)
    try {
      const msg = await install(name)
      toast.success(msg)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Install failed")
    } finally {
      setInstalling(null)
    }
  }

  const handleUninstall = async (name: string) => {
    setUninstalling(name)
    try {
      const msg = await uninstall(name)
      toast.success(msg)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Uninstall failed")
    } finally {
      setUninstalling(null)
    }
  }

  return (
    <PageContainerAdmin
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Plugins", href: "/plugins", isCurrent: true },
      ]}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plugins</h1>
            <p className="text-muted-foreground text-sm">
              Install and manage ERP plugins
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="mr-1 h-3 w-3" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plugins.map((plugin) => {
              const isInstalling = installing === plugin.name
              const isUninstalling = uninstalling === plugin.name
              const pending = isInstalling || isUninstalling

              return (
                <Card
                  key={plugin.name}
                  className={`transition-all ${plugin.installed ? "border-primary/40 ring-1 ring-primary/10" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            plugin.installed
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {iconMap[plugin.icon] || <Puzzle className="h-5 w-5" />}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {plugin.label}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{plugin.author}</span>
                            <span>·</span>
                            <span>v{plugin.latest_version}</span>
                            <span>·</span>
                            <span>{plugin.license}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2 text-sm">
                      {plugin.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2">
                      {plugin.installed ? (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Installed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="mr-1 h-3 w-3" />
                          Not Installed
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-3">
                    {plugin.installed ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-500 hover:text-red-600 hover:border-red-200"
                        disabled={pending}
                        onClick={() => handleUninstall(plugin.name)}
                      >
                        {isUninstalling ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : null}
                        Uninstall
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={pending}
                        onClick={() => handleInstall(plugin.name)}
                      >
                        {isInstalling ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : null}
                        Install
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}

        {!loading && (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-4 text-sm text-muted-foreground">
            <Puzzle className="h-4 w-4" />
            {plugins.filter((p) => p.installed).length} plugin
            {plugins.filter((p) => p.installed).length !== 1 ? "s" : ""} installed · {plugins.length} available
          </div>
        )}
      </div>
    </PageContainerAdmin>
  )
}
