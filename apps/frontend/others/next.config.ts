import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "others",
        filename: "static/chunks/remoteEntry.js",
        extraOptions: {},
        exposes: {
          "./OtherComponent": "./components/OtherComponent.tsx",
        },
        shared: {},
      })
    );
    return config;
  },
};

export default nextConfig;
