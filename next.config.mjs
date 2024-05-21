/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**reservation-media.s3.amazonaws.com",
        port: "",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
