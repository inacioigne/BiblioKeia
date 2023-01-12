/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', "commons.wikimedia.org"]
  }
}

module.exports = nextConfig
