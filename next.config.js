/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source:'/',
        destination: '/proposal?id=introduction',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig
