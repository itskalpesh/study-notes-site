/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdoc'],
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
