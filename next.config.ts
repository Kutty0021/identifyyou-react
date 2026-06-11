import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "identifyyou.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
