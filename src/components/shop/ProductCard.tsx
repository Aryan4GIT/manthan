import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { categoryBySlug } from '@/data/categories'
import { responsive } from '@/data/images'
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
        'card group flex flex-col rounded-2xl p-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:rounded-3xl sm:p-3',
        !product.available && 'opacity-70',
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-brand-50 to-white sm:rounded-2xl">
        <img
          src={product.image}
          srcSet={responsive(product.image, [240, 360, 480, 600])}
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 45vw"
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={600}
          height={600}
          className="size-full object-cover transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-105"
        />
        {off > 0 && (
          <Badge variant="mango" className="absolute top-2 left-2 shadow-[0_4px_12px_-4px_rgb(184_115_10/0.6)]">
            {off}% off
          </Badge>
        )}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <Badge variant="outline">Out of stock</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3 pb-1">
        <p className="text-[11px] font-semibold text-ink-400">{categoryBySlug[product.category]?.name ?? product.category}</p>
        <h3 className="mt-1 font-sans text-[15px] leading-snug font-bold text-ink-900 sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-xs text-ink-600">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-none">
            <p className="text-lg font-bold text-ink-900 tabular sm:text-xl">{formatINR(product.price)}</p>
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
