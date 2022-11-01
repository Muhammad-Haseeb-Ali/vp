/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source:'/',
        destination: '/proposal?id=786',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig
