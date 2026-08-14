import type { NextConfig } from "next";

const isVercelProd = Boolean(process.env.VERCEL) && process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  assetPrefix: isVercelProd ? "https://skilldeck-website.vercel.app" : undefined,
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
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
