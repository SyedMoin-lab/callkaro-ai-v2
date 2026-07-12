function imageRemotePatternFromUrl(value) {
  if (!value) return null

  try {
    const url = new URL(value)
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
    }
  } catch {
    return null
  }
}

const strapiRemotePattern = imageRemotePatternFromUrl(
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "1337" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337" },
      ...(strapiRemotePattern ? [strapiRemotePattern] : []),
    ],
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
