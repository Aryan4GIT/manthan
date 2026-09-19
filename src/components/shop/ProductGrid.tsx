import { SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/categories'
import type { Product } from '@/data/products'
import { cn } from '@/lib/utils'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4', className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}

export function NoProducts({ query, onReset }: { query?: string; onReset?: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-200 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <SearchX className="size-7" />
      </div>
      <h3 className="mt-4 text-2xl font-bold">No products found</h3>
      <p className="mx-auto mt-2 max-w-md text-ink-600">
        {query ? (
          <>
            Nothing matched <span className="font-semibold text-ink-900">“{query}”</span>. Try a different word, or browse a category below.
          </>
        ) : (
          'Nothing in this category yet. Browse another category below.'
        )}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.slice(0, 6).map((c) => (
          <Link key={c.slug} to={`/shop?category=${c.slug}`} className="rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-800">
            {c.name}
          </Link>
        ))}
      </div>
      {onReset && (
        <Button variant="ghost" className="mt-4" onClick={onReset}>
          Clear search
        </Button>
      )}
    </div>
  )
}
