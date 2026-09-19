import { MessageCircle, Search, Truck, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { business } from '@/data/business'
import { hoursRange } from '@/lib/hours'

interface Step {
  Icon: LucideIcon
  title: string
  detail: string
}

/** Ordering is a real three-step sequence, so the steps are numbered. */
export function HowItWorks() {
  if (!business.whatsapp) return null
  const steps: Step[] = [
    { Icon: Search, title: 'Browse and add', detail: 'Search the catalogue and add what you need to your cart.' },
    { Icon: MessageCircle, title: 'Send it on WhatsApp', detail: 'Your list opens in WhatsApp, ready to send. The store confirms stock and the bill.' },
    {
      Icon: Truck,
      title: business.hours.delivery ? 'Delivered or ready to collect' : 'Ready to collect',
      detail: business.hours.delivery
        ? `Free delivery in a limited area, ${hoursRange(business.hours.delivery)}, or pick up in store.`
        : `Pick up in store, ${hoursRange(business.hours.store)}.`,
    },
  ]
  return (
    <section className="container-x cv-auto py-14 sm:py-20">
      <div className="grain relative overflow-hidden rounded-[2rem] bg-brand-900 p-6 text-white sm:p-10 lg:p-12">
        <div className="glow-band pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Order from home in three steps</h2>
            <p className="mt-3 text-white/75">No app, no account. Your order goes straight to the store on WhatsApp.</p>
            <Button variant="accent" size="lg" className="mt-6 w-full sm:w-auto" asChild>
              <Link to="/shop">Start an order</Link>
            </Button>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {steps.map(({ Icon, title, detail }, i) => (
              <li key={title} className="glass-dark flex gap-3 rounded-2xl p-4 sm:flex-col sm:gap-4">
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <Icon className="size-5" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-mango-500 font-display text-xs font-extrabold text-ink-900 tabular">
                    {i + 1}
                  </span>
                </span>
                <span>
                  <span className="block font-display text-lg font-bold leading-tight">{title}</span>
                  <span className="mt-1 block text-sm text-white/70">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
