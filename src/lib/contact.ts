export const SUPPORT_EMAIL = "hello@callkaro.ai"
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`

export type Office = {
  city: string
  region: string
  mapSrc: string
  address: { line1: string; line2: string }
  phone: { display: string; href: string }
  email: string
}

export const OFFICES: Office[] = [
  {
    city: "Bengaluru",
    region: "India",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.5846%2C12.9616%2C77.6046%2C12.9816&layer=mapnik&marker=12.9716%2C77.5946",
    address: { line1: "Koramangala, 5th Block", line2: "Bengaluru, KA 560095" },
    phone: { display: "+91 80 4718 2200", href: "tel:+918047182200" },
    email: "bengaluru@callkaro.ai",
  },
  {
    city: "Mumbai",
    region: "India",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=72.8677%2C19.0660%2C72.8877%2C19.0860&layer=mapnik&marker=19.0760%2C72.8777",
    address: { line1: "Bandra Kurla Complex", line2: "Mumbai, MH 400051" },
    phone: { display: "+91 22 6120 4400", href: "tel:+912261204400" },
    email: "mumbai@callkaro.ai",
  },
  {
    city: "New Delhi",
    region: "India",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.1990%2C28.6039%2C77.2190%2C28.6239&layer=mapnik&marker=28.6139%2C77.2090",
    address: { line1: "Connaught Place", line2: "New Delhi, DL 110001" },
    phone: { display: "+91 11 4200 6600", href: "tel:+911142006600" },
    email: "delhi@callkaro.ai",
  },
]

export const PRIMARY_OFFICE = OFFICES[0]
