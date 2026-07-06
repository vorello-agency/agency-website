import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["172.20.10.11", ""],
  async redirects() {
    return [
      {
        source: "/iniciar-proyecto",
        destination: "/start",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
