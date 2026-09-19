import { unsplash } from './images'

export interface Product {
  id: string
  name: string
  /** Pack size or unit, e.g. "5 kg", "1 L", "pack of 6". */
  unit: string
  /** Matches a Category.slug. */
  category: string
  image: string
  /** Selling price in INR. */
  price: number
  /** Printed MRP in INR, if higher than price. */
  mrp?: number
  available: boolean
  /** "popular" products are featured on the home page. */
  tags?: string[]
}

/**
 * SAMPLE CATALOGUE
 * ----------------
 * The store has not published an online price list, so these entries are
 * demo data that shows how the shop works. Names are typical items in the
 * ranges the store lists on Google; prices are indicative placeholders,
 * not the store's real prices. Replace this array with the real inventory
 * (or a Supabase table with the same shape) before launch.
 */
export const catalogue = {
  isDemo: true,
  notice: 'Sample catalogue. Prices are indicative and the store confirms the final bill when you order.',
}

export const products: Product[] = [
  // Groceries & Staples
  { id: 'basmati-rice-5kg', name: 'Basmati Rice', unit: '5 kg', category: 'staples', image: unsplash('1586201375761-83865001e31c', 600, 600), price: 549, mrp: 620, available: true, tags: ['popular'] },
  { id: 'chakki-atta-10kg', name: 'Fresh Chakki Atta', unit: '10 kg', category: 'staples', image: unsplash('1574323347407-f5e1ad6d020b', 600, 600), price: 449, mrp: 490, available: true, tags: ['popular'] },
  { id: 'toor-dal-1kg', name: 'Toor Dal', unit: '1 kg', category: 'staples', image: unsplash('1515543904379-3d757afe72e4', 600, 600), price: 165, mrp: 180, available: true },
  { id: 'turmeric-powder-200g', name: 'Turmeric Powder', unit: '200 g', category: 'staples', image: unsplash('1596040033229-a9821ebd058d', 600, 600), price: 62, mrp: 70, available: true },
  { id: 'garam-masala-100g', name: 'Garam Masala', unit: '100 g', category: 'staples', image: unsplash('1532336414038-cf19250c5757', 600, 600), price: 85, mrp: 95, available: true },
  { id: 'olive-oil-1l', name: 'Extra Virgin Olive Oil', unit: '1 L', category: 'staples', image: unsplash('1474979266404-7eaacbcd87c5', 600, 600), price: 899, mrp: 1050, available: true },

  // Fruits & Vegetables
  { id: 'seasonal-fruit-basket', name: 'Seasonal Fruit Basket', unit: '2 kg', category: 'fruits-vegetables', image: unsplash('1619566636858-adf3ef46400b', 600, 600), price: 399, available: true, tags: ['popular'] },
  { id: 'mixed-vegetables-2kg', name: 'Fresh Vegetable Pack', unit: '2 kg', category: 'fruits-vegetables', image: unsplash('1540420773420-3366772f4999', 600, 600), price: 199, available: true },
  { id: 'mango-1kg', name: 'Mango', unit: '1 kg', category: 'fruits-vegetables', image: unsplash('1553279768-865429fa0078', 600, 600), price: 180, available: true, tags: ['popular'] },
  { id: 'watermelon', name: 'Watermelon', unit: '1 piece', category: 'fruits-vegetables', image: unsplash('1587049352846-4a222e784d38', 600, 600), price: 90, available: true },
  { id: 'cucumber-500g', name: 'Cucumber', unit: '500 g', category: 'fruits-vegetables', image: unsplash('1589621316382-008455b857cd', 600, 600), price: 30, available: true },
  { id: 'papaya', name: 'Papaya', unit: '1 piece', category: 'fruits-vegetables', image: unsplash('1526318472351-c75fcf070305', 600, 600), price: 70, available: true },

  // Snacks & Beverages
  { id: 'parle-g-800g', name: 'Parle-G Biscuits', unit: '800 g', category: 'snacks-beverages', image: unsplash('1558961363-fa8fdf82db35', 600, 600), price: 90, mrp: 100, available: true, tags: ['popular'] },
  { id: 'potato-chips-family', name: 'Potato Chips', unit: 'family pack', category: 'snacks-beverages', image: unsplash('1566478989037-eec170784d0b', 600, 600), price: 50, available: true },
  { id: 'namkeen-mix-400g', name: 'Namkeen Mixture', unit: '400 g', category: 'snacks-beverages', image: unsplash('1613919113640-25732ec5e61f', 600, 600), price: 95, mrp: 110, available: true },
  { id: 'orange-juice-1l', name: 'Orange Juice', unit: '1 L', category: 'snacks-beverages', image: unsplash('1600271886742-f049cd451bba', 600, 600), price: 130, mrp: 150, available: true },
  { id: 'assam-tea-500g', name: 'Assam Tea', unit: '500 g', category: 'snacks-beverages', image: unsplash('1564890369478-c89ca6d9cde9', 600, 600), price: 260, mrp: 290, available: true },
  { id: 'ground-coffee-250g', name: 'Ground Coffee', unit: '250 g', category: 'snacks-beverages', image: unsplash('1559056199-641a0ac8b55e', 600, 600), price: 349, mrp: 399, available: true },

  // Breakfast & Dairy
  { id: 'milk-1l', name: 'Toned Milk', unit: '1 L', category: 'breakfast-dairy', image: unsplash('1550583724-b2692b85b150', 600, 600), price: 56, available: true, tags: ['popular'] },
  { id: 'brown-bread', name: 'Brown Bread', unit: '400 g', category: 'breakfast-dairy', image: unsplash('1509440159596-0249088772ff', 600, 600), price: 50, available: true },
  { id: 'farm-eggs-12', name: 'Farm Eggs', unit: 'pack of 12', category: 'breakfast-dairy', image: unsplash('1582722872445-44dc5f7e3c8f', 600, 600), price: 96, available: true },
  { id: 'butter-500g', name: 'Salted Butter', unit: '500 g', category: 'breakfast-dairy', image: unsplash('1589985270826-4b7bb135bc9d', 600, 600), price: 285, mrp: 300, available: true },
  { id: 'cheddar-cheese-200g', name: 'Cheddar Cheese', unit: '200 g', category: 'breakfast-dairy', image: unsplash('1589881133595-a3c085cb731d', 600, 600), price: 240, mrp: 260, available: true },
  { id: 'corn-flakes-875g', name: 'Corn Flakes', unit: '875 g', category: 'breakfast-dairy', image: unsplash('1521483451569-e33803c0330c', 600, 600), price: 299, mrp: 340, available: true },

  // International & Gourmet
  { id: 'ramen-noodles-5', name: 'Korean Ramen', unit: 'pack of 5', category: 'international', image: unsplash('1569718212165-3a8278d5f624', 600, 600), price: 325, mrp: 375, available: true, tags: ['popular'] },
  { id: 'granola-500g', name: 'Honey Granola', unit: '500 g', category: 'international', image: unsplash('1614961233913-a5113a4a34ed', 600, 600), price: 399, mrp: 450, available: true },

  // Chocolates & Confectionery
  { id: 'dark-chocolate-100g', name: 'Dark Chocolate Bar', unit: '100 g', category: 'confectionery', image: unsplash('1511381939415-e44015466834', 600, 600), price: 180, mrp: 200, available: true },
  { id: 'assorted-candies-200g', name: 'Assorted Candies', unit: '200 g', category: 'confectionery', image: unsplash('1621939514649-280e2ee25f60', 600, 600), price: 120, available: true },

  // Dry Fruits & Nuts
  { id: 'almonds-500g', name: 'California Almonds', unit: '500 g', category: 'dry-fruits', image: unsplash('1508061253366-f7da158b6d46', 600, 600), price: 549, mrp: 650, available: true, tags: ['popular'] },
  { id: 'cashews-500g', name: 'Whole Cashews', unit: '500 g', category: 'dry-fruits', image: unsplash('1599599810769-bcde5a160d32', 600, 600), price: 599, mrp: 700, available: true },

  // Frozen & Ice Cream
  { id: 'vanilla-ice-cream-1l', name: 'Vanilla Ice Cream', unit: '1 L', category: 'frozen-ice-cream', image: unsplash('1497034825429-c343d7c6a68f', 600, 600), price: 220, mrp: 250, available: true },
  { id: 'french-fries-1kg', name: 'Frozen French Fries', unit: '1 kg', category: 'frozen-ice-cream', image: unsplash('1573080496219-bb080dd4f877', 600, 600), price: 199, mrp: 230, available: true },

  // Personal Care
  { id: 'shampoo-650ml', name: 'Anti-Dandruff Shampoo', unit: '650 ml', category: 'personal-care', image: unsplash('1571781926291-c477ebfd024b', 600, 600), price: 449, mrp: 520, available: true },
  { id: 'body-wash-500ml', name: 'Moisturising Body Wash', unit: '500 ml', category: 'personal-care', image: unsplash('1608248543803-ba4f8c70ae0b', 600, 600), price: 299, mrp: 349, available: true },
  { id: 'face-cream-50g', name: 'Daily Face Cream', unit: '50 g', category: 'personal-care', image: unsplash('1556228720-195a672e8a03', 600, 600), price: 249, mrp: 275, available: true },
  { id: 'toothbrush-3', name: 'Toothbrush', unit: 'pack of 3', category: 'personal-care', image: unsplash('1607613009820-a29f7bb81c04', 600, 600), price: 120, mrp: 150, available: true },

  // Home & Cleaning
  { id: 'detergent-powder-4kg', name: 'Detergent Powder', unit: '4 kg', category: 'home-cleaning', image: unsplash('1582735689369-4fe89db7114c', 600, 600), price: 520, mrp: 600, available: true },
  { id: 'floor-cleaner-2l', name: 'Floor Cleaner', unit: '2 L', category: 'home-cleaning', image: unsplash('1563453392212-326f5e854473', 600, 600), price: 260, mrp: 299, available: true },
  { id: 'dishwash-gel-750ml', name: 'Dishwash Gel', unit: '750 ml', category: 'home-cleaning', image: unsplash('1585421514738-01798e348b17', 600, 600), price: 130, mrp: 145, available: true },

  // Baby Care
  { id: 'diapers-m-56', name: 'Baby Diapers (M)', unit: 'pack of 56', category: 'baby-care', image: unsplash('1555252333-9f8e92e65df9', 600, 600), price: 799, mrp: 949, available: true },
  { id: 'baby-wipes-72', name: 'Baby Wipes', unit: 'pack of 72', category: 'baby-care', image: unsplash('1515488042361-ee00e0ddd4e4', 600, 600), price: 149, mrp: 180, available: true },

  // Gift Hampers
  { id: 'dry-fruit-gift-box', name: 'Dry Fruit Gift Box', unit: '750 g', category: 'gifting', image: unsplash('1607344645866-009c320b63e0', 600, 600), price: 1299, mrp: 1499, available: true },
  { id: 'gourmet-gift-basket', name: 'Gourmet Gift Basket', unit: 'assorted', category: 'gifting', image: unsplash('1513885535751-8b9238bd345a', 600, 600), price: 1999, available: true },
]

export const productById = Object.fromEntries(products.map((p) => [p.id, p])) as Record<string, Product>

export const popularProducts = products.filter((p) => p.tags?.includes('popular'))
