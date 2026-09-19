/**
 * Business information — single source of truth for the whole site.
 *
 * Every value here was verified on 19 Sep 2026 from the Google Business
 * listing (https://share.google/j1rMSVKTXKjWEZIcG) and the profiles linked
 * from it. Anything not verified is left undefined; the UI hides those
 * fields automatically. Update this file (or wire it to Supabase later) —
 * nothing here is duplicated inside components.
 */

export interface StoreHours {
  /** Opening hour, 24h clock (IST). */
  open: number
  /** Closing hour, 24h clock (IST). */
  close: number
  /** Human label for the days these hours apply to. */
  days: string
}

export interface Business {
  name: string
  tagline: string
  category: string
  /** One-line description shown on the Google listing. */
  shortDescription: string
  /** "From the business" description written by the owner on Google. */
  description: string
  address: {
    line1: string
    line2: string
    locality: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  /** Primary listing number, E.164. */
  phone: string
  phoneDisplay: string
  /** Order / delivery numbers published in the owner description. */
  orderPhones: { number: string; display: string }[]
  /** WhatsApp number in international format without "+", if verified. */
  whatsapp?: string
  whatsappDisplay?: string
  rating?: number
  reviewCount?: number
  hours: { store: StoreHours; delivery?: StoreHours }
  googleMapsUrl: string
  googleShareUrl: string
  directionsUrl: string
  mapEmbedUrl: string
  website?: string
  social?: { instagram?: string; facebook?: string }
  /** Verified store facts, in the owner's own words where possible. */
  highlights: { title: string; detail: string }[]
  landmarks: string[]
  /** Review snippets shown on the Google listing, quoted verbatim. */
  googleReviewSnippets: string[]
  /** Google's own AI summary of reviews, quoted verbatim. */
  googleReviewSummary: string
  timeZone: string
}

// This query resolves to the store's own Google Maps listing (not just the mall).
const mapsQuery = encodeURIComponent('Mantan Supermart New Manglapuri Sultanpur')

export const business: Business = {
  name: 'Mantan Supermart',
  tagline: 'Your trusted destination for everyday groceries, household essentials and daily needs.',
  category: 'Gourmet grocery store',
  shortDescription:
    'Shop for Indian and international groceries, toiletries and fruit as well as confectionery.',
  description:
    'Mantan Supermart is located on MG Road, 300 metres from Sultanpur metro station and 800 metres from Chattarpur metro station, with a 20,000 sq ft shopping space, wide aisles and free vehicle parking. Find Indian and international groceries, daily fruits and vegetables, meats, frozen snacks, ice creams, cold drinks and other beverages, and fresh chakki atta, along with a personal care range, cosmetics, and household and kitchen utilities. Our staff are always happy to help you find what you need. Free home delivery is available in a limited area, and you can put together your own gift hamper from our gifting baskets.',
  address: {
    line1: 'GF & LGF, The Gallery On MG Mall',
    line2: 'Mehrauli-Gurgaon Rd, near Sultanpur Metro Station',
    locality: 'New Manglapuri, Sultanpur',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110030',
    country: 'IN',
  },
  phone: '+919811876521',
  phoneDisplay: '098118 76521',
  orderPhones: [
    { number: '+919999667962', display: '99996 67962' },
    { number: '+919999667952', display: '99996 67952' },
  ],
  // Google listing "Order online" button links to wa.me/+919999667962
  whatsapp: '919999667962',
  whatsappDisplay: '+91 99996 67962',
  rating: 4.4,
  reviewCount: 195,
  hours: {
    store: { open: 8, close: 22, days: 'Monday to Sunday' },
    delivery: { open: 9, close: 21, days: 'Monday to Sunday' },
  },
  googleMapsUrl:
    'https://www.google.com/maps/place/Mantan+Supermart/data=!4m2!3m1!1s0x390d1fc3888acb5f:0xa7c282e69f54e584',
  googleShareUrl: 'https://share.google/j1rMSVKTXKjWEZIcG',
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`,
  website: 'https://www.mantansupermart.com/',
  social: {
    instagram: 'https://www.instagram.com/mantan_super_mart/',
    facebook: 'https://www.facebook.com/mantanfoodhub/',
  },
  highlights: [
    { title: '20,000 sq ft of shopping', detail: 'Wide aisles across the ground and lower ground floors of The Gallery on MG.' },
    { title: 'Indian and international groceries', detail: 'Everyday staples alongside imported and gourmet finds.' },
    { title: 'Fresh every day', detail: 'Daily fruits and vegetables, fresh chakki atta, meats, frozen snacks and ice creams.' },
    { title: 'Free home delivery', detail: 'Available in a limited area, 9 am to 9 pm. Call or WhatsApp to order.' },
    { title: 'Free vehicle parking', detail: 'Drive in, shop at your pace, load up easily.' },
    { title: 'Gift hampers', detail: 'Choose your own assortment and we will put the hamper together.' },
  ],
  landmarks: ['300 m from Sultanpur Metro Station', '800 m from Chattarpur Metro Station'],
  googleReviewSnippets: [
    'High quality inventory, includes gourmet foods and exotic items.',
    'Wide variety of products, reasonable prices, and very helpful staff.',
    'The place is good but needs improvement like price on fruits, vegetables.',
  ],
  googleReviewSummary:
    'People say this supermarket offers a wide variety of products, including Indian and international brands, and is clean and well-organized. They also highlight the helpful staff, good discounts, and smooth billing service.',
  timeZone: 'Asia/Kolkata',
}

/** Full postal address on one line. */
export const fullAddress = [
  business.address.line1,
  business.address.line2,
  business.address.locality,
  `${business.address.city}, ${business.address.region} ${business.address.postalCode}`,
].join(', ')
