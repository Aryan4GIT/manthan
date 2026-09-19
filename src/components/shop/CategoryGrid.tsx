import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type Category } from '@/data/categories'
import { responsive } from '@/data/images'
import { cn } from '@/lib/utils'

export function CategoryCard({ category, className, showItems = false }: { category: Category; className?: string; showItems?: boolean }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        'group relative flex min-h-60 flex-col justify-end overflow-hidden rounded-3xl bg-brand-900 shadow-card ring-1 ring-brand-900/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift md:min-h-64 lg:min-h-72',
        className,
      )}
    >
      <img
        src={category.image}
        srcSet={responsive(category.image, [360, 540, 720, 900])}
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 75vw"
        alt=""
        loading="lazy"
        decoding="async"
        width={900}
        height={700}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" aria-hidden="true" />
      <div className="glass-lite relative m-2.5 rounded-2xl p-3.5 sm:m-3 md:glass md:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight font-bold text-ink-900 sm:text-xl">{category.name}</h3>
            <p className="mt-1 text-xs text-ink-600 sm:text-sm">{category.blurb}</p>
          </div>
          <span className="shine flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        {showItems && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {category.items.map((it) => (
              <li key={it} className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink-700 ring-1 ring-brand-900/5">
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
        <CategoryCard key={c.slug} category={c} showItems={showItems} className={cn('w-[76%] shrink-0 snap-start sm:w-[46%] md:w-auto', c.featured && 'md:col-span-2')} />
      ))}
    </div>
  )
}
