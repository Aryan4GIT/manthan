# Mantan Supermart — website

Local supermarket website for **Mantan Supermart**, The Gallery on MG Mall, Sultanpur, New Delhi.
React 19 + TypeScript + Vite 8 + Tailwind CSS 4, with shadcn-style UI primitives (Radix), Lucide icons and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where the data lives

Nothing about the business is hard-coded inside components. Edit these files (or wire them to Supabase later, keeping the same shapes):

| File | What it holds |
| --- | --- |
| `src/data/business.ts` | Name, address, phones, WhatsApp, hours, rating, map links, social profiles, verified store facts. Optional fields (`whatsapp`, `website`, `social`, `rating`, `hours.delivery`) hide their UI when removed. |
| `src/data/categories.ts` | Category tiles, example items, images. |
| `src/data/products.ts` | **Sample catalogue.** `catalogue.isDemo = true` shows the "sample catalogue" notice everywhere prices appear. Replace the array with real inventory and set `isDemo` to `false`. |
| `src/data/offers.ts` | Deals cards. Only set `badge`/`source` on real, announced offers. |
| `src/data/images.ts` | Hero and section imagery (Unsplash) plus the store's own photos in `public/images/store/`. |

## Verified business information

Everything in `business.ts` was taken on 19 Sep 2026 from the store's Google Business listing
(<https://share.google/j1rMSVKTXKjWEZIcG>) and the profiles it links to:

- Name and category: Mantan Supermart, gourmet grocery store
- Address, phone (098118 76521), hours (8 am–10 pm daily), delivery hours (9 am–9 pm daily)
- Rating 4.4 from 195 Google reviews (shown in the UI; deliberately left out of the JSON-LD because Google ignores self-published ratings)
- WhatsApp +91 99996 67962 (the listing's "Order online" button), order lines 99996 67952 / 99996 67962
- Owner description: 20,000 sq ft, wide aisles, free parking, 300 m from Sultanpur Metro, free home delivery in a limited area, gift hampers
- Instagram `@mantan_super_mart`, Facebook `/mantanfoodhub`
- The listed website `mantansupermart.com` did not resolve at the time of writing; it is stored but not linked in the UI.

## Ordering

There is no payment flow. The cart (persisted in `localStorage`) builds a WhatsApp message on **Place order**
and opens `wa.me` with it; the store confirms availability and the final bill. The contact form works the same way.
If `business.whatsapp` is removed, both fall back to "call to order" / "copy the message".

## SEO

Static title, description and Open Graph tags are in `index.html`. `LocalBusiness` (`GroceryStore`) JSON-LD is generated
from `business.ts` at runtime (`src/lib/seo.ts`). Add a `<link rel="canonical">` in `index.html` once the final domain is known.
