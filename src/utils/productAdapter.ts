import type { AdminProduct, VariantItem } from '../types/adminProduct'

/**
 * Maps raw backend product from MongoDB / Express API to frontend AdminProduct
 */
export function apiProductToAdminProduct(raw: any): AdminProduct {
  // Extract main image
  const primaryImg =
    (Array.isArray(raw.images) && raw.images.length > 0 && raw.images[0]) ||
    raw.productImage ||
    '/factory_floor.jpg'

  // Extract variants if present
  const variantsList: VariantItem[] = (raw.variantDetails || []).map(
    (v: any, index: number) => ({
      id: v.sku || `var-${index}`,
      sku: v.sku || `${raw.productCode || 'ST'}-V${index + 1}`,
      color: v.color || '',
      size: v.size || '',
      stockQuantity: Number(v.stockQty) || 0,
      priceAdjustment: Number(v.priceAdjustment) || 0,
      barcode: v.barcode || '',
    })
  )

  // Extract date strings
  const devDate = raw.developmentDate
    ? typeof raw.developmentDate === 'object'
      ? `${raw.developmentDate.month || ''} ${raw.developmentDate.year || ''}`.trim()
      : String(raw.developmentDate)
    : ''

  const shipDate = raw.shipmentDate
    ? typeof raw.shipmentDate === 'object'
      ? `${raw.shipmentDate.month || ''} ${raw.shipmentDate.year || ''}`.trim()
      : String(raw.shipmentDate)
    : ''

  const catName =
    raw.category && typeof raw.category === 'object'
      ? raw.category.name || 'Garments'
      : raw.garmentCategory || raw.category || 'Garments'

  const factoryName =
    raw.factory && typeof raw.factory === 'object'
      ? raw.factory.name || ''
      : raw.factoryName || ''

  const factoryCode =
    raw.factory && typeof raw.factory === 'object'
      ? raw.factory.code || ''
      : raw.factoryCode || ''

  const customerName =
    raw.customer && typeof raw.customer === 'object'
      ? raw.customer.name || ''
      : Array.isArray(raw.customers) && raw.customers[0]?.name
      ? raw.customers[0].name
      : raw.customerName || ''

  const customerStyleCode =
    raw.customerStyleCode ||
    (Array.isArray(raw.customers) && raw.customers[0]?.styleCode) ||
    ''

  const repeatOrder =
    raw.repeatOrder === 'Yes' ||
    (Array.isArray(raw.customers) && raw.customers[0]?.repeatOrder === 'Yes')
      ? 'Yes'
      : 'No'

  const repeatOrderNumber =
    raw.repeatOrderNumber ||
    (Array.isArray(raw.customers) && raw.customers[0]?.repeatOrderNumber) ||
    undefined

  const parseNumOrStr = (val: any, fallback: string | number = '') => {
    if (val === undefined || val === null || val === '') return fallback
    const n = Number(val)
    return isNaN(n) ? String(val) : n
  }

  return {
    id: String(raw.id || raw._id),
    productCode: raw.productCode || 'ST-1001',
    sku: raw.sku || raw.modelCode || `${raw.productCode || 'ST'}-01`,
    purchaseCode: raw.purchaseCode || '',
    productName: raw.name || raw.productName || raw.title || 'Untitled Product',
    productType: raw.productType || 'New Developed',
    customProductType: raw.customProductType,
    variant: raw.variant === 'Yes' ? 'Yes' : 'No',
    variantDetails:
      typeof raw.variantDetails === 'string'
        ? raw.variantDetails
        : Array.isArray(raw.variantDetails) && raw.variantDetails.length > 0
        ? `${raw.variantDetails.length} variant options configured.`
        : '',
    variantsList,
    gender: raw.gender || 'Women',
    ageGroup: raw.ageGroup || 'Adult',
    category: catName,
    customCategory: raw.customCategory,
    subcategory: raw.subcategory || '',
    customSubcategory: raw.customSubcategory,
    collection: raw.collection || raw.styleCollection || 'Summer Collection',
    customCollection: raw.customCollection,
    season: raw.season || 'SS26',
    customSeason: raw.customSeason,
    developmentDate: devDate || 'March 2026',
    shipmentDate: shipDate || 'August 2026',
    fabric: raw.fabric || 'Cotton',
    fabricComposition: raw.fabricComposition || '100% Cotton',
    gsm: parseNumOrStr(raw.gsm, '120'),
    pattern: raw.pattern || 'Solid',
    color: raw.color || 'White',
    availableColors: Array.isArray(raw.availableColors) ? raw.availableColors : [],
    sizeRange: Array.isArray(raw.sizeRange)
      ? raw.sizeRange
      : typeof raw.sizeRange === 'string' && raw.sizeRange.trim()
      ? raw.sizeRange.split(',').map((s: string) => s.trim())
      : ['S', 'M', 'L'],
    customSize: raw.customSize,
    moq: parseNumOrStr(raw.moq || raw.listing?.moq, '300'),
    quantityUnit: raw.quantityUnit || 'Pcs',
    marketSuitability: Array.isArray(raw.marketSuitability) ? raw.marketSuitability : ['USA', 'Europe'],
    factoryCode: factoryCode || 'F26-001',
    factoryName: factoryName || 'ABC Garments',
    factoryPriceExw: parseNumOrStr(raw.factoryPriceEXW || raw.factoryPriceExw, 7.2),
    salePrice: parseNumOrStr(raw.salePrice, 8.5),
    fobPrice: parseNumOrStr(raw.fobPrice, 8.0),
    fobPort: raw.fobPort || raw.listing?.fobPort || 'Shanghai',
    readyStockAvailability: raw.readyStockAvailability === 'Yes' ? 'Yes' : 'No',
    readyStockQuantity: parseNumOrStr(raw.readyStockQuantity, 0),
    readyStockQuantityUnit: raw.readyStockQuantityUnit || 'Pcs',
    customerName: customerName || 'XYZ Fashion',
    customerStyleCode: customerStyleCode || 'C26-001',
    repeatOrder: repeatOrder,
    repeatOrderNumber: repeatOrderNumber,
    productStatus: raw.productStatus === 'Inactive' ? 'Inactive' : 'Active',
    featuredProduct: raw.featuredProduct === 'Yes' ? 'Yes' : 'No',
    description: raw.description || raw.title || '',
    productImage: primaryImg,
    createdAtDate: raw.createdAt
      ? new Date(raw.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : raw.createdAtDate || 'March 2026',
    updatedAtDate: raw.updatedAt
      ? new Date(raw.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : raw.updatedAtDate || 'Nov 2026',
  }
}

/**
 * Maps frontend AdminProduct to backend API JSON payload matching productFieldsSchema
 */
export function adminProductToApiPayload(
  product: AdminProduct,
  defaultCategoryId: string
): Record<string, any> {
  const [devMonth, devYear] = (product.developmentDate || '').split(' ')
  const [shipMonth, shipYear] = (product.shipmentDate || '').split(' ')

  return {
    productCode: product.productCode,
    name: product.productName,
    title: product.productName,
    description: product.description || `${product.productName} export quality apparel specification.`,
    category: defaultCategoryId,
    attributes: [
      { key: 'Fabric', value: String(product.fabric || '') },
      { key: 'Composition', value: String(product.fabricComposition || '') },
      { key: 'GSM', value: String(product.gsm || '') },
      { key: 'Pattern', value: String(product.pattern || '') },
      { key: 'MOQ', value: `${product.moq} ${product.quantityUnit}` },
    ].filter((a) => a.key && a.value),
    infoSections: [
      {
        key: 'specs',
        items: [
          { heading: 'Material & Fabric', content: `${product.fabric} - ${product.fabricComposition}` },
          { heading: 'Production Specs', content: `GSM: ${product.gsm}, Pattern: ${product.pattern}` },
        ],
      },
    ],
    erp: {
      sku: product.sku,
      purchaseCode: product.purchaseCode,
      productType: product.productType,
      gender: product.gender,
      ageGroup: product.ageGroup,
      subcategory: product.subcategory,
      collection: product.collection,
      season: product.season,
      developmentDate: {
        month: devMonth || 'March',
        year: devYear || '2026',
      },
      shipmentDate: {
        month: shipMonth || 'August',
        year: shipYear || '2026',
      },
      fabric: product.fabric,
      fabricComposition: product.fabricComposition,
      gsm: String(product.gsm),
      pattern: product.pattern,
      color: product.color,
      availableColors: product.availableColors || [],
      sizeRange: Array.isArray(product.sizeRange) ? product.sizeRange.join(', ') : String(product.sizeRange),
      variant: product.variant,
      factoryPriceEXW: String(product.factoryPriceExw),
      salePrice: String(product.salePrice),
      fobPrice: String(product.fobPrice),
      fobPort: product.fobPort,
      moq: String(product.moq),
      quantityUnit: product.quantityUnit,
      readyStockAvailability: product.readyStockAvailability,
      readyStockQuantity: String(product.readyStockQuantity || '0'),
      readyStockQuantityUnit: product.readyStockQuantityUnit,
      customerStyleCode: product.customerStyleCode,
      repeatOrder: product.repeatOrder,
      repeatOrderNumber: product.repeatOrderNumber || 'None',
      productStatus: product.productStatus,
      featuredProduct: product.featuredProduct,
      marketSuitability: product.marketSuitability || [],
    },
  }
}
