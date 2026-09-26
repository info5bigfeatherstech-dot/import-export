export interface VariantItem {
  id: string
  sku: string
  color: string
  size: string
  stockQuantity: number
  priceAdjustment: number // e.g. +$0.00
  barcode?: string
}

export type ProductType = 'New Developed' | 'Shipment Sample' | 'Customer Sample' | string
export type GenderType = 'Women' | 'Men' | 'Unisex'
export type AgeGroupType = 'Newborn' | 'Infant' | 'Toddler' | 'Kids' | 'Teen' | 'Adult'
export type YesNoType = 'Yes' | 'No'
export type RepeatOrderNumberType = '1st' | '2nd' | '3rd' | '4th+'
export type ProductStatusType = 'Active' | 'Inactive'

export interface AdminProduct {
  id: string
  // 1. Basic Identifiers
  productCode: string // e.g. ST-1001
  sku: string // e.g. DRS-001
  purchaseCode: string // e.g. PUR-001
  productName: string // e.g. Floral Maxi Dress
  productType: ProductType // New Developed / Shipment Sample / Customer Sample / Custom
  customProductType?: string

  // 2. Variant Info
  variant: YesNoType // Yes / No
  variantDetails?: string // Explanatory notes or configuration summary
  variantsList?: VariantItem[] // Detailed matrix of variants

  // 3. Demographics & Categorization
  gender: GenderType // Women / Men / Unisex
  ageGroup: AgeGroupType // Newborn / Infant / Toddler / Kids / Teen / Adult
  category: string // Dress / Top / Shirt / Trousers / Custom
  customCategory?: string
  subcategory: string // Maxi Dress / T-Shirt / Blouse / Custom
  customSubcategory?: string
  collection: string // Summer Collection / Custom
  customCollection?: string
  season: string // SS26 / AW26 / Resort / Custom
  customSeason?: string

  // 4. Lifecycle Dates (Month and Year)
  developmentDate: string // e.g. "March 2026"
  shipmentDate: string // e.g. "August 2026"

  // 5. Fabric & Specs
  fabric: string // Cotton / Viscose / Linen / Custom
  fabricComposition: string // e.g. 100% Cotton
  gsm: string | number // e.g. 120
  pattern: string // Solid / Printed / Floral / Striped
  color: string // Base color e.g. Blue
  availableColors: string[] // e.g. ['Blue', 'Pink', 'Green']
  sizeRange: string[] // e.g. ['S', 'M', 'L', 'XL']
  customSize?: string
  moq: string | number // e.g. 500
  quantityUnit: string // Pcs / Sets / Dozens / Bundles / Pairs / Yards / Meters
  marketSuitability: string[] // USA / UK / Europe / UAE / Custom

  // 6. Factory & Sourcing
  factoryCode: string // auto-generated e.g. F26-001
  factoryName: string // e.g. ABC Garments
  factoryPriceExw: string | number // e.g. 7.20
  salePrice: string | number // e.g. 8.50
  fobPrice: string | number // e.g. 8.00
  fobPort: string // e.g. Shanghai

  // 7. Inventory & Readiness
  readyStockAvailability: YesNoType // Yes / No
  readyStockQuantity: string | number // e.g. 2500
  readyStockQuantityUnit: string // Pcs / Sets / Cartons / Bundles

  // 8. Customer & Order Tracking
  customerName: string // e.g. XYZ Fashion
  customerStyleCode: string // auto-generated e.g. C26-001 or XYZ-1001
  repeatOrder: YesNoType // Yes / No
  repeatOrderNumber?: RepeatOrderNumberType // 1st / 2nd / 3rd (conditionally required when repeatOrder === 'Yes')

  // 9. Status & Presentation
  productStatus: ProductStatusType // Active / Inactive
  featuredProduct: YesNoType // Yes / No
  description: string // Short product description
  productImage: string // Image URL or base64 data URI

  // 10. Audit Timestamps
  createdAtDate: string // Month & Year (e.g. "March 2026")
  updatedAtDate: string // Short date/time
}
