import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.skilldeck.net" },
      { protocol: "https", hostname: "cloud-storage.skilldeck.net" },
      { protocol: "https", hostname: "local-skilldeck-s3.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "skilldeck-s3-storage.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "cloud-local.skilldeck.net" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "flagcdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "lodash", "date-fns"],
  },
  async rewrites() {
    return [
      {
        source: '/:slug.xml',
        destination: '/api/sitemaps/:slug',
      },
    ];
  },
};

export default nextConfig;
