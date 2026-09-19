import { ArrowRight, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import { catalogue } from '@/data/products'
import { formatINR } from '@/lib/format'
import { usePageMeta } from '@/lib/seo'
import { useCart } from '@/store/cart'

export function Cart() {
  usePageMeta('Cart')
  const { lines, count, subtotal, clear } = useCart()

  return (
    <>
      <PageHero title="Your cart" lead={count === 0 ? 'Nothing added yet.' : `${count} ${count === 1 ? 'item' : 'items'}, ready to order on WhatsApp.`} />
      <section className="container-x pb-8">
        {lines.length === 0 ? (
          <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-card">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <ShoppingBasket className="size-8" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-600">Add products from the shop. Your cart is saved on this device until you order.</p>
            <Button className="mt-6" size="lg" asChild>
              <Link to="/shop">
                Browse the shop <ArrowRight />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div className="rounded-[2rem] bg-white px-6 shadow-card">
              <ul className="divide-y divide-line/70">
                {lines.map((l) => (
                  <CartLineItem key={l.product.id} line={l} />
                ))}
              </ul>
              <div className="flex justify-end border-t border-line py-3">
                <Button variant="ghost" size="sm" onClick={clear}>
                  Clear cart
                </Button>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-white p-6 shadow-card lg:sticky lg:top-24">
              <h2 className="text-xl font-bold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-600">Items</dt>
                  <dd className="font-semibold tabular">{count}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                  <dt className="font-bold">Subtotal</dt>
                  <dd className="text-xl font-extrabold tabular">{formatINR(subtotal)}</dd>
                </div>
              </dl>
              {catalogue.isDemo && <p className="mt-3 text-xs text-ink-400">{catalogue.notice}</p>}
              <Button size="lg" className="mt-5 w-full" asChild>
                <Link to="/checkout">
                  Place order <ArrowRight />
                </Link>
              </Button>
              <Button variant="ghost" className="mt-2 w-full" asChild>
                <Link to="/shop">Add more items</Link>
              </Button>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
