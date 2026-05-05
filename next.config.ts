import type { NextConfig } from "next";

const STRAPI_URL = process.env.STRAPI_URL;

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
if (STRAPI_URL) {
  try {
    const url = new URL(STRAPI_URL);
    remotePatterns.push({
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/uploads/**",
    });
  } catch {
    /* ignore invalid STRAPI_URL */
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns,
  },
};

export default nextConfig;
