import { nextCookies } from "better-auth/next-js"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import { admin, username } from "better-auth/plugins"
import * as authSchema from "../auth-schema"
import { resend } from "./email/resend"
import { reactResetPasswordEmail } from "./email/rest-password"
import { env } from "@/env"

const from = env.BETTER_AUTH_EMAIL

export const auth = betterAuth({
  plugins: [nextCookies(), username(), admin()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: user.email,
        subject: "Verify your email address",
        html: `<a href="${url}">Verify your email address</a>`,
      })
      console.log("email verification", res, user.email)
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      })
      console.log("email reset password", res, user.email)
    },
  },
})
