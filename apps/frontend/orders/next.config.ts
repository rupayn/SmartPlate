import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "orders",
        filename: "static/chunks/remoteEntry.js",
        extraOptions: {},
        exposes: {
          "./OrderList": "./components/OrderList.tsx",
          "./OrderDetails": "./components/OrderDetails.tsx",
        },
        shared: {},
      })
    );
    return config;
  },
};

export default nextConfig;
