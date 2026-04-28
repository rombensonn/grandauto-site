import type { NextConfig } from "next";

const isStaticPagesBuild = process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticPagesBuild ? { output: "export" as const, trailingSlash: true } : {})
};

export default nextConfig;
