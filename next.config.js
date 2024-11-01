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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'encrypted-tbn0.gstatic.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.prod.website-files.com',
      // },
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
