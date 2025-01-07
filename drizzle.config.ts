import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"
import { env } from "./env"

config({ path: ".env" })

export default defineConfig({
  schema: ["./lib/db/schema.ts", "./auth-schema.ts"],
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
