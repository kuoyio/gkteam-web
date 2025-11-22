import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : process.env.NEXT_PUBLIC_API_BASE_URL;

    return [
      {
        source: "/api/external/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
