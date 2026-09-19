import { ExternalLink, Star } from 'lucide-react'
import { GoogleIcon } from '@/components/icons'
import { Reveal } from '@/components/Reveal'
import { business } from '@/data/business'

export function GoogleReviews() {
  if (!business.rating || !business.reviewCount) return null
  const full = Math.floor(business.rating)
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600">
            <GoogleIcon className="size-5" /> Rating on Google
          </p>
          <p className="mt-3 font-display text-7xl leading-none font-extrabold tabular">{business.rating.toFixed(1)}</p>
          <div className="mt-3 flex gap-0.5" aria-label={`${business.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={i < full ? 'size-5 fill-mango-500 text-mango-500' : 'size-5 fill-mango-200 text-mango-200'} />
            ))}
          </div>
          <p className="mt-2 text-sm text-ink-600">From {business.reviewCount} reviews</p>
          <a
            href={business.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900"
          >
            Read reviews on Google <ExternalLink className="size-4" />
          </a>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">“{business.googleReviewSummary}”</p>
          <p className="mt-2 text-xs text-ink-400">Summary of reviews as shown on the Google listing.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {business.googleReviewSnippets.map((q, i) => (
              <Reveal key={q} delay={i * 0.06}>
                <li className="h-full rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-ink-700">“{q}”</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
