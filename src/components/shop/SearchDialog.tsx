import { ArrowRight, Plus, Search, SearchX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { categories, categoryBySlug } from '@/data/categories'
import { formatINR } from '@/lib/format'
import { useCart } from '@/store/cart'
import { QtyStepper } from './QtyStepper'
import { searchProducts } from './search'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { qtyOf, add, setQty } = useCart()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query])
  const hasQuery = query.trim().length > 0

  const goToShop = () => {
    onOpenChange(false)
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <DialogDescription className="sr-only">Search by product name or category</DialogDescription>
        <form
          className="flex items-center gap-3 border-b border-line px-5"
          onSubmit={(e) => {
            e.preventDefault()
            if (hasQuery) goToShop()
          }}
        >
          <Search className="size-5 shrink-0 text-ink-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or categories"
            aria-label="Search products or categories"
            className="h-16 w-full bg-transparent pr-10 text-lg text-ink-900 outline-none placeholder:text-ink-400"
          />
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!hasQuery && (
            <div className="p-2">
              <p className="px-1 text-xs font-semibold text-ink-400">Browse a category</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-800"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasQuery && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <SearchX className="size-6" />
              </div>
              <p className="mt-3 font-bold">No products found</p>
              <p className="mt-1 text-sm text-ink-600">Try a different word, or pick a category.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {categories.slice(0, 5).map((c) => (
                  <Link key={c.slug} to={`/shop?category=${c.slug}`} onClick={() => onOpenChange(false)} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-100">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-line/70">
              {results.map((p) => {
                const qty = qtyOf(p.id)
                return (
                  <li key={p.id} className="flex items-center gap-3 py-2.5 pr-1 pl-1">
                    <img src={p.image} alt="" width={56} height={56} className="size-14 shrink-0 rounded-xl object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-ink-900">{p.name}</p>
                      <p className="text-xs text-ink-600">
                        {p.unit} · {categoryBySlug[p.category]?.name}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-brand-800 tabular">{formatINR(p.price)}</p>
                    </div>
                    {qty > 0 ? (
                      <QtyStepper qty={qty} onChange={(n) => setQty(p.id, n)} size="sm" name={p.name} />
                    ) : (
                      <Button size="sm" onClick={() => add(p.id)} disabled={!p.available} aria-label={`Add ${p.name} to cart`}>
                        <Plus /> Add
                      </Button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {hasQuery && results.length > 0 && (
          <div className="border-t border-line p-3">
            <Button variant="ghost" className="w-full" onClick={goToShop}>
              See all results for “{query.trim()}” <ArrowRight />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
