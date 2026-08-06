import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ibibanza/shared", "@ibibanza/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
