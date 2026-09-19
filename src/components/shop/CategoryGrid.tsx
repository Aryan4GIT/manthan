import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type Category } from '@/data/categories'
import { cn } from '@/lib/utils'

export function CategoryCard({ category, className, showItems = false }: { category: Category; className?: string; showItems?: boolean }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        'group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-brand-900 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <img
        src={category.image}
        alt=""
        loading="lazy"
        decoding="async"
        width={900}
        height={700}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" aria-hidden="true" />
      <div className="relative m-2.5 rounded-xl glass p-3.5 sm:m-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-sans text-base leading-tight font-bold text-ink-900 sm:text-lg">{category.name}</h3>
            <p className="mt-0.5 text-xs text-ink-600 sm:text-sm">{category.blurb}</p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        {showItems && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {category.items.map((it) => (
              <li key={it} className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-ink-700">
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}

/**
 * Horizontal snap-scroll on phones, bento grid from `md` up
 * (featured categories span two columns).
 */
export function CategoryGrid({ categories, showItems }: { categories: Category[]; showItems?: boolean }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-pl-4 sm:-mx-6 sm:px-6 sm:scroll-pl-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
      {categories.map((c) => (
        <CategoryCard key={c.slug} category={c} showItems={showItems} className={cn('w-[72%] shrink-0 snap-start sm:w-[46%] md:w-auto', c.featured && 'md:col-span-2')} />
      ))}
    </div>
  )
}
