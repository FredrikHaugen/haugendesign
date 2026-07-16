import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This app has its own lockfile; don't infer the monorepo root.
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/73tyvgdh/production/**",
      },
    ],
  },
  env: {
    // Baked in at build time; fs checks at request time are unreliable on
    // serverless ISR. The hero figure renders only once the site owner has
    // supplied public/hero.jpg and the site is rebuilt.
    NEXT_PUBLIC_HAS_HERO: existsSync(join(__dirname, "public", "hero.jpg")) ? "1" : "",
  },
};

export default nextConfig;
