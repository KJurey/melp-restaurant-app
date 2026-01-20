import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/melp-restaurant-app",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
