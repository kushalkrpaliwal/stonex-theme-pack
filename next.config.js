/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  images: {
      domains: ['www.forex.com', 'www.cityindex.com', 'www.forex.com', "encrypted-tbn0.gstatic.com"],
  },
};

module.exports = nextConfig;
