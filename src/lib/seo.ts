import { useEffect } from 'react'
import { business, fullAddress } from '@/data/business'
import { images } from '@/data/images'

const SITE = 'Mantan Supermart'

/** Sets the document title and meta description for a page. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE} | Grocery & Daily Essentials` : `${title} | ${SITE}`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

const pad = (n: number) => String(n).padStart(2, '0')

/** LocalBusiness structured data, generated from the verified business record. */
export function localBusinessJsonLd() {
  const h = business.hours.store
  return {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    name: business.name,
    description: business.shortDescription,
    ...(business.website ? { url: business.website } : {}),
    telephone: business.phone,
    image: [images.hero.main],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.line1}, ${business.address.line2}, ${business.address.locality}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    hasMap: business.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: `${pad(h.open)}:00`,
        closes: `${pad(h.close)}:00`,
      },
    ],
    sameAs: [business.social?.instagram, business.social?.facebook, business.googleMapsUrl].filter(Boolean),
    ...(business.whatsapp
      ? {
          potentialAction: {
            '@type': 'OrderAction',
            target: `https://wa.me/${business.whatsapp}`,
            deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
          },
        }
      : {}),
  }
}

/** Injects the LocalBusiness JSON-LD once. */
export function useStructuredData() {
  useEffect(() => {
    const id = 'ld-local-business'
    if (document.getElementById(id)) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.text = JSON.stringify(localBusinessJsonLd())
    document.head.appendChild(script)
  }, [])
}

export { fullAddress }
