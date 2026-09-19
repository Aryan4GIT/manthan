import { ArrowRight, Check, Copy, MessageCircle, Phone, ShoppingBasket, Store, Truck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import { FieldError, Input, Label, Textarea } from '@/components/ui/input'
import { business } from '@/data/business'
import { catalogue } from '@/data/products'
import { buildOrderMessage, formatINR, normalisePhone, telHref, waHref } from '@/lib/format'
import { hoursRange } from '@/lib/hours'
import { usePageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'

type Fulfilment = 'pickup' | 'delivery'
type Errors = Partial<Record<'name' | 'phone' | 'address', string>>

/**
 * No payment is taken here. The order is sent to the store on WhatsApp
 * (verified from the Google listing) and confirmed by the store.
 */
export function Checkout() {
  usePageMeta('Place order')
  const { lines, count, subtotal } = useCart()
  const canDeliver = Boolean(business.hours.delivery)
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [fulfilment, setFulfilment] = useState<Fulfilment>(canDeliver ? 'delivery' : 'pickup')
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)
  const orderPhone = business.orderPhones[0] ?? { number: business.phone, display: business.phoneDisplay }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!normalisePhone(form.phone)) next.phone = 'Enter a 10-digit Indian mobile number.'
    if (fulfilment === 'delivery' && form.address.trim().length < 10) next.address = 'Enter the full delivery address, including a landmark.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const message = () =>
    buildOrderMessage({
      lines,
      total: subtotal,
      name: form.name.trim(),
      phone: normalisePhone(form.phone) ?? form.phone,
      fulfilment,
      address: form.address.trim() || undefined,
      notes: form.notes.trim() || undefined,
    })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const href = waHref(message())
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }

  const copy = async () => {
    if (!validate()) return
    try {
      await navigator.clipboard.writeText(message())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: shopper can still read the summary */
    }
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHero title="Place order" />
        <section className="container-x pb-8">
          <div className="card rounded-[2rem] px-6 py-16 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <ShoppingBasket className="size-8" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Add something to your cart first</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-600">Then come back here to send the order to the store.</p>
            <Button className="mt-6" size="lg" asChild>
              <Link to="/shop">
                Browse the shop <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="Place order"
        lead={
          business.whatsapp
            ? 'Tell us who you are and how you want it. The order opens in WhatsApp, ready to send; the store confirms availability and the final bill.'
            : `Tell us who you are and how you want it, then call ${orderPhone.display} to place the order.`
        }
      />
      <section className="container-x pb-8">
        <form onSubmit={submit} noValidate className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="grid gap-6">
            <div className="card rounded-[2rem] p-6 sm:p-8">
              <h2 className="text-xl font-bold">Your details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="o-name">Name</Label>
                  <Input id="o-name" name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} placeholder="Your name" />
                  <FieldError>{errors.name}</FieldError>
                </div>
                <div>
                  <Label htmlFor="o-phone">Phone</Label>
                  <Input id="o-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} aria-invalid={Boolean(errors.phone)} placeholder="10-digit mobile number" />
                  <FieldError>{errors.phone}</FieldError>
                </div>
              </div>
            </div>

            <fieldset className="card rounded-[2rem] p-6 sm:p-8">
              <legend className="text-xl font-bold">How would you like it?</legend>
              <div className={cn('mt-5 grid gap-3', canDeliver && 'sm:grid-cols-2')}>
                {canDeliver && (
                  <label
                    className={cn(
                      'flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition-colors',
                      fulfilment === 'delivery' ? 'border-brand-600 bg-brand-50' : 'border-line hover:border-brand-200',
                    )}
                  >
                    <input type="radio" name="fulfilment" value="delivery" className="sr-only" checked={fulfilment === 'delivery'} onChange={() => setFulfilment('delivery')} />
                    <span className="shine flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                      <Truck className="size-5" />
                    </span>
                    <span>
                      <span className="block font-bold">Home delivery</span>
                      <span className="block text-sm text-ink-600">Free in a limited area, {hoursRange(business.hours.delivery!)}. The store confirms your address.</span>
                    </span>
                  </label>
                )}
                <label
                  className={cn(
                    'flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition-colors',
                    fulfilment === 'pickup' ? 'border-brand-600 bg-brand-50' : 'border-line hover:border-brand-200',
                  )}
                >
                  <input type="radio" name="fulfilment" value="pickup" className="sr-only" checked={fulfilment === 'pickup'} onChange={() => setFulfilment('pickup')} />
                  <span className="shine flex size-10 shrink-0 items-center justify-center rounded-xl bg-mango-500 text-ink-900">
                    <Store className="size-5" />
                  </span>
                  <span>
                    <span className="block font-bold">Pick up in store</span>
                    <span className="block text-sm text-ink-600">The Gallery on MG, {hoursRange(business.hours.store)} every day.</span>
                  </span>
                </label>
              </div>

              {fulfilment === 'delivery' && (
                <div className="mt-5">
                  <Label htmlFor="o-address">Delivery address</Label>
                  <Textarea id="o-address" name="address" autoComplete="street-address" value={form.address} onChange={set('address')} aria-invalid={Boolean(errors.address)} placeholder="House or flat, building, street, landmark, area" />
                  <FieldError>{errors.address}</FieldError>
                </div>
              )}
              <div className="mt-5">
                <Label htmlFor="o-notes">Notes for the store (optional)</Label>
                <Input id="o-notes" name="notes" value={form.notes} onChange={set('notes')} placeholder="Preferred time, brand preferences, anything else" />
              </div>
            </fieldset>
          </div>

          <aside className="card rounded-[2rem] p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Order summary</h2>
            <ul className="mt-4 max-h-72 divide-y divide-line/70 overflow-y-auto text-sm">
              {lines.map((l) => (
                <li key={l.product.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{l.product.name}</span>
                    <span className="block text-xs text-ink-600">
                      {l.product.unit} × {l.qty}
                    </span>
                  </span>
                  <span className="font-bold tabular">{formatINR(l.product.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <span className="font-bold">Total ({count} {count === 1 ? 'item' : 'items'})</span>
              <span className="text-2xl font-bold tabular">{formatINR(subtotal)}</span>
            </div>
            {catalogue.isDemo && <p className="mt-2 text-xs text-ink-400">{catalogue.notice}</p>}

            <div className="mt-5 grid gap-2">
              {business.whatsapp ? (
                <Button type="submit" variant="whatsapp" size="lg">
                  <MessageCircle /> Send order on WhatsApp
                </Button>
              ) : (
                <Button type="button" size="lg" onClick={copy}>
                  {copied ? <Check /> : <Copy />} {copied ? 'Order copied' : 'Copy order details'}
                </Button>
              )}
              <Button type="button" variant="outline" size="lg" asChild>
                <a href={telHref(orderPhone.number)}>
                  <Phone /> Call {orderPhone.display} to order
                </a>
              </Button>
              {business.whatsapp && (
                <Button type="button" variant="ghost" size="sm" onClick={copy}>
                  {copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy order details instead'}
                </Button>
              )}
            </div>
            <p className="mt-3 text-xs text-ink-400">No payment is taken online. Pay at the store or on delivery.</p>
            <Link to="/cart" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900">
              Edit cart
            </Link>
          </aside>
        </form>
      </section>
    </>
  )
}
