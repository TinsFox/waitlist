import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { config } from "dotenv"
config({ path: ".env" })

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    BETTER_AUTH_EMAIL: z.string().email(),
  },
  shared: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_PROD_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_PROD_URL: process.env.NEXT_PUBLIC_PROD_URL,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    BETTER_AUTH_EMAIL: process.env.BETTER_AUTH_EMAIL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
