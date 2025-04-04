import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
                pathname: "/7.x/identicon/svg",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                pathname: "/images",
            },
            {
                protocol: "https",
                hostname: "kitchenofdebjani.com",
                pathname: "/wp-content/uploads/**",
            },
        ],
    },
};

export default nextConfig;
