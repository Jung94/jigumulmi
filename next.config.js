/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 86400, // 24시간
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'ldb-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'contents.jigumulmi.com',
      },
      {
        protocol: 'https',
        hostname: 'contents-dev.jigumulmi.com',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/place',
        permanent: false,
      },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/search',
  //       permanent: false,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
