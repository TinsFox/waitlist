import type { NextConfig } from "next"
import { env } from "./env"

const nextConfig: NextConfig = {
  images: {
    domains: [env.NEXT_PUBLIC_URL],
  },
}

export default nextConfig
