import { z } from "zod"

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(128, "Too long"),
})

export type SigninInput = z.infer<typeof signinSchema>

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255, "Too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })

export type SignupInput = z.infer<typeof signupSchema>
