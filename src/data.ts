export type Category = 'Entree' | 'Main' | 'Desserts' | 'Cafe' | 'Condiments' | 'Packaging Items'

export type Group = 'Food Items' | 'Packaging Items'

export type StockItem = {
  id: string
  name: string
  unit: string
  max: number
  stock: number
  category: Category
  subgroup?: string
}

const items: Omit<StockItem, 'id' | 'stock'>[] = [
  { name: 'BBQ Chicken', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Chicken Satay', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Moo Ping', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Chicken Wings', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Veg Rolls', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Chicken Rolls', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Beef Puff', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Coconut Prawns', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Dumpling', unit: 'servings', max: 20, category: 'Entree' },
  { name: 'Wonton', unit: 'servings', max: 20, category: 'Entree' },

  { name: 'Wagyu', unit: 'servings', max: 20, category: 'Main' },
  { name: 'Soft Shell Crabs', unit: 'servings', max: 20, category: 'Main' },
  { name: 'King Prawns', unit: 'servings', max: 20, category: 'Main' },
  { name: 'Prawns', unit: 'Bag', max: 20, category: 'Main' },
  { name: 'Squids', unit: 'Bag', max: 20, category: 'Main' },

  { name: 'French Fries', unit: 'kg', max: 10, category: 'Cafe' },
  { name: 'Sour Dough', unit: 'loaves', max: 20, category: 'Cafe' },
  { name: 'Sandwich White', unit: 'loaves', max: 20, category: 'Cafe' },
  { name: 'Sandwich GF', unit: 'loaves', max: 20, category: 'Cafe' },
  { name: 'Burger Bun', unit: 'pcs', max: 50, category: 'Cafe' },
  { name: 'Croissants', unit: 'pcs', max: 30, category: 'Cafe' },
  { name: 'Turkish Bread', unit: 'pcs', max: 30, category: 'Cafe' },

  { name: 'Aioli', unit: 'L', max: 10, category: 'Condiments' },
  { name: 'Hollandaise Sauce', unit: 'L', max: 10, category: 'Condiments' },
  { name: 'BBQ Sauce', unit: 'L', max: 10, category: 'Condiments' },
  { name: 'Salt', unit: 'kg', max: 5, category: 'Condiments' },
  { name: 'Pepper', unit: 'kg', max: 5, category: 'Condiments' },
  { name: 'Crispy Chilli Oil', unit: 'Btl', max: 2, category: 'Condiments' },


  { name: 'Deep Fried Ice Cream', unit: 'servings', max: 20, category: 'Desserts' },
  { name: 'Coconut Ice Cream', unit: 'servingss', max: 20, category: 'Desserts' },
  { name: 'Green Tea Ice Cream', unit: 'servingss', max: 20, category: 'Desserts' },
  { name: 'Mango Ice Cream', unit: 'servingss', max: 20, category: 'Desserts' },
  { name: 'Vanilla Ice Cream', unit: 'servingss', max: 20, category: 'Desserts' },


  { name: '#1 Uncoated Paper Tray', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Sandwich Wedge', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Sauce Container (S)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Sauce Container (M)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Sauce Container (L)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Sushi Clam', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: '750 Kraft Bowl', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: '750 PP Lid', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: '500 Rectangular', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: '700 Rectangular', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: '100 Rectangular', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Lid Rectangular', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },
  { name: 'Snack Kraft Box', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Trays & Containers' },

  { name: 'Clear 50um 6"x9" Bag', unit: 'Pcs', max: 100, category: 'Packaging Items', subgroup: 'Bags' },
  { name: 'Paper Bag (S)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Bags' },
  { name: 'Paper Bag (L)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Bags' },
  { name: 'Uber Bag (L)', unit: 'pcs', max: 100, category: 'Packaging Items', subgroup: 'Bags' },

]

export const CATEGORY_ORDER: Category[] = [
  'Entree',
  'Main',
  'Desserts',
  'Cafe',
  'Condiments',
  'Packaging Items',
]

export const GROUP_ORDER: Group[] = ['Food Items', 'Packaging Items']

export const CATEGORY_GROUP: Record<Category, Group> = {
  Entree: 'Food Items',
  Main: 'Food Items',
  Desserts: 'Food Items',
  Cafe: 'Food Items',
  Condiments: 'Food Items',
  'Packaging Items': 'Packaging Items',
}

export const CATEGORY_META: Record<
  Category,
  { dot: string; border: string; text: string; accent: string }
> = {
  Entree: {
    dot: 'bg-sky-400',
    border: 'border-sky-400',
    text: 'text-sky-300',
    accent: 'accent-sky-400',
  },
  Main: {
    dot: 'bg-violet-400',
    border: 'border-violet-400',
    text: 'text-violet-300',
    accent: 'accent-violet-400',
  },
  Desserts: {
    dot: 'bg-pink-400',
    border: 'border-pink-400',
    text: 'text-pink-300',
    accent: 'accent-pink-400',
  },
  Cafe: {
    dot: 'bg-amber-400',
    border: 'border-amber-400',
    text: 'text-amber-300',
    accent: 'accent-amber-400',
  },
  Condiments: {
    dot: 'bg-teal-400',
    border: 'border-teal-400',
    text: 'text-teal-300',
    accent: 'accent-teal-400',
  },
  'Packaging Items': {
    dot: 'bg-rose-400',
    border: 'border-rose-400',
    text: 'text-rose-300',
    accent: 'accent-rose-400',
  },
}

export function makeMockStock(): StockItem[] {
  return items.map((item, i) => ({
    ...item,
    id: `item-${i}`,
    stock: Math.round(item.max * (0.15 + Math.random() * 0.8)),
  }))
}
