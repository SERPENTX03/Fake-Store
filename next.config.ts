import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      protocol: "https",
      hostname: "i.imgur.com"
    }]
  }
};

export default nextConfig;
