import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Stamped when the site is built, so the homepage footer can say when it
    // was last deployed without anyone editing a date by hand.
    NEXT_PUBLIC_BUILT_AT: new Date().toISOString(),
  },
};

export default nextConfig;
