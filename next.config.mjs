/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  swcMinify: false,
};

export default nextConfig;
