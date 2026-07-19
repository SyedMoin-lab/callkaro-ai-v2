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

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "1337" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337" },
      ...(strapiRemotePattern ? [strapiRemotePattern] : []),
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
    ]
  },
}

export default nextConfig
