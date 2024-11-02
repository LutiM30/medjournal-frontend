// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process?.env.NEXT_PUBLIC_ENV === 'local' ? process.env.API_URL_LOCAL : process.env.API_URL_PROD}/:path*`,
      },
    ];
  },
};

export default nextConfig;
