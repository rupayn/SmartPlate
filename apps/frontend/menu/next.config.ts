import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "menu",
        filename: "static/chunks/remoteEntry.js",
        extraOptions: {},
        exposes: {
          "./MenuList": "./components/MenuList.tsx",
          "./MenuItem": "./components/MenuItem.tsx",
        },
        shared: {},
      })
    );
    return config;
  },
};

export default nextConfig;
