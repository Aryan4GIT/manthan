import { PageHero } from '@/components/PageHero'
import { CategoryCard } from '@/components/shop/CategoryGrid'
import { categories } from '@/data/categories'
import { usePageMeta } from '@/lib/seo'

export function Categories() {
  usePageMeta('Categories', 'Groceries and staples, fresh fruits and vegetables, snacks, dairy, international foods, personal care, home cleaning, baby care and gift hampers at Mantan Supermart.')
  return (
    <>
      <PageHero title="Categories" lead="Everything the store stocks, grouped the way you shop. Tap a category to see products." />
      <section className="container-x pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} showItems className="min-h-72" />
          ))}
        </div>
      </section>
    </>
  )
}
