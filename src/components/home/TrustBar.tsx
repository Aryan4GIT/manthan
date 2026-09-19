import { Clock, ShoppingBasket, Star, Truck, type LucideIcon } from 'lucide-react'
import { business } from '@/data/business'
import { hoursRange, openStatus } from '@/lib/hours'
import { cn } from '@/lib/utils'

interface Card {
  Icon: LucideIcon
  iconClass: string
  title: string
  detail: string
  href?: string
}

export function TrustBar() {
  const status = openStatus()
  const cards: Card[] = []

  if (business.rating && business.reviewCount) {
    cards.push({
      Icon: Star,
      iconClass: 'bg-mango-500 text-ink-900',
      title: `${business.rating.toFixed(1)} out of 5 on Google`,
      detail: `${business.reviewCount} reviews from shoppers`,
      href: business.googleShareUrl,
    })
  }
  cards.push({
    Icon: Clock,
    iconClass: status.open ? 'bg-brand-500 text-white' : 'bg-white/20 text-white',
    title: status.open ? `Open now, ${status.detail.toLowerCase()}` : `Closed now, ${status.detail.toLowerCase()}`,
    detail: `${hoursRange(business.hours.store)}, ${business.hours.store.days}`,
  })
  cards.push({
    Icon: ShoppingBasket,
    iconClass: 'bg-fresh text-brand-900',
    title: '20,000 sq ft of shopping',
    detail: 'Indian and international brands, wide aisles',
  })
  if (business.hours.delivery) {
    cards.push({
      Icon: Truck,
      iconClass: 'bg-white text-brand-800',
      title: 'Free home delivery',
      detail: `${hoursRange(business.hours.delivery)} in a limited area`,
    })
  }

  return (
    <section aria-label="Store highlights" className="relative mt-6 overflow-hidden bg-brand-900 py-8 text-white sm:py-10">
      <div className="glow-band pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ Icon, iconClass, title, detail, href }) => {
          const inner = (
            <>
              <span className={cn('shine flex size-11 shrink-0 items-center justify-center rounded-xl', iconClass)}>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold leading-snug">{title}</span>
                <span className="mt-0.5 block text-sm text-white/70">{detail}</span>
              </span>
            </>
          )
          const cls = 'glass-dark flex items-center gap-3.5 rounded-2xl p-4 transition-colors'
          return href ? (
            <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cn(cls, 'hover:bg-white/15')}>
              {inner}
            </a>
          ) : (
            <div key={title} className={cls}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
