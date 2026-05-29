"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"

interface ErrorAlertProps {
  message: string | null
  onDismiss: () => void
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  if (!message) return null

  return (
    <Alert variant="destructive" className="relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  )
}
