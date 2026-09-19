import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { categoryBySlug } from '@/data/categories'
import type { Product } from '@/data/products'
import { discountPercent, formatINR } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { QtyStepper } from './QtyStepper'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { qtyOf, add, setQty } = useCart()
  const qty = qtyOf(product.id)
  const off = discountPercent(product)

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.45, delay: Math.min(index % 4, 3) * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        'group flex flex-col rounded-2xl border border-line/80 bg-white p-2.5 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-3',
        !product.available && 'opacity-70',
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={600}
          height={600}
          className="size-full object-cover transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-105"
        />
        {off > 0 && (
          <Badge variant="mango" className="absolute top-2 left-2">
            {off}% off
          </Badge>
        )}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <Badge variant="outline">Out of stock</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3 pb-1">
        <p className="text-[11px] font-semibold text-ink-400">{categoryBySlug[product.category]?.name ?? product.category}</p>
        <h3 className="mt-1 font-sans text-[15px] leading-snug font-bold text-ink-900">{product.name}</h3>
        <p className="mt-0.5 text-xs text-ink-600">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-none">
            <p className="text-lg font-extrabold text-ink-900 tabular">{formatINR(product.price)}</p>
            {product.mrp && product.mrp > product.price && (
              <p className="mt-1 text-xs whitespace-nowrap text-ink-400 tabular">
                MRP <s>{formatINR(product.mrp)}</s>
              </p>
            )}
          </div>
          {qty > 0 ? (
            <QtyStepper qty={qty} onChange={(n) => setQty(product.id, n)} size="sm" name={product.name} />
          ) : (
            <Button size="sm" onClick={() => add(product.id)} disabled={!product.available} aria-label={`Add ${product.name} to cart`}>
              <Plus /> Add
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
