import { Clock, MessageCircle, Navigation, Phone, type LucideIcon } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { LocationSection } from '@/components/home/LocationSection'
import { PageHero } from '@/components/PageHero'
import { business } from '@/data/business'
import { telHref, waHref } from '@/lib/format'
import { hoursRange, openStatus } from '@/lib/hours'
import { usePageMeta } from '@/lib/seo'

interface Card {
  Icon: LucideIcon
  title: string
  detail: string
  href?: string
  external?: boolean
  tone: string
}

export function Contact() {
  usePageMeta('Contact', `Call ${business.phoneDisplay}, WhatsApp, or get directions to Mantan Supermart at The Gallery on MG Mall, Sultanpur, New Delhi. Open ${hoursRange(business.hours.store)} every day.`)
  const status = openStatus()
  const wa = waHref()
  const cards: Card[] = [
    { Icon: Phone, title: 'Call us', detail: business.phoneDisplay, href: telHref(business.phone), tone: 'bg-brand-700 text-white' },
    ...(wa ? [{ Icon: MessageCircle, title: 'WhatsApp', detail: business.whatsappDisplay ?? 'Chat with the store', href: wa, external: true, tone: 'bg-whatsapp text-white' } satisfies Card] : []),
    { Icon: Navigation, title: 'Get directions', detail: 'The Gallery on MG, Sultanpur', href: business.directionsUrl, external: true, tone: 'bg-mango-500 text-ink-900' },
    { Icon: Clock, title: 'Store hours', detail: `${hoursRange(business.hours.store)}, ${status.label.toLowerCase()}`, tone: 'bg-brand-100 text-brand-800' },
  ]

  return (
    <>
      <PageHero title="Contact" lead="Call, message or drop by. For orders, WhatsApp is the fastest way to reach the store." />
      <section className="container-x pb-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, detail, href, external, tone }) => {
            const inner = (
              <>
                <span className={`shine flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{title}</span>
                  <span className="block truncate text-sm text-ink-600">{detail}</span>
                </span>
              </>
            )
            const cls = 'card flex h-full items-center gap-3.5 rounded-2xl p-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lift'
            return (
              <li key={title}>
                {href ? (
                  <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold">Order or ask a question</h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Send your shopping list, ask whether something is in stock, or check delivery to your address. The store replies during opening
              hours, {hoursRange(business.hours.store)} every day.
            </p>
            {business.hours.delivery && (
              <p className="mt-3 leading-relaxed text-ink-600">
                Free home delivery runs {hoursRange(business.hours.delivery)} in a limited area around the store.
              </p>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
      <LocationSection heading={false} />
    </>
  )
}

