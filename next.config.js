/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
      },
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
