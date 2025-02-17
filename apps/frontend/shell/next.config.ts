import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        extraOptions:{},
        remotes: {
          auth: "auth@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          menu: "menu@http://localhost:3002/_next/static/chunks/remoteEntry.js",
          orders:
            "orders@http://localhost:3003/_next/static/chunks/remoteEntry.js",
          others:
            "others@http://localhost:3004/_next/static/chunks/remoteEntry.js",
        },
        shared: {},
      })
    );
    return config;
  },
};

export default nextConfig;
