import { Menu, MessageCircle, Navigation, Phone, Search, ShoppingBasket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CartSheet } from '@/components/cart/CartSheet'
import { Logo } from '@/components/Logo'
import { SearchDialog } from '@/components/shop/SearchDialog'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { business } from '@/data/business'
import { telHref, waHref } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { navLinks } from './nav-links'

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

const orderHref = waHref(`Hello ${business.name}, I would like to place an order.`)

export function Navbar() {
  const scrolled = useScrolled()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setCartOpen(false)
  }, [pathname])

  return (
    <header className={cn('sticky top-0 z-50 transition-[padding] duration-300', scrolled ? 'pt-2' : 'pt-3 sm:pt-4')}>
      <div className="container-x">
        <div
          className={cn(
            'glass flex items-center justify-between gap-2 rounded-2xl px-2.5 transition-all duration-300 sm:gap-3 sm:px-4',
            scrolled ? 'h-14 shadow-lift' : 'h-15 sm:h-[4.5rem]',
          )}
        >
          <Logo className="shrink-0" />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                    isActive ? 'bg-brand-700 text-white shadow-[0_6px_16px_-6px_rgb(11_107_58/0.6)]' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-800',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-2">
            <Button variant="ghost" size="icon" className="size-10 sm:size-11" aria-label="Search products" onClick={() => setSearchOpen(true)}>
              <Search />
            </Button>
            <Button variant="ghost" size="icon" className="relative size-10 sm:size-11" aria-label={count === 1 ? 'Cart, 1 item' : `Cart, ${count} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBasket />
              {count > 0 && (
                <span className="shine absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango-500 px-1 text-[11px] font-bold text-ink-900 tabular">
                  {count}
                </span>
              )}
            </Button>
            {orderHref && (
              <Button variant="accent" className="hidden md:inline-flex" asChild>
                <a href={orderHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Order now
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="size-10 sm:size-11 lg:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu />
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="p-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation and quick contact actions</SheetDescription>
          <Logo />
          <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-lg font-semibold transition-colors',
                    isActive ? 'bg-brand-700 text-white' : 'text-ink-800 hover:bg-brand-50',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto grid gap-2 pt-8">
            {orderHref && (
              <Button variant="whatsapp" size="lg" asChild>
                <a href={orderHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Order on WhatsApp
                </a>
              </Button>
            )}
            <Button variant="outline" size="lg" asChild>
              <a href={telHref(business.phone)}>
                <Phone /> Call {business.phoneDisplay}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation /> Get directions
              </a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
