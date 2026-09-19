import { MessageCircle, Truck } from 'lucide-react'
import { business } from '@/data/business'
import { waHref } from '@/lib/format'
import { hoursRange } from '@/lib/hours'

/** Slim strip above the navbar with the one fact most shoppers want first. */
export function AnnouncementBar() {
  const delivery = business.hours.delivery
  if (!delivery) return null
  const wa = waHref(`Hello ${business.name}, I would like to place an order.`)
  return (
    <div className="bg-brand-900 text-white">
      <div className="container-x flex h-9 items-center justify-center gap-3 text-xs font-medium sm:justify-between sm:text-sm">
        <p className="flex min-w-0 items-center gap-2">
          <Truck className="size-4 shrink-0 text-mango-400" />
          <span className="truncate">Free home delivery, {hoursRange(delivery)} in a limited area</span>
        </p>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 font-semibold text-mango-400 hover:text-mango-200 sm:inline-flex">
            <MessageCircle className="size-4" /> Order on WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
