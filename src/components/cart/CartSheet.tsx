import { ArrowRight, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { catalogue } from '@/data/products'
import { formatINR } from '@/lib/format'
import { useCart } from '@/store/cart'
import { CartLineItem } from './CartLineItem'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: Props) {
  const { lines, count, subtotal, clear } = useCart()
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <div className="border-b border-line px-6 pt-6 pb-4">
          <SheetTitle className="font-display text-2xl font-bold">Your cart</SheetTitle>
          <SheetDescription className="text-sm text-ink-600">
            {count === 0 ? 'Nothing added yet.' : `${count} ${count === 1 ? 'item' : 'items'}`}
          </SheetDescription>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <ShoppingBasket className="size-8" />
            </div>
            <p className="mt-4 text-lg font-bold">Your cart is empty</p>
            <p className="mt-1 text-sm text-ink-600">Add a few things from the shop and send the order on WhatsApp.</p>
            <Button className="mt-6" asChild>
              <Link to="/shop" onClick={close}>
                Browse the shop <ArrowRight />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line/70 overflow-y-auto px-6">
              {lines.map((l) => (
                <CartLineItem key={l.product.id} line={l} compact />
              ))}
            </ul>
            <div className="border-t border-line bg-paper px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-600">Subtotal</span>
                <span className="text-xl font-bold tabular">{formatINR(subtotal)}</span>
              </div>
              {catalogue.isDemo && <p className="mt-1 text-xs text-ink-400">{catalogue.notice}</p>}
              <div className="mt-4 grid gap-2">
                <Button size="lg" asChild>
                  <Link to="/checkout" onClick={close}>
                    Place order <ArrowRight />
                  </Link>
                </Button>
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/cart" onClick={close}>
                      View cart
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clear}>
                    Clear cart
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
