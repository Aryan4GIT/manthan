import { X } from 'lucide-react'
import { QtyStepper } from '@/components/shop/QtyStepper'
import { formatINR } from '@/lib/format'
import { useCart, type CartLine } from '@/store/cart'

export function CartLineItem({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const { setQty, remove } = useCart()
  const { product, qty } = line
  return (
    <li className="flex gap-3 py-4">
      <img src={product.image} alt="" width={80} height={80} className={compact ? 'size-16 shrink-0 rounded-xl object-cover' : 'size-20 shrink-0 rounded-xl object-cover'} loading="lazy" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-bold text-ink-900">{product.name}</p>
            <p className="text-xs text-ink-600">
              {product.unit} · {formatINR(product.price)} each
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(product.id)}
            className="-mt-1 -mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-brand-50 hover:text-ink-900"
            aria-label={`Remove ${product.name} from cart`}
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <QtyStepper qty={qty} onChange={(n) => setQty(product.id, n)} size="sm" name={product.name} />
          <p className="font-extrabold text-ink-900 tabular">{formatINR(product.price * qty)}</p>
        </div>
      </div>
    </li>
  )
}
