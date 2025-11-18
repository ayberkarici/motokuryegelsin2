/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now default in Next.js 14
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**',
        '.git/**',
        '.next/**',
        'scripts/**',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig