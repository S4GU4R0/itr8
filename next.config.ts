import type { NextConfig } from "next";

const isExport = process.env.EXPORT_MODE === "true";

const nextConfig: NextConfig = {
  // Use static export for GitHub Pages
  output: isExport ? "export" : "standalone",
  
  // Disable server-based image optimization for static export
  images: isExport ? {
    unoptimized: true,
  } : undefined,
  
  // For GitHub Pages deployment to a subdirectory (e.g., username.github.io/repo-name)
  // Uncomment and set the basePath to your repo name:
  // basePath: "/your-repo-name",
  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
