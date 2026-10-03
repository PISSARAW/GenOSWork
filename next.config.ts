import type { NextConfig } from "next";

const huggingFaceSpaceBuild = process.env.HF_SPACE_BUILD === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(huggingFaceSpaceBuild ? { output: "standalone" as const } : {}),
  async rewrites() {
    return {
      beforeFiles: [{ source: "/en/:path*", destination: "/:path*" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
