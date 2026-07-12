type StrapiEntity<T> =
  | (T & {
      id?: number
      documentId?: string
    })
  | {
      id?: number
      documentId?: string
      attributes?: T
    }

export interface StrapiCollectionResponse<T> {
  data: StrapiEntity<T>[]
}

function normalizeStrapiUrl(value?: string): string | null {
  if (!value) return null
  return value.replace(/\/+$/, "")
}

export function getStrapiBaseUrl(): string | null {
  return normalizeStrapiUrl(
    process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL
  )
}

export function isStrapiConfigured(): boolean {
  return Boolean(getStrapiBaseUrl())
}

function warnStrapi(message: string, error?: unknown) {
  if (process.env.STRAPI_DEBUG !== "true") return

  if (error) {
    console.warn(message, error)
    return
  }

  console.warn(message)
}

export async function fetchStrapi<T>(
  pathname: string,
  params?: URLSearchParams
): Promise<T | null> {
  const baseUrl = getStrapiBaseUrl()
  if (!baseUrl) return null

  const url = new URL(pathname, `${baseUrl}/`)
  if (params) {
    url.search = params.toString()
  }

  const headers = new Headers()
  const token = process.env.STRAPI_API_TOKEN
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  try {
    const response = await fetch(url, {
      headers,
      next: {
        revalidate: Number(process.env.STRAPI_REVALIDATE_SECONDS ?? 60),
      },
    })

    if (!response.ok) {
      warnStrapi(
        `Strapi request failed for ${url.pathname}: ${response.status}`
      )
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    warnStrapi(`Strapi request failed for ${url.pathname}:`, error)
    return null
  }
}

export function unwrapStrapiEntity<T>(
  entity: StrapiEntity<T>
): T & { id?: number; documentId?: string } {
  if (
    entity &&
    typeof entity === "object" &&
    "attributes" in entity &&
    entity.attributes
  ) {
    return {
      ...entity.attributes,
      id: entity.id,
      documentId: entity.documentId,
    }
  }

  return entity as T & { id?: number; documentId?: string }
}

export function getStrapiMediaUrl(
  media: unknown,
  fallback?: string | null
): string | undefined {
  const value =
    media &&
    typeof media === "object" &&
    "data" in media &&
    (media as { data?: unknown }).data
      ? (media as { data?: unknown }).data
      : media

  const single = Array.isArray(value) ? value[0] : value
  if (!single || typeof single !== "object") {
    return fallback ?? undefined
  }

  const item = unwrapStrapiEntity<Record<string, unknown>>(
    single as StrapiEntity<Record<string, unknown>>
  )
  const url = typeof item.url === "string" ? item.url : undefined

  if (!url) return fallback ?? undefined
  if (/^https?:\/\//.test(url)) return url
  if (url.startsWith("/")) {
    const baseUrl = getStrapiBaseUrl()
    return baseUrl ? `${baseUrl}${url}` : url
  }

  return url
}
