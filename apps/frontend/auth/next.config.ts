import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "auth",
        extraOptions:{},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Login": "./components/Login.tsx",
          "./Register": "./components/Register.tsx",
        },
        shared: {},
      })
    );
    return config;
  },
};

export default nextConfig;
