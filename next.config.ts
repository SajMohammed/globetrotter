import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Development settings */
  reactStrictMode: true,

  /* Image optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /* Environment variables exposed to browser */
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },

  /* TypeScript */
  typescript: {
    // Don't build if there are type errors
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
