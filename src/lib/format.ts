import { business } from '@/data/business'
import type { Product } from '@/data/products'

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatINR = (amount: number) => inr.format(amount)

export const discountPercent = (p: Pick<Product, 'price' | 'mrp'>) =>
  p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0

export const telHref = (e164: string) => `tel:${e164}`

/** wa.me link; omit `text` for a blank chat. */
export const waHref = (text?: string) =>
  business.whatsapp
    ? `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : undefined

/** 12-hour label from a 24-hour number: 8 -> "8 am", 22 -> "10 pm". */
export const hourLabel = (h: number) => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 || h === 24 ? 'am' : 'pm'}`

/** Indian mobile numbers: 10 digits starting 6-9, optionally prefixed with +91/91/0. */
export const normalisePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits.length === 11 && digits.startsWith('0') ? digits.slice(1) : digits
  return /^[6-9]\d{9}$/.test(local) ? local : null
}

export interface OrderDetails {
  lines: { product: Product; qty: number }[]
  total: number
  name: string
  phone: string
  fulfilment: 'pickup' | 'delivery'
  address?: string
  notes?: string
}

/** The WhatsApp message the shopper sends to place an order. */
export function buildOrderMessage(o: OrderDetails) {
  const items = o.lines.map((l, i) => `${i + 1}. ${l.product.name} (${l.product.unit}) - ${l.qty}`).join('\n')
  const parts = [
    `Hello ${business.name},`,
    '',
    'I would like to place an order:',
    '',
    items,
    '',
    `Total: ${formatINR(o.total)}`,
    '',
    `Name: ${o.name}`,
    `Phone: ${o.phone}`,
    `Order type: ${o.fulfilment === 'delivery' ? 'Home delivery' : 'Store pickup'}`,
  ]
  if (o.fulfilment === 'delivery' && o.address) parts.push(`Address: ${o.address}`)
  if (o.notes) parts.push(`Notes: ${o.notes}`)
  return parts.join('\n')
}

export function buildEnquiryMessage(e: { name: string; phone: string; message: string }) {
  return [`Hello ${business.name},`, '', e.message, '', `Name: ${e.name}`, `Phone: ${e.phone}`].join('\n')
}
