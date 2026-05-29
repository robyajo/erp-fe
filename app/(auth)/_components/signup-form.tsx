"use client"

import { GalleryVerticalEnd, Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { AuthError } from "@/types/auth"
import { SignupInput, signupSchema } from "./auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { register as registerUser } from "@/services/auth"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import ButtonGoogle from "./button-google"
import Link from "next/link"
import { usePluginStore } from "@/stores/plugin"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupInput) {
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      if (res.success) {
        const signInResult = await signIn("credentials", {
          token: res.data.token,
          redirect: false,
        })

        if (signInResult?.error) {
          toast.error("Account created but login failed. Please sign in.")
          return
        }

        usePluginStore.getState().reset()
        sessionStorage.clear()

        toast.success("Account created successfully! Please verify your email.")
        router.push("/verify-email")
        router.refresh()
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<AuthError>
      const serverErrors = axiosError.response?.data?.errors

      if (serverErrors) {
        const fieldMap: Record<string, keyof SignupInput> = {
          name: "name",
          email: "email",
          password: "password",
          password_confirmation: "password_confirmation",
        }

        for (const [field, messages] of Object.entries(serverErrors)) {
          const mapped = fieldMap[field]
          if (mapped) {
            setError(mapped, { message: messages[0] })
          }
        }

        const hasRootError = axiosError.response?.data?.message
        if (hasRootError) {
          setError("root", { message: hasRootError })
        }
      } else {
        const message =
          axiosError.response?.data?.message ||
          "Registration failed. Please try again."
        setError("root", { message })
      }
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Already have an account? <Link href="/signin">Sign in</Link>
            </FieldDescription>
            {errors.root && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 font-mono text-xs text-destructive">
                {errors.root.message}
              </div>
            )}
          </div>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="font-mono text-[10px] text-destructive">
                {errors.name.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
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
            <FieldLabel htmlFor="password">Password</FieldLabel>
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
            <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
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
              Create Account
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4">
            <ButtonGoogle />
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
