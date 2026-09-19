import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon } from '@/components/icons'
import { Logo } from '@/components/Logo'
import { business, fullAddress } from '@/data/business'
import { telHref, waHref } from '@/lib/format'
import { hoursRange } from '@/lib/hours'
import { navLinks } from './nav-links'

const linkClass = 'inline-flex items-center gap-2 py-1 text-white/75 transition-colors hover:text-white'

export function Footer() {
  const wa = waHref()
  return (
    <footer className="grain relative mt-20 overflow-hidden bg-brand-900 pb-[calc(8rem+env(safe-area-inset-bottom))] text-white sm:mt-24 md:pb-0">
      <div className="glow-band pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
        <div>
          <Logo light className="text-white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{business.tagline}</p>
          <p className="mt-2 text-sm text-white/60">{business.category}</p>
          {business.social && (
            <div className="mt-5 flex gap-2">
              {business.social.instagram && (
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="glass-dark inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/20">
                  <InstagramIcon className="size-5" />
                </a>
              )}
              {business.social.facebook && (
                <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="glass-dark inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/20">
                  <FacebookIcon className="size-5" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Quick links</h3>
          <ul className="mt-3 space-y-1 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Customer support</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href={telHref(business.phone)} className={linkClass}>
                <Phone className="size-4" /> Call {business.phoneDisplay}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <MessageCircle className="size-4" /> WhatsApp {business.whatsappDisplay}
                </a>
              </li>
            )}
            <li>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Navigation className="size-4" /> Get directions
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Store information</h3>
          <address className="mt-4 flex gap-2 text-sm not-italic leading-relaxed text-white/75">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{fullAddress}</span>
          </address>
          <dl className="mt-4 space-y-1.5 text-sm text-white/75">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-white/50">Store</dt>
              <dd>
                {hoursRange(business.hours.store)}, {business.hours.store.days}
              </dd>
            </div>
            {business.hours.delivery && (
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-white/50">Delivery</dt>
                <dd>
                  {hoursRange(business.hours.delivery)}, {business.hours.delivery.days}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <a href={business.googleShareUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            Find us on Google
          </a>
        </div>
      </div>
    </footer>
  )
}
