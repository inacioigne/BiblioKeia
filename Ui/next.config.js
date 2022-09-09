/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images-na.ssl-images-amazon.com', 'localhost']
  }
}

module.exports = nextConfig
