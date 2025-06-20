/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "192.168.1.6"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig