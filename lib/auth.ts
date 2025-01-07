import { nextCookies } from "better-auth/next-js"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import { admin, username } from "better-auth/plugins"
import * as authSchema from "../auth-schema"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), username(), admin()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
})
