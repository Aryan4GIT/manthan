/**
 * All external imagery lives here so it can be swapped for the store's own
 * photography in one place. Unsplash photos are free to use under the
 * Unsplash license; the /images/store/* files are the store's own photos.
 */

export const unsplash = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ''}`

/**
 * Builds a `srcSet` for an Unsplash URL so phones download a 320–640px
 * file instead of the desktop size. Returns undefined for any other host,
 * so the store's own images keep working untouched.
 */
export function responsive(url: string, widths = [320, 480, 640, 960, 1280]) {
  let u: URL
  try {
    u = new URL(url)
  } catch {
    return undefined
  }
  if (!u.hostname.endsWith('unsplash.com')) return undefined
  const w = Number(u.searchParams.get('w')) || 1200
  const h = Number(u.searchParams.get('h')) || 0
  return widths
    .filter((x) => x <= w)
    .map((x) => {
      const c = new URL(u)
      c.searchParams.set('w', String(x))
      if (h) c.searchParams.set('h', String(Math.round((x * h) / w)))
      return `${c} ${x}w`
    })
    .join(', ')
}

export const images = {
  hero: {
    main: unsplash('1542838132-92c53300491e', 1400, 1120),
    tile: unsplash('1578916171728-46686eac8d58', 720, 520),
  },
  aisle: unsplash('1583258292688-d0213dc5a3a8', 1200, 1500),
  deliveryBag: unsplash('1573246123716-6b1782bfc499', 900, 700),
  /** Photos from the store's own Google listing (small, used as tiles). */
  store: {
    exoticAisle: { src: '/images/store/aisle-exotic-foods.jpg', alt: 'The Exotic Foods aisle inside Mantan Supermart' },
    snacks: { src: '/images/store/aisle-snacks.jpg', alt: 'Snack shelves inside Mantan Supermart' },
    noodles: { src: '/images/store/international-noodles.jpg', alt: 'International noodles and instant food shelf' },
    fresh: { src: '/images/store/fresh-produce.jpg', alt: 'The Fresh section with crates of vegetables' },
    gifting: { src: '/images/store/gifting-shelves.jpg', alt: 'Gifting and serveware display shelves' },
  },
}
