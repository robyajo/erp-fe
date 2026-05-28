export interface User {
  id: number
  name: string
  email: string
  avatarUrl: string | null
  role: string
  provider: string
  isActive: boolean
  emailVerified: boolean
  emailVerifiedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AuthResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

export interface AuthError {
  status: string
  message: string
  errors?: Record<string, string[]>
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginData {
  user: User
  token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface RegisterData {
  user: User
  token: string
}

export interface RefreshData {
  user: User
  roles: string
  permissions: string[]
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthSession {
  user: User
  token: string
}
