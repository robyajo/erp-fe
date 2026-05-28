"use client"

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { GalleryVerticalEnd, MailIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { resendVerification } from "@/services/auth"

const COOLDOWN = 60

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [resent, setResent] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  const verified = searchParams.get("verified") === "true"

  async function handleResend() {
    if (!session?.accessToken) {
      toast.error("Please sign in first")
      router.push("/signin")
      return
    }

    setSending(true)
    try {
      const res = await resendVerification(
        session.accessToken,
        session.data?.user?.email ?? ""
      )
      if (res.success) {
        setResent(true)
        setCooldown(COOLDOWN)
        toast.success(res.message)
      }
    } catch {
      toast.error("Failed to resend verification email")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
        </Link>
        <h1 className="text-xl font-bold">Email Verification</h1>
      </div>

      {verified ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2Icon className="size-6" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your email has been verified successfully!
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailIcon className="size-6" />
          </div>
          <p className="text-sm text-muted-foreground">
            We sent a verification link to your email. Please check your inbox.
          </p>
          {resent && (
            <p className="text-xs text-emerald-500">
              Verification email resent!
            </p>
          )}
          {session?.accessToken && (
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={cooldown > 0 || sending}
            >
              {sending && <Loader2Icon className="size-4 animate-spin" />}
              {cooldown > 0 && !sending
                ? `Resend in ${cooldown}s`
                : sending ? "Sending..." : "Resend Verification Email"}
            </Button>
          )}
          <Link
            href="/signin"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Back to sign in
          </Link>
        </div>
      )}
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[200px] animate-pulse items-center justify-center font-mono text-xs text-muted-foreground">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
