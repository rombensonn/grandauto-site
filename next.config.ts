import type { NextConfig } from "next";

const isStaticPagesBuild = process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const githubPagesBasePath = process.env.NEXT_PUBLIC_GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticPagesBuild
    ? {
        output: "export" as const,
        trailingSlash: true,
        ...(githubPagesBasePath
          ? {
              assetPrefix: githubPagesBasePath,
              basePath: githubPagesBasePath
            }
          : {})
      }
    : {})
};

export default nextConfig;
