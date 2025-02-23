import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    // ui.aceternity.com
    domains: [
      "ui.aceternity.com",
      "images.unsplash.com",
      "assets.aceternity.com",
    ],
  },
  transpilePackages: ["next-mdx-remote"],
  // webpack: (config) => {
  //   config.externals = [...(config.externals || []), "encoding"]
  //   return config
  // },
};

export default nextConfig;
