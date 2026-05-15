/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'files.catbox.moe'],
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'skia-canvas', '@napi-rs/canvas'],
  },
}

module.exports = nextConfig