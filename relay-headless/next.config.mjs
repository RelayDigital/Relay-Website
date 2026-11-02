/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337").hostname,
      },
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
      },
    ],
  },
  // Add any additional Next.js configurations here
};

export default nextConfig;
