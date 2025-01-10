import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ["next-mdx-remote"],
  // webpack: (config) => {
  //   config.externals = [...(config.externals || []), "encoding"]
  //   return config
  // },
}

export default nextConfig
