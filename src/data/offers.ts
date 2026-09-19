import { unsplash } from './images'

export interface Offer {
  id: string
  title: string
  description: string
  /** Short highlight, e.g. "Flat 15% off". Only set this for real offers. */
  badge?: string
  /** Where the offer was published, so shoppers can check it. */
  source?: { label: string; url: string; when: string }
  /** Category slug this deal links to in the shop. */
  category?: string
  image: string
  tone: 'green' | 'mango'
}

/**
 * Offers are data-driven. The first two are real announcements from the
 * store's own social profiles (linked from its Google listing). The rest
 * are deal categories with no discount claimed: add a `badge` and `source`
 * when the store runs a real promotion in that range.
 */
export const offers: Offer[] = [
  {
    id: 'weekend-fresh',
    title: 'Weekend savings on fruits & vegetables',
    description: 'Flat 15% off fresh fruits and vegetables, Saturday and Sunday only. Free delivery available.',
    badge: 'Flat 15% off',
    source: { label: 'Announced on Instagram', url: 'https://www.instagram.com/mantan_super_mart/', when: 'September 2026' },
    category: 'fruits-vegetables',
    image: unsplash('1610348725531-843dff563e2c', 900, 700),
    tone: 'green',
  },
  {
    id: 'free-delivery',
    title: 'Free home delivery',
    description: 'Free home delivery in a limited area around Sultanpur and MG Road, 9 am to 9 pm every day.',
    badge: 'Free delivery',
    source: { label: 'Listed on Google', url: 'https://share.google/j1rMSVKTXKjWEZIcG', when: 'Verified September 2026' },
    image: unsplash('1573246123716-6b1782bfc499', 900, 700),
    tone: 'mango',
  },
  {
    id: 'grocery-deals',
    title: 'Grocery deals',
    description: 'Rice, atta, dal and spices: the staples that fill the monthly list.',
    category: 'staples',
    image: unsplash('1586201375761-83865001e31c', 900, 700),
    tone: 'green',
  },
  {
    id: 'household-offers',
    title: 'Household offers',
    description: 'Detergents, dishwash and cleaners for the whole home.',
    category: 'home-cleaning',
    image: unsplash('1563453392212-326f5e854473', 900, 700),
    tone: 'mango',
  },
  {
    id: 'snack-combos',
    title: 'Snack combos',
    description: 'Biscuits, namkeen, chips and cold drinks for movie nights and guests.',
    category: 'snacks-beverages',
    image: unsplash('1599490659213-e2b9527bd087', 900, 700),
    tone: 'green',
  },
  {
    id: 'monthly-essentials',
    title: 'Monthly essentials',
    description: 'Breakfast, dairy and personal care picks for the whole month.',
    category: 'breakfast-dairy',
    image: unsplash('1521483451569-e33803c0330c', 900, 700),
    tone: 'mango',
  },
]
