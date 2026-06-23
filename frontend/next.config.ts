import type { NextConfig } from "next";
import os from "os";

// Automatically fetch all current local IP addresses
const interfaces = os.networkInterfaces();
const localIps = Object.values(interfaces)
  .flat()
  .filter((iface) => iface && iface.family === "IPv4")
  .map((iface) => iface?.address)
  .filter(Boolean) as string[];

const allOrigins = [...localIps, "localhost", "10.186.240.87"];

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: allOrigins,
  experimental: {
    serverActions: {
      allowedOrigins: [
        ...allOrigins.map(ip => `${ip}:3000`),
      ],
    },
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;

