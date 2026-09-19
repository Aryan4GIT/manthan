import { unsplash } from './images'

export interface Category {
  slug: string
  name: string
  blurb: string
  image: string
  /** Example items shown under the category. */
  items: string[]
  /** Featured tiles span two columns in the bento grid. */
  featured?: boolean
}

/**
 * Categories follow the ranges the store lists on Google: Indian and
 * international groceries, daily fruits and vegetables, meats, frozen
 * snacks, ice creams, beverages, fresh chakki atta, personal care,
 * cosmetics, household utilities and gift hampers.
 */
export const categories: Category[] = [
  {
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    blurb: 'Fresh produce, stocked daily.',
    image: unsplash('1610348725531-843dff563e2c', 900, 700),
    items: ['Seasonal fruits', 'Leafy greens', 'Onions & potatoes', 'Exotic vegetables', 'Herbs'],
    featured: true,
  },
  {
    slug: 'staples',
    name: 'Groceries & Staples',
    blurb: 'Rice, atta, dal, pulses, spices and oils.',
    image: unsplash('1586201375761-83865001e31c', 900, 700),
    items: ['Rice', 'Fresh chakki atta', 'Dal & pulses', 'Spices & masalas', 'Cooking oil & ghee', 'Sugar & salt'],
  },
  {
    slug: 'snacks-beverages',
    name: 'Snacks & Beverages',
    blurb: 'Biscuits, namkeen, chips and cold drinks.',
    image: unsplash('1566478989037-eec170784d0b', 900, 700),
    items: ['Biscuits', 'Namkeen', 'Chips', 'Soft drinks', 'Juices', 'Tea & coffee'],
  },
  {
    slug: 'breakfast-dairy',
    name: 'Breakfast & Dairy',
    blurb: 'Milk, bread, eggs, cereals and spreads.',
    image: unsplash('1550583724-b2692b85b150', 900, 700),
    items: ['Milk & curd', 'Bread', 'Eggs', 'Cereals & oats', 'Butter & cheese', 'Jams & spreads'],
  },
  {
    slug: 'international',
    name: 'International & Gourmet',
    blurb: 'Imported pantry favourites and exotic finds.',
    image: unsplash('1601599561213-832382fd07ba', 900, 700),
    items: ['Pasta & sauces', 'Noodles & ramen', 'Olive oil', 'Cheeses', 'Condiments', 'Baking'],
    featured: true,
  },
  {
    slug: 'confectionery',
    name: 'Chocolates & Confectionery',
    blurb: 'Chocolates, candies and sweet treats.',
    image: unsplash('1511381939415-e44015466834', 900, 700),
    items: ['Chocolates', 'Candies', 'Cookies', 'Cakes & bakery'],
  },
  {
    slug: 'dry-fruits',
    name: 'Dry Fruits & Nuts',
    blurb: 'Almonds, cashews, pistachios and more.',
    image: unsplash('1508061253366-f7da158b6d46', 900, 700),
    items: ['Almonds', 'Cashews', 'Pistachios', 'Walnuts', 'Raisins', 'Dates'],
  },
  {
    slug: 'frozen-ice-cream',
    name: 'Frozen & Ice Cream',
    blurb: 'Frozen snacks, ready-to-cook and ice creams.',
    image: unsplash('1497034825429-c343d7c6a68f', 900, 700),
    items: ['Ice creams', 'Frozen snacks', 'Frozen vegetables', 'Ready-to-cook'],
  },
  {
    slug: 'personal-care',
    name: 'Personal Care',
    blurb: 'Shampoo, soap, skincare and cosmetics.',
    image: unsplash('1556228720-195a672e8a03', 900, 700),
    items: ['Shampoo & conditioner', 'Soap & body wash', 'Toothpaste', 'Skincare', 'Cosmetics'],
  },
  {
    slug: 'home-cleaning',
    name: 'Home & Cleaning',
    blurb: 'Detergents, dishwash, cleaners and kitchen utilities.',
    image: unsplash('1563453392212-326f5e854473', 900, 700),
    items: ['Detergents', 'Dishwash', 'Floor cleaners', 'Kitchen utilities', 'Household supplies'],
  },
  {
    slug: 'baby-care',
    name: 'Baby Care',
    blurb: 'Baby food, diapers and hygiene.',
    image: unsplash('1515488042361-ee00e0ddd4e4', 900, 700),
    items: ['Baby food', 'Diapers', 'Wipes', 'Baby bath & skincare'],
  },
  {
    slug: 'gifting',
    name: 'Gift Hampers',
    blurb: 'Pick your own assortment, we pack the hamper.',
    image: unsplash('1607344645866-009c320b63e0', 900, 700),
    items: ['Festive hampers', 'Dry fruit boxes', 'Gourmet baskets', 'Custom assortments'],
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<string, Category>
