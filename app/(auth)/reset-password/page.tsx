"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { resetPassword } from "@/services/auth"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const schema = z
  .object({
    email: z.string().min(1, "Email is required").email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Too long"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })

type Input = z.infer<typeof schema>

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: { email: searchParams.get("email") ?? "" },
  })

  async function onSubmit(data: Input) {
    if (!token) {
      setError("root", { message: "Missing reset token" })
      return
    }

    try {
      const res = await resetPassword({
        token,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      if (res.success) {
        toast.success(res.message)
        router.push("/signin")
      }
    } catch {
      setError("root", { message: "Failed to reset password. Try again." })
    }
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Invalid or missing reset token.
        </p>
        <Link
          href="/forgot-password"
          className="flex items-center gap-2 text-xs text-primary"
        >
          <ArrowLeftIcon className="size-3" />
          Request a new reset link
        </Link>
      </div>
    )
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
            <h1 className="text-xl font-bold">Reset Password</h1>
            <FieldDescription>
              Enter your new password below.
            </FieldDescription>
            {errors.root && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 font-mono text-xs text-destructive">
                {errors.root.message}
              </div>
            )}
          </div>
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
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="font-mono text-[10px] text-destructive">
                {errors.password.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password_confirmation">
              Confirm Password
            </FieldLabel>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              required
              {...register("password_confirmation")}
              disabled={isSubmitting}
            />
            {errors.password_confirmation && (
              <span className="font-mono text-[10px] text-destructive">
                {errors.password_confirmation.message}
              </span>
            )}
          </Field>
          <Field>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
              Reset Password
            </Button>
          </Field>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[200px] animate-pulse items-center justify-center font-mono text-xs text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
