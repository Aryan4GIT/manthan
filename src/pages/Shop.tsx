import { Info, Search, X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { NoProducts, ProductGrid } from '@/components/shop/ProductGrid'
import { searchProducts } from '@/components/shop/search'
import { categories, categoryBySlug } from '@/data/categories'
import { catalogue, products } from '@/data/products'
import { usePageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'

export function Shop() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const activeCategory = categoryBySlug[category]

  usePageMeta(
    activeCategory ? `${activeCategory.name}` : 'Shop',
    `Browse ${activeCategory ? activeCategory.name.toLowerCase() : 'groceries, household essentials and daily needs'} at Mantan Supermart, Sultanpur, New Delhi. Add to cart and order on WhatsApp.`,
  )

  const update = (next: { q?: string; category?: string }) => {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v)
      else p.delete(k)
    }
    setParams(p, { replace: true })
  }

  const results = useMemo(() => {
    const base = activeCategory ? products.filter((p) => p.category === activeCategory.slug) : products
    return searchProducts(q, base)
  }, [q, activeCategory])

  return (
    <>
      <PageHero
        title={activeCategory ? activeCategory.name : 'Shop'}
        lead={activeCategory ? activeCategory.blurb : 'Search the catalogue, add to your cart and send the order on WhatsApp.'}
      >
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="glass-lite flex h-14 max-w-xl items-center gap-3 rounded-2xl px-4 sm:glass"
        >
          <Search className="size-5 shrink-0 text-ink-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search products or categories"
            aria-label="Search products"
            className="h-full w-full bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400 [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <button type="button" onClick={() => update({ q: '' })} aria-label="Clear search" className="flex size-8 items-center justify-center rounded-full text-ink-600 hover:bg-white">
              <X className="size-4" />
            </button>
          )}
        </form>
      </PageHero>

      <section className="container-x pb-8">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => update({ category: '' })}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              !activeCategory ? 'bg-brand-700 text-white' : 'border border-line bg-white text-ink-700 hover:border-brand-300',
            )}
            aria-pressed={!activeCategory}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => update({ category: c.slug === category ? '' : c.slug })}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                c.slug === category ? 'bg-brand-700 text-white' : 'border border-line bg-white text-ink-700 hover:border-brand-300',
              )}
              aria-pressed={c.slug === category}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-600" aria-live="polite">
            {results.length === 0 ? 'No results' : `${results.length} ${results.length === 1 ? 'product' : 'products'}`}
            {q && (
              <>
                {' '}
                for <span className="font-semibold text-ink-900">“{q}”</span>
              </>
            )}
          </p>
          {catalogue.isDemo && (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-mango-50 px-3 py-1.5 text-xs font-semibold text-mango-700">
              <Info className="size-3.5" /> {catalogue.notice}
            </p>
          )}
        </div>

        <div className="mt-6">
          {results.length > 0 ? <ProductGrid products={results} /> : <NoProducts query={q} onReset={q ? () => update({ q: '', category: '' }) : undefined} />}
        </div>
      </section>
    </>
  )
}
