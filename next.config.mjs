/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      "logo.clearbit.com",
      "plaid-merchant-logos.plaid.com",
    ],
  },

  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
