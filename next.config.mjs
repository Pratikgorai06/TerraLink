/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
