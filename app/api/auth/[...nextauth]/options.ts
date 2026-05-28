import { AuthOptions, User, Account, SessionStrategy, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "@/lib/axios"
import { checkIsFrozen, recordFailure, resetLimit } from "@/lib/rate-limit"
import type { AuthResponse, LoginData, User as AppUser } from "@/types/auth"

declare module "next-auth" {
  interface Session {
    data: {
      user: AppUser
      token: string
    }
    accessToken: string
  }

  interface User {
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
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    user: AppUser
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60 * 24 * 7,
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        token: {},
      },
      async authorize(credentials) {
        // If token was passed directly (e.g. from register or social callback)
        if (credentials?.token) {
          try {
            const res = await axios.get<AuthResponse<AppUser>>(
              "/api/v1/me",
              {
                headers: {
                  Authorization: `Bearer ${credentials.token}`,
                },
              }
            )

            if (res.data?.success && res.data?.data) {
              const user = res.data.data
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                role: user.role,
                provider: user.provider,
                isActive: user.isActive,
                emailVerified: user.emailVerified,
                emailVerifiedAt: user.emailVerifiedAt,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken: credentials.token,
              }
            }
            return null
          } catch {
            return null
          }
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const email = credentials.email.trim()

        const freezeStatus = checkIsFrozen(email)
        if (freezeStatus.frozen) {
          throw new Error(
            `Account is frozen due to too many attempts. Try again in ${freezeStatus.remaining} seconds.`
          )
        }

        try {
          const res = await axios.post<AuthResponse<LoginData>>(
            "/api/v1/login",
            {
              email,
              password: credentials.password,
            }
          )

          const contentType = res.headers["content-type"]
          const isJson =
            typeof contentType === "string" &&
            contentType.includes("application/json")

          if (isJson && res.data?.success === true) {
            resetLimit(email)
            const { user, token } = res.data.data

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              avatarUrl: user.avatarUrl,
              role: user.role,
              provider: user.provider,
              isActive: user.isActive,
              emailVerified: user.emailVerified,
              emailVerifiedAt: user.emailVerifiedAt,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              accessToken: token,
            }
          }

          recordFailure(email)
          const message = res.data?.message || "Authentication failed"
          throw new Error(message)
        } catch (error: unknown) {
          recordFailure(email)

          const err = error as {
            response?: { data?: { message?: string } }
            message?: string
          }

          if (err.response?.data?.message) {
            throw new Error(err.response.data.message)
          }
          if (err.message) {
            throw error
          }
          throw new Error("Authentication failed")
        }
      },
    }),
  ],

  callbacks: {
    async jwt(params: {
      token: JWT
      account: Account | null
      user?: User | AdapterUser
      trigger?: "update" | string
      session?: Record<string, unknown>
    }) {
      const { token, user } = params

      if (user) {
        const u = user as User
        token.accessToken = u.accessToken
        token.user = {
          id: u.id,
          name: u.name,
          email: u.email,
          avatarUrl: u.avatarUrl,
          role: u.role,
          provider: u.provider,
          isActive: u.isActive,
          emailVerified: u.emailVerified,
          emailVerifiedAt: u.emailVerifiedAt,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        }
      }

      return token
    },

    async session(params: { session: Session; token: JWT }) {
      const sess = params.session as Session & Record<string, unknown>

      sess.data = {
        user: params.token.user,
        token: params.token.accessToken,
      }
      sess.accessToken = params.token.accessToken

      delete sess.user

      return sess
    },

    async signIn(params: {
      user: User | AdapterUser
      account: Account | null
    }) {
      if (params.user) return true
      return false
    },

    async redirect(params: { url: string; baseUrl: string }) {
      const { url, baseUrl } = params
      if (url.includes("/signin") || url === baseUrl) {
        return `${baseUrl}/dashboard`
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`
      try {
        if (new URL(url).origin === baseUrl) return url
      } catch {
        // invalid URL, fall back to baseUrl
      }
      return `${baseUrl}/dashboard`
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/error",
  },
}
