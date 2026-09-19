import { ArrowRight, BadgePercent, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { responsive } from '@/data/images'
import { offers, type Offer } from '@/data/offers'
import { cn } from '@/lib/utils'

function OfferCard({ offer, large }: { offer: Offer; large: boolean }) {
  const to = offer.category ? `/shop?category=${offer.category}` : '/shop'
  return (
    <div
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-3xl shadow-card ring-1 ring-brand-900/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift',
        large ? 'min-h-72 sm:col-span-2 sm:min-h-80' : 'min-h-64',
        offer.tone === 'green' ? 'bg-brand-900' : 'bg-mango-700',
      )}
    >
      <img
        src={offer.image}
        srcSet={responsive(offer.image, [360, 540, 720, 900])}
        sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
        alt=""
        loading="lazy"
        decoding="async"
        width={900}
        height={700}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
      />
      <div
        className={cn(
          'absolute inset-0',
          offer.tone === 'green'
            ? 'bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/10'
            : 'bg-gradient-to-t from-mango-700/90 via-mango-700/35 to-mango-700/5',
        )}
        aria-hidden="true"
      />
      <div className="relative flex flex-1 flex-col justify-end p-5 text-white sm:p-6">
        {offer.badge ? (
          <Badge variant="mango" className="mb-3 w-fit px-3 py-1.5 text-sm">
            <BadgePercent /> {offer.badge}
          </Badge>
        ) : (
          <Badge variant="glass" className="mb-3 w-fit">
            Browse the range
          </Badge>
        )}
        <h3 className={cn('font-bold', large ? 'text-2xl sm:text-3xl' : 'text-xl')}>{offer.title}</h3>
        <p className="mt-1.5 max-w-md text-sm text-white/80">{offer.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to={to} className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
            <span className="rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur transition-colors group-hover:bg-white/25">Shop this</span>
            <ArrowRight className="size-4" />
          </Link>
          {offer.source && (
            <a href={offer.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-white/75 hover:text-white">
              {offer.source.label}, {offer.source.when} <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function DealsGrid({ items = offers }: { items?: Offer[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((o, i) => (
        <Reveal key={o.id} delay={(i % 4) * 0.05} className={cn('flex', Boolean(o.badge) && 'sm:col-span-2')}>
          <OfferCard offer={o} large={Boolean(o.badge)} />
        </Reveal>
      ))}
    </div>
  )
}
