import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ui.aceternity.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "assets.aceternity.com",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
  // webpack: (config) => {
  //   config.externals = [...(config.externals || []), "encoding"]
  //   return config
  // },
};

export default nextConfig;
