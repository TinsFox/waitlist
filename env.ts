import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { config } from "dotenv"
config({ path: ".env" })

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
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
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
