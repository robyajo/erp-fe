import axios from "@/lib/axios"
import type {
  AuthResponse,
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
  RefreshData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from "@/types/auth"

export async function login(
  data: LoginRequest
): Promise<AuthResponse<LoginData>> {
  const res = await axios.post<AuthResponse<LoginData>>("/api/v1/login", data)
  return res.data
}

export async function register(
  data: RegisterRequest
): Promise<AuthResponse<RegisterData>> {
  const res = await axios.post<AuthResponse<RegisterData>>(
    "/api/v1/register",
    data
  )
  return res.data
}

export async function getMe(accessToken: string): Promise<AuthResponse<User>> {
  const res = await axios.get<AuthResponse<User>>("/api/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return res.data
}

export async function refreshToken(
  accessToken: string
): Promise<AuthResponse<RefreshData>> {
  const res = await axios.post<AuthResponse<RefreshData>>(
    "/api/v1/refresh",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )
  return res.data
}

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<AuthResponse<{ message: string }>> {
  const res = await axios.post<AuthResponse<{ message: string }>>(
    "/api/v1/forgot-password",
    data
  )
  return res.data
}

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<AuthResponse<{ message: string }>> {
  const res = await axios.post<AuthResponse<{ message: string }>>(
    "/api/v1/reset-password",
    data
  )
  return res.data
}

export async function resendVerification(
  accessToken: string,
  email: string
): Promise<AuthResponse<{ message: string }>> {
  const res = await axios.post<AuthResponse<{ message: string }>>(
    "/api/v1/email/resend",
    { email },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )
  return res.data
}

export async function logout(
  accessToken: string
): Promise<AuthResponse<null>> {
  const res = await axios.post<AuthResponse<null>>(
    "/api/v1/logout",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )
  return res.data
}
