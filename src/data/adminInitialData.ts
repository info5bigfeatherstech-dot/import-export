import type { AdminProduct } from '../types/adminProduct'

export const INITIAL_FACTORIES: { name: string; codePrefix: string; country: string; city: string }[] = []

export const INITIAL_CUSTOMERS: { name: string; codePrefix: string; country: string }[] = []

export const PRODUCT_TYPES = [
  'New Developed',
  'Shipment Sample',
  'Customer Sample',
]

export const GENDER_OPTIONS = ['Women', 'Men', 'Unisex']

export const AGE_GROUP_OPTIONS = [
  'Newborn',
  'Infant',
  'Toddler',
  'Kids',
  'Teen',
  'Adult',
]

export const CATEGORY_OPTIONS = [
  'Dress',
  'Top',
  'Shirt',
  'Trousers',
  'Jacket & Outerwear',
  'Denim',
  'Activewear',
  'Home Textile',
]

export const SUBCATEGORY_MAP: Record<string, string[]> = {
  Dress: ['Maxi Dress', 'Midi Dress', 'Mini Dress', 'Shirt Dress', 'Wrap Dress'],
  Top: ['Blouse', 'T-Shirt', 'Tank Top', 'Camisole', 'Crop Top'],
  Shirt: ['Formal Oxford', 'Casual Linen Shirt', 'Flannel Shirt', 'Over-shirt'],
  Trousers: ['Chino Pants', 'Wide-Leg Trousers', 'Cargo Pants', 'Culottes', 'Joggers'],
  'Jacket & Outerwear': ['Bomber Jacket', 'Trench Coat', 'Puffer Jacket', 'Parka'],
  Denim: ['Skinny Jeans', 'Straight Fit Jeans', 'Denim Jacket', 'Denim Shorts'],
  Activewear: ['Leggings', 'Sports Bra', 'Track Jacket', 'Training Shorts'],
  'Home Textile': ['Bedsheet Set', 'Curtains', 'Cushion Cover', 'Kitchen Towels'],
}

export const COLLECTION_OPTIONS = [
  'Summer Collection',
  'Spring Bloom Collection',
  'Autumn Elegance',
  'Winter Warmth',
  'Resort Cruise Line',
  'Timeless Essentials',
]

export const SEASON_OPTIONS = [
  'SS26',
  'AW26',
  'Resort 26',
  'Pre-Fall 26',
  'SS25',
  'AW25',
]

export const FABRIC_OPTIONS = [
  'Cotton',
  'Viscose',
  'Linen',
  'Polyester',
  'Modal',
  'Silk Blend',
  'Denim Twill',
  'Rayon',
]

export const PATTERN_OPTIONS = [
  'Solid',
  'Printed',
  'Floral',
  'Striped',
  'Checkered',
  'Geometric',
  'Embroidered',
  'Tie-Dye',
]

export const SIZE_PRESETS = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size']

export const QUANTITY_UNITS = [
  'Pcs',
  'Sets',
  'Dozens',
  'Bundles',
  'Pairs',
  'Yards',
  'Meters',
]

export const READY_STOCK_UNITS = [
  'Pcs',
  'Sets',
  'Cartons',
  'Bundles',
  'Dozens',
]

export const MARKET_OPTIONS = [
  'USA',
  'UK',
  'Europe',
  'UAE',
  'Australia',
  'Japan',
  'Canada',
  'Saudi Arabia',
]

export const FOB_PORTS = [
  'Shanghai',
  'Ningbo',
  'Qingdao',
  'Chittagong',
  'Karachi',
  'Nhava Sheva (Mumbai)',
  'Ho Chi Minh',
  'Rotterdam',
]

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const YEAR_OPTIONS = ['2025', '2026', '2027', '2028']

export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = []
