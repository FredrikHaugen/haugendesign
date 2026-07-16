import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This app has its own lockfile; don't infer the monorepo root.
    root: __dirname,
  },
};

export default nextConfig;
