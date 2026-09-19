import { images } from '@/data/images'

const photos = [images.store.fresh, images.store.exoticAisle, images.store.snacks, images.store.noodles, images.store.gifting]

/** A strip of the store's own photos from its Google listing. */
export function StorePhotos() {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 scroll-pl-4 sm:-mx-6 sm:px-6 sm:scroll-pl-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:px-0">
      {photos.map((p) => (
        <li key={p.src} className="w-56 shrink-0 snap-start lg:w-auto">
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            width={294}
            height={220}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card ring-1 ring-brand-900/5"
          />
        </li>
      ))}
    </ul>
  )
}
