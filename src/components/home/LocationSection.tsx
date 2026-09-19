import { Clock, MapPin, MessageCircle, Navigation, Phone, TrainFront, Truck } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { business } from '@/data/business'
import { telHref, waHref } from '@/lib/format'
import { hoursRange, openStatus } from '@/lib/hours'
import { cn } from '@/lib/utils'

export function LocationSection({ heading = true }: { heading?: boolean }) {
  const status = openStatus()
  const wa = waHref()
  return (
    <section id="location" className="container-x cv-auto py-14 sm:py-24">
      {heading && (
        <SectionHeading
          title="Find us on MG Road"
          lead={`${business.landmarks[0]}, inside The Gallery on MG, with free parking for your vehicle.`}
        />
      )}
      <div className={cn('grid gap-6 lg:grid-cols-[1.2fr_1fr]', heading && 'mt-10')}>
        <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-brand-100 shadow-card lg:min-h-[32rem]">
          <iframe
            title={`Map showing ${business.name}`}
            src={business.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>

        <div className="card flex flex-col rounded-[2rem] p-6 sm:p-8">
          <h3 className="text-2xl font-bold">{business.name}</h3>
          <p className="mt-1 text-sm text-ink-600">{business.category}</p>

          <dl className="mt-6 space-y-5">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-700" />
              <div>
                <dt className="sr-only">Address</dt>
                <dd className="leading-relaxed text-ink-700">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                  <br />
                  {business.address.locality}, {business.address.city} {business.address.postalCode}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <TrainFront className="mt-0.5 size-5 shrink-0 text-brand-700" />
              <div>
                <dt className="sr-only">Nearby</dt>
                <dd className="text-ink-700">{business.landmarks.join('. ')}.</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-700" />
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={telHref(business.phone)} className="font-semibold text-ink-900 hover:text-brand-700">
                    {business.phoneDisplay}
                  </a>
                  {business.orderPhones.length > 0 && (
                    <p className="mt-0.5 text-sm text-ink-600">
                      Orders and delivery:{' '}
                      {business.orderPhones.map((p, i) => (
                        <span key={p.number}>
                          {i > 0 && ' / '}
                          <a href={telHref(p.number)} className="font-semibold hover:text-brand-700">
                            {p.display}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-700" />
              <div>
                <dt className="sr-only">Hours</dt>
                <dd className="text-ink-700">
                  <span className={cn('font-bold', status.open ? 'text-brand-700' : 'text-ink-900')}>{status.label}</span>, {status.detail.toLowerCase()}
                  <br />
                  {hoursRange(business.hours.store)}, {business.hours.store.days}
                </dd>
              </div>
            </div>
            {business.hours.delivery && (
              <div className="flex gap-3">
                <Truck className="mt-0.5 size-5 shrink-0 text-brand-700" />
                <div>
                  <dt className="sr-only">Delivery</dt>
                  <dd className="text-ink-700">Free home delivery {hoursRange(business.hours.delivery)}, in a limited area</dd>
                </div>
              </div>
            )}
          </dl>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            <Button size="lg" asChild>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation /> Get directions
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={telHref(business.phone)}>
                <Phone /> Call now
              </a>
            </Button>
            {wa && (
              <Button size="lg" variant="whatsapp" className="sm:col-span-2" asChild>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
