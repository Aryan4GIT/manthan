import { categoryBySlug } from '@/data/categories'
import { products, type Product } from '@/data/products'

/** Case-insensitive match on product name, unit and category name. */
export function searchProducts(query: string, list: Product[] = products) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return list
  return list.filter((p) => {
    const hay = `${p.name} ${p.unit} ${categoryBySlug[p.category]?.name ?? ''} ${p.category}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
}
