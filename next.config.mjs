/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'pbs.twimg.com',
      'assets.aceternity.com',
      'firebasestorage.googleapis.com',
    ],
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
