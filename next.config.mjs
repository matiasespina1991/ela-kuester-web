/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  swcMinify: false,
};

export default nextConfig;
