"use client"

import { GalleryVerticalEnd, ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { forgotPassword } from "@/services/auth"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
})

type Input = z.infer<typeof schema>

const COOLDOWN = 60

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Input>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: Input) {
    try {
      const res = await forgotPassword({ email: data.email })
      if (res.success) {
        setSent(true)
        setCooldown(COOLDOWN)
        toast.success(res.message)
      }
    } catch {
      setError("root", { message: "Failed to send reset link. Try again." })
    }
  }

  async function handleResend() {
    const email = (document.getElementById("email") as HTMLInputElement)?.value
    if (!email) return
    setResending(true)
    try {
      const res = await forgotPassword({ email })
      if (res.success) {
        setCooldown(COOLDOWN)
        toast.success(res.message)
      }
    } catch {
      toast.error("Failed to resend. Try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
            </Link>
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <FieldDescription>
              Enter your email and we&apos;ll send you a reset link.
            </FieldDescription>
            {errors.root && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 font-mono text-xs text-destructive">
                {errors.root.message}
              </div>
            )}
            {sent && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-mono text-xs text-emerald-500">
                Reset link sent! Check your email.
              </div>
            )}
          </div>
          {!sent && (
            <>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="font-mono text-[10px] text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
                  Send Reset Link
                </Button>
              </Field>
            </>
          )}
          {sent && (
            <Field>
              <Button
                type="button"
                variant="outline"
                onClick={handleResend}
                disabled={cooldown > 0 || resending}
              >
                {resending && <Loader2Icon className="size-4 animate-spin" />}
                {cooldown > 0 && !resending
                  ? `Resend in ${cooldown}s`
                  : resending ? "Sending..." : "Resend Reset Link"}
              </Button>
            </Field>
          )}
          <Field>
            <Link
              href="/signin"
              className={cn(
                "flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary"
              )}
            >
              <ArrowLeftIcon className="size-3" />
              Back to sign in
            </Link>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
