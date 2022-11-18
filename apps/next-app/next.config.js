/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    serverComponents: true,
  },
  compiler: {
    relay: require('./relay.config'),
    styledComponents: true,
  },
};

module.exports = nextConfig;
