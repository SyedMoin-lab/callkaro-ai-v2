/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // Dev only: skip the optimizer (and its .next/cache/images cache) so replacing
    // an image at the same path shows up on refresh, no need to wipe .next.
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Routes renamed /about -> /about-us and /contact -> /contact-us.
  // Permanent (308) redirects so old links, bookmarks, and SEO don't 404.
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
    ]
  },
}

export default nextConfig
