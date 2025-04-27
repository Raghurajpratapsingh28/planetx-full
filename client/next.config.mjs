/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "d35tq0e02t18sa.cloudfront.net"
    ],
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }
};

export default nextConfig;
