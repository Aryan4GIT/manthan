import { House, LayoutGrid, MessageCircle, Phone, ShoppingBasket, Store } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { WhatsAppIcon } from '@/components/icons'
import { business } from '@/data/business'
import { formatINR, telHref, waHref } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'

const wa = waHref(`Hello ${business.name}, I would like to place an order.`)

const tabs = [
  { to: '/', label: 'Home', Icon: House },
  { to: '/shop', label: 'Shop', Icon: Store },
  { to: '/categories', label: 'Categories', Icon: LayoutGrid },
  { to: '/cart', label: 'Cart', Icon: ShoppingBasket },
]

/** Sticky bottom navigation, phones only. */
export function MobileBottomNav() {
  const { count } = useCart()
  return (
    <nav
      aria-label="Bottom"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-white/70 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn('relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold', isActive ? 'text-brand-700' : 'text-ink-600')
              }
            >
              <Icon className="size-5" />
              {label}
              {to === '/cart' && count > 0 && (
                <span className="shine absolute top-2 right-1/2 -mr-6 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-mango-500 px-1 text-[10px] font-bold text-ink-900 tabular">
                  {count}
                </span>
              )}
            </NavLink>
          </li>
        ))}
        <li>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold text-whatsapp-dark">
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          ) : (
            <a href={telHref(business.phone)} className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold text-ink-600">
              <Phone className="size-5" />
              Call
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}

/** Sticky "view cart" bar shown above the bottom nav when the cart has items. */
export function StickyCartBar() {
  const { count, subtotal } = useCart()
  const { pathname } = useLocation()
  if (count === 0 || pathname === '/cart' || pathname === '/checkout') return null
  return (
    <div className="fixed inset-x-3 bottom-[calc(4rem+env(safe-area-inset-bottom)+0.5rem)] z-40 md:hidden">
      <Link
        to="/cart"
        className="shine flex items-center justify-between rounded-2xl bg-brand-700 px-4 py-3 text-white shadow-lift transition-transform active:scale-[0.99]"
      >
        <span className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-sm font-bold tabular">{count}</span>
          <span className="text-sm font-semibold">
            {count === 1 ? '1 item' : `${count} items`} in your cart
          </span>
        </span>
        <span className="text-sm font-bold tabular">
          {formatINR(subtotal)} <span className="ml-1 font-semibold text-white/80">View</span>
        </span>
      </Link>
    </div>
  )
}

/**
 * Floating WhatsApp button, desktop only (phones have it in the bottom nav).
 * Hidden on pages that already lead with a WhatsApp action.
 */
export function FloatingWhatsApp() {
  const { pathname } = useLocation()
  if (!wa || pathname === '/checkout' || pathname === '/contact') return null
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="shine fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.7)] transition-transform hover:-translate-y-1 hover:bg-whatsapp-dark md:flex"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
