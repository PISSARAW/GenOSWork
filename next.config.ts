import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [{ source: "/en/:path*", destination: "/:path*" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
