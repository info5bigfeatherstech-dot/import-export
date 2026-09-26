import { useState, useEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  FiX,
  FiCheck,
  FiRefreshCw,
  FiTrash2,
  FiImage,
} from 'react-icons/fi'
import type { AdminProduct, VariantItem } from '../../types/adminProduct'
import {
  PRODUCT_TYPES,
  GENDER_OPTIONS,
  AGE_GROUP_OPTIONS,
  CATEGORY_OPTIONS,
  SUBCATEGORY_MAP,
  COLLECTION_OPTIONS,
  SEASON_OPTIONS,
  FABRIC_OPTIONS,
  PATTERN_OPTIONS,
  SIZE_PRESETS,
  QUANTITY_UNITS,
  READY_STOCK_UNITS,
  MARKET_OPTIONS,
  FOB_PORTS,
  MONTH_NAMES,
  YEAR_OPTIONS,
} from '../../data/adminInitialData'
import {
  generateFactoryCode,
  generateCustomerStyleCode,
  calculateMargin,
} from '../../utils/adminStorage'

interface AdminProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: AdminProduct) => void
  initialProduct?: AdminProduct | null
  existingProducts: AdminProduct[]
  factories: string[]
  customers: string[]
  onAddNewFactory: (name: string) => void
  onAddNewCustomer: (name: string) => void
}

export default function AdminProductModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  existingProducts,
  factories,
  customers,
  onAddNewFactory,
  onAddNewCustomer,
}: AdminProductModalProps) {
  const isEditing = Boolean(initialProduct?.id)

  // Form State
  const [productCode, setProductCode] = useState('ST-1001')
  const [sku, setSku] = useState('DRS-001')
  const [purchaseCode, setPurchaseCode] = useState('PUR-001')
  const [productName, setProductName] = useState('Floral Maxi Dress')

  // Product Type & Custom
  const [productType, setProductType] = useState('New Developed')
  const [customProductType, setCustomProductType] = useState('')

  // Variants
  const [variant, setVariant] = useState<'Yes' | 'No'>('Yes')
  const [variantDetails, setVariantDetails] = useState(
    'Configured with color & size matrix for separate SKU inventory.'
  )
  const [variantsList, setVariantsList] = useState<VariantItem[]>([])

  // Demographics & Categorization
  const [gender, setGender] = useState<'Women' | 'Men' | 'Unisex'>('Women')
  const [ageGroup, setAgeGroup] = useState<any>('Adult')
  const [category, setCategory] = useState('Dress')
  const [customCategory, setCustomCategory] = useState('')
  const [subcategory, setSubcategory] = useState('Maxi Dress')
  const [customSubcategory, setCustomSubcategory] = useState('')
  const [collection, setCollection] = useState('Summer Collection')
  const [customCollection, setCustomCollection] = useState('')
  const [season, setSeason] = useState('SS26')
  const [customSeason, setCustomSeason] = useState('')

  // Dates (Month & Year)
  const [devMonth, setDevMonth] = useState('March')
  const [devYear, setDevYear] = useState('2026')
  const [shipMonth, setShipMonth] = useState('August')
  const [shipYear, setShipYear] = useState('2026')

  // Fabric & Specs
  const [fabric, setFabric] = useState('Cotton')
  const [fabricComposition, setFabricComposition] = useState('100% Cotton')
  const [gsm, setGsm] = useState('120')
  const [pattern, setPattern] = useState('Floral')
  const [color, setColor] = useState('Blue')
  const [availableColorsText, setAvailableColorsText] = useState('Blue, Pink, Green')
  const [sizeRange, setSizeRange] = useState<string[]>(['S', 'M', 'L', 'XL'])
  const [customSizeInput, setCustomSizeInput] = useState('')
  const [moq, setMoq] = useState('500')
  const [quantityUnit, setQuantityUnit] = useState('Pcs')
  const [marketSuitability, setMarketSuitability] = useState<string[]>([
    'USA',
    'UK',
    'Europe',
    'UAE',
  ])
  const [customMarketInput, setCustomMarketInput] = useState('')

  // Factory & Pricing
  const [factoryName, setFactoryName] = useState('ABC Garments')
  const [newFactoryInput, setNewFactoryInput] = useState('')
  const [showAddFactoryInput, setShowAddFactoryInput] = useState(false)
  const [factoryCode, setFactoryCode] = useState('F26-001')
  const [factoryPriceExw, setFactoryPriceExw] = useState('7.20')
  const [salePrice, setSalePrice] = useState('8.50')
  const [fobPrice, setFobPrice] = useState('8.00')
  const [fobPort, setFobPort] = useState('Shanghai')

  // Stock
  const [readyStockAvailability, setReadyStockAvailability] = useState<'Yes' | 'No'>('Yes')
  const [readyStockQuantity, setReadyStockQuantity] = useState('2500')
  const [readyStockQuantityUnit, setReadyStockQuantityUnit] = useState('Pcs')

  // Customer
  const [customerName, setCustomerName] = useState('XYZ Fashion')
  const [newCustomerInput, setNewCustomerInput] = useState('')
  const [showAddCustomerInput, setShowAddCustomerInput] = useState(false)
  const [customerStyleCode, setCustomerStyleCode] = useState('C26-001')
  const [repeatOrder, setRepeatOrder] = useState<'Yes' | 'No'>('Yes')
  const [repeatOrderNumber, setRepeatOrderNumber] = useState<any>('1st')

  // Status & Media
  const [productStatus, setProductStatus] = useState<'Active' | 'Inactive'>('Active')
  const [featuredProduct, setFeaturedProduct] = useState<'Yes' | 'No'>('Yes')
  const [description, setDescription] = useState(
    'Chic floral printed maxi dress crafted from breathable 120 GSM cotton fabric, ideal for warm-weather resort and casual retail collections.'
  )
  const [productImage, setProductImage] = useState(
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
  )
  const [createdMonth, setCreatedMonth] = useState('March')
  const [createdYear, setCreatedYear] = useState('2026')

  // Initialize or reset form
  useEffect(() => {
    if (initialProduct) {
      setProductCode(initialProduct.productCode || '')
      setSku(initialProduct.sku || '')
      setPurchaseCode(initialProduct.purchaseCode || '')
      setProductName(initialProduct.productName || '')
      setProductType(
        PRODUCT_TYPES.includes(initialProduct.productType)
          ? initialProduct.productType
          : 'Custom'
      )
      setCustomProductType(
        PRODUCT_TYPES.includes(initialProduct.productType)
          ? ''
          : initialProduct.productType
      )
      setVariant(initialProduct.variant || 'No')
      setVariantDetails(initialProduct.variantDetails || '')
      setVariantsList(initialProduct.variantsList || [])

      setGender(initialProduct.gender || 'Women')
      setAgeGroup(initialProduct.ageGroup || 'Adult')
      setCategory(initialProduct.category || 'Dress')
      setCustomCategory(initialProduct.customCategory || '')
      setSubcategory(initialProduct.subcategory || '')
      setCustomSubcategory(initialProduct.customSubcategory || '')
      setCollection(
        COLLECTION_OPTIONS.includes(initialProduct.collection)
          ? initialProduct.collection
          : 'Custom'
      )
      setCustomCollection(
        COLLECTION_OPTIONS.includes(initialProduct.collection)
          ? ''
          : initialProduct.collection
      )
      setSeason(
        SEASON_OPTIONS.includes(initialProduct.season)
          ? initialProduct.season
          : 'Custom'
      )
      setCustomSeason(
        SEASON_OPTIONS.includes(initialProduct.season)
          ? ''
          : initialProduct.season
      )

      if (initialProduct.developmentDate) {
        const parts = initialProduct.developmentDate.split(' ')
        if (parts[0]) setDevMonth(parts[0])
        if (parts[1]) setDevYear(parts[1])
      }
      if (initialProduct.shipmentDate) {
        const parts = initialProduct.shipmentDate.split(' ')
        if (parts[0]) setShipMonth(parts[0])
        if (parts[1]) setShipYear(parts[1])
      }

      setFabric(initialProduct.fabric || '')
      setFabricComposition(initialProduct.fabricComposition || '')
      setGsm(String(initialProduct.gsm || ''))
      setPattern(initialProduct.pattern || '')
      setColor(initialProduct.color || '')
      setAvailableColorsText(
        initialProduct.availableColors?.join(', ') || initialProduct.color || ''
      )
      setSizeRange(initialProduct.sizeRange || ['S', 'M', 'L'])
      setMoq(String(initialProduct.moq || '500'))
      setQuantityUnit(initialProduct.quantityUnit || 'Pcs')
      setMarketSuitability(
        initialProduct.marketSuitability || ['USA', 'UK', 'Europe', 'UAE']
      )

      setFactoryName(initialProduct.factoryName || factories[0] || 'ABC Garments')
      setFactoryCode(initialProduct.factoryCode || 'F26-001')
      setFactoryPriceExw(String(initialProduct.factoryPriceExw || '0'))
      setSalePrice(String(initialProduct.salePrice || '0'))
      setFobPrice(String(initialProduct.fobPrice || '0'))
      setFobPort(initialProduct.fobPort || 'Shanghai')

      setReadyStockAvailability(initialProduct.readyStockAvailability || 'No')
      setReadyStockQuantity(String(initialProduct.readyStockQuantity || '0'))
      setReadyStockQuantityUnit(initialProduct.readyStockQuantityUnit || 'Pcs')

      setCustomerName(initialProduct.customerName || customers[0] || 'XYZ Fashion')
      setCustomerStyleCode(initialProduct.customerStyleCode || 'C26-001')
      setRepeatOrder(initialProduct.repeatOrder || 'No')
      setRepeatOrderNumber(initialProduct.repeatOrderNumber || '1st')

      setProductStatus(initialProduct.productStatus || 'Active')
      setFeaturedProduct(initialProduct.featuredProduct || 'No')
      setDescription(initialProduct.description || '')
      setProductImage(initialProduct.productImage || '')

      if (initialProduct.createdAtDate) {
        const parts = initialProduct.createdAtDate.split(' ')
        if (parts[0]) setCreatedMonth(parts[0])
        if (parts[1]) setCreatedYear(parts[1])
      }
    } else {
      const nextFacCode = generateFactoryCode(existingProducts)
      const nextCustCode = generateCustomerStyleCode(existingProducts)
      setFactoryCode(nextFacCode)
      setCustomerStyleCode(nextCustCode)
      setProductCode(`ST-${1000 + existingProducts.length + 1}`)
      setSku(`SKU-${(existingProducts.length + 1).toString().padStart(3, '0')}`)
      setPurchaseCode(`PUR-${(existingProducts.length + 1).toString().padStart(3, '0')}`)
    }
  }, [initialProduct, isOpen])

  if (!isOpen) return null

  const handleRegenerateFactoryCode = () => {
    setFactoryCode(generateFactoryCode(existingProducts))
  }

  const handleRegenerateCustomerCode = () => {
    setCustomerStyleCode(generateCustomerStyleCode(existingProducts, customerName))
  }

  const marginData = calculateMargin(factoryPriceExw, salePrice)

  const handleGenerateVariantMatrix = () => {
    const parsedColors = availableColorsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
    const baseSku = sku || 'PROD'

    const generated: VariantItem[] = []
    parsedColors.forEach((col) => {
      sizeRange.forEach((sz) => {
        const colorCode = col.slice(0, 3).toUpperCase()
        const varSku = `${baseSku}-${colorCode}-${sz}`
        generated.push({
          id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          sku: varSku,
          color: col,
          size: sz,
          stockQuantity: Math.round(Number(readyStockQuantity || 500) / (parsedColors.length * sizeRange.length || 1)),
          priceAdjustment: 0,
          barcode: `890${Math.floor(100000000 + Math.random() * 900000000)}`,
        })
      })
    })

    setVariantsList(generated)
    setVariant('Yes')
    setVariantDetails(
      `Auto-generated matrix of ${generated.length} variants across colors (${parsedColors.join(
        ', '
      )}) and sizes (${sizeRange.join(', ')}).`
    )
  }

  const handleSaveNewFactory = () => {
    if (newFactoryInput.trim()) {
      onAddNewFactory(newFactoryInput.trim())
      setFactoryName(newFactoryInput.trim())
      setNewFactoryInput('')
      setShowAddFactoryInput(false)
    }
  }

  const handleSaveNewCustomer = () => {
    if (newCustomerInput.trim()) {
      onAddNewCustomer(newCustomerInput.trim())
      setCustomerName(newCustomerInput.trim())
      setNewCustomerInput('')
      setShowAddCustomerInput(false)
    }
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProductImage(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const parsedColors = availableColorsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)

    const finalProduct: AdminProduct = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      productCode: productCode.trim() || 'ST-1001',
      sku: sku.trim() || 'DRS-001',
      purchaseCode: purchaseCode.trim() || 'PUR-001',
      productName: productName.trim() || 'Untitled Product',
      productType:
        productType === 'Custom'
          ? customProductType.trim() || 'Custom Sample'
          : productType,
      customProductType,

      variant,
      variantDetails,
      variantsList: variant === 'Yes' ? variantsList : [],

      gender,
      ageGroup,
      category:
        category === 'Custom' ? customCategory.trim() || 'Garment' : category,
      customCategory,
      subcategory:
        subcategory === 'Custom'
          ? customSubcategory.trim() || 'Apparel'
          : subcategory,
      customSubcategory,
      collection:
        collection === 'Custom'
          ? customCollection.trim() || 'General Collection'
          : collection,
      customCollection,
      season: season === 'Custom' ? customSeason.trim() || 'SS26' : season,
      customSeason,

      developmentDate: `${devMonth} ${devYear}`,
      shipmentDate: `${shipMonth} ${shipYear}`,

      fabric: fabric.trim() || 'Cotton',
      fabricComposition: fabricComposition.trim() || '100% Cotton',
      gsm: gsm || '120',
      pattern: pattern.trim() || 'Solid',
      color: color.trim() || 'Blue',
      availableColors: parsedColors.length > 0 ? parsedColors : [color],
      sizeRange: sizeRange.length > 0 ? sizeRange : ['S', 'M', 'L'],
      moq: moq || '500',
      quantityUnit,
      marketSuitability,

      factoryCode: factoryCode.trim() || 'F26-001',
      factoryName,
      factoryPriceExw: factoryPriceExw || '0.00',
      salePrice: salePrice || '0.00',
      fobPrice: fobPrice || '0.00',
      fobPort,

      readyStockAvailability,
      readyStockQuantity:
        readyStockAvailability === 'Yes' ? readyStockQuantity || '0' : '0',
      readyStockQuantityUnit,

      customerName,
      customerStyleCode: customerStyleCode.trim() || 'C26-001',
      repeatOrder,
      repeatOrderNumber: repeatOrder === 'Yes' ? repeatOrderNumber : undefined,

      productStatus,
      featuredProduct,
      description: description.trim(),
      productImage:
        productImage.trim() ||
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',

      createdAtDate: `${createdMonth} ${createdYear}`,
      updatedAtDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    }

    onSave(finalProduct)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-sm">
              ST
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {isEditing ? `Edit Product: ${productCode}` : 'Create New Product Record'}
              </h2>
              <p className="text-xs text-slate-500">
                All 44 export specification fields in a single scrollable form.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Form Body - Single Smooth Scrollable View */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1: PRIMARY IDENTIFIERS */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Primary Product Identifiers & Status
                </h3>
                <p className="text-xs text-slate-500">
                  Core codes used across POs, shipping tags, and inventory.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Product Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Code <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="e.g. ST-1001"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Style Tracking Code (e.g. ST-1001)
                </span>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SKU <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. DRS-001"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Stock Keeping Unit (e.g. DRS-001)
                </span>
              </div>

              {/* Purchase Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Purchase Code <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={purchaseCode}
                  onChange={(e) => setPurchaseCode(e.target.value)}
                  placeholder="e.g. PUR-001"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  PO Reference (e.g. PUR-001)
                </span>
              </div>

              {/* Product Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Status <span className="text-blue-600">*</span>
                </label>
                <select
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="Active">Active (Publish)</option>
                  <option value="Inactive">Inactive (Archived)</option>
                </select>
              </div>
            </div>

            {/* Product Name & Product Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Floral Maxi Dress"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Type <span className="text-blue-600">*</span>
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Product Type</option>
                </select>

                {productType === 'Custom' && (
                  <input
                    type="text"
                    value={customProductType}
                    onChange={(e) => setCustomProductType(e.target.value)}
                    placeholder="Type custom product type..."
                    className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-50/50 border border-blue-300 rounded-lg focus:border-blue-500 outline-none"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Featured Product (Hero Showcase)
                </label>
                <select
                  value={featuredProduct}
                  onChange={(e) => setFeaturedProduct(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="Yes">Yes (Highlighted in showroom)</option>
                  <option value="No">No (Standard catalog)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Has Variants (Colors / Sizes)?
                </label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="Yes">Yes (Has multi-color/size variations)</option>
                  <option value="No">No (Single SKU stand-alone)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: CATEGORIZATION & DEMOGRAPHICS */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Categorization, Demographics & Seasons
                </h3>
                <p className="text-xs text-slate-500">
                  Category hierarchy, market segments, and delivery schedules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender <span className="text-blue-600">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age Group <span className="text-blue-600">*</span>
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {AGE_GROUP_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category (with custom option) <span className="text-blue-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    if (SUBCATEGORY_MAP[e.target.value]) {
                      setSubcategory(SUBCATEGORY_MAP[e.target.value][0])
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Category</option>
                </select>
                {category === 'Custom' && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name..."
                    className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-50/50 border border-blue-300 rounded-lg outline-none"
                  />
                )}
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subcategory (with custom option) <span className="text-blue-600">*</span>
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {SUBCATEGORY_MAP[category]?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Subcategory</option>
                </select>
                {subcategory === 'Custom' && (
                  <input
                    type="text"
                    value={customSubcategory}
                    onChange={(e) => setCustomSubcategory(e.target.value)}
                    placeholder="Enter custom subcategory..."
                    className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-50/50 border border-blue-300 rounded-lg outline-none"
                  />
                )}
              </div>

              {/* Collection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Collection (with custom option)
                </label>
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {COLLECTION_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Collection</option>
                </select>
                {collection === 'Custom' && (
                  <input
                    type="text"
                    value={customCollection}
                    onChange={(e) => setCustomCollection(e.target.value)}
                    placeholder="e.g. Summer Collection 2026..."
                    className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-50/50 border border-blue-300 rounded-lg outline-none"
                  />
                )}
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Season (with custom option) <span className="text-blue-600">*</span>
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {SEASON_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Season</option>
                </select>
                {season === 'Custom' && (
                  <input
                    type="text"
                    value={customSeason}
                    onChange={(e) => setCustomSeason(e.target.value)}
                    placeholder="e.g. SS26 / AW26 / Resort..."
                    className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-50/50 border border-blue-300 rounded-lg outline-none"
                  />
                )}
              </div>
            </div>

            {/* Development & Shipment Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Development Date (Month & Year) <span className="text-blue-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={devMonth}
                    onChange={(e) => setDevMonth(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={devYear}
                    onChange={(e) => setDevYear(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Shipment Date (Month & Year) <span className="text-blue-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={shipMonth}
                    onChange={(e) => setShipMonth(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={shipYear}
                    onChange={(e) => setShipYear(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Market Suitability */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Market Suitability (Multi-select + Custom)
              </label>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {MARKET_OPTIONS.map((m) => {
                  const isChecked = marketSuitability.includes(m)
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => {
                        setMarketSuitability((prev) =>
                          isChecked
                            ? prev.filter((item) => item !== m)
                            : [...prev, m]
                        )
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {isChecked && '✓ '}
                      {m}
                    </button>
                  )
                })}
              </div>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  value={customMarketInput}
                  onChange={(e) => setCustomMarketInput(e.target.value)}
                  placeholder="Add custom market (e.g. Singapore)..."
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customMarketInput.trim()) {
                      setMarketSuitability((prev) => [...prev, customMarketInput.trim()])
                      setCustomMarketInput('')
                    }
                  }}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: FABRIC & PHYSICAL SPECS */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Fabric, Construction & Material Specifications
                </h3>
                <p className="text-xs text-slate-500">
                  GSM weights, textile composition, patterns, and sizing breakdown.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Fabric */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fabric Type <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Cotton / Viscose / Linen"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {FABRIC_OPTIONS.slice(0, 4).map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFabric(f)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      +{f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Composition */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fabric Composition <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fabricComposition}
                  onChange={(e) => setFabricComposition(e.target.value)}
                  placeholder="e.g. 100% Cotton"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {/* GSM */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fabric Weight (GSM) <span className="text-blue-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Pattern */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pattern <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="e.g. Floral / Solid / Printed"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {PATTERN_OPTIONS.slice(0, 4).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPattern(p)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      +{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Base Color <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Blue"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {/* Available Colors */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Available Colors <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={availableColorsText}
                  onChange={(e) => setAvailableColorsText(e.target.value)}
                  placeholder="e.g. Blue, Pink, Green"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Size Range & MOQ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Size Range (Select or add custom)
                </label>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {SIZE_PRESETS.map((sz) => {
                    const isChecked = sizeRange.includes(sz)
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => {
                          setSizeRange((prev) =>
                            isChecked
                              ? prev.filter((item) => item !== sz)
                              : [...prev, sz]
                          )
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked && '✓ '}
                        {sz}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="text"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    placeholder="Custom size (e.g. 4XL)..."
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customSizeInput.trim()) {
                        setSizeRange((prev) => [...prev, customSizeInput.trim()])
                        setCustomSizeInput('')
                      }
                    }}
                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    MOQ <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    placeholder="500"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unit <span className="text-blue-600">*</span>
                  </label>
                  <select
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                  >
                    {QUANTITY_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: VARIANT MATRIX */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                  4
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Variant Matrix Management
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automated Colorway × Size scale SKU generation.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateVariantMatrix}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <FiRefreshCw size={12} />
                <span>Generate Matrix from Colors & Sizes</span>
              </button>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Variant Configuration Notes
              </label>
              <input
                type="text"
                value={variantDetails}
                onChange={(e) => setVariantDetails(e.target.value)}
                placeholder="e.g. Available across 3 colorways and 4 sizes..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none"
              />
            </div>

            {/* Variants table */}
            {variantsList.length > 0 && (
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Variant SKU</th>
                      <th className="py-2 px-3">Color</th>
                      <th className="py-2 px-3">Size</th>
                      <th className="py-2 px-3">Stock Units</th>
                      <th className="py-2 px-3">Price Adj ($)</th>
                      <th className="py-2 px-3">Barcode</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {variantsList.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/50">
                        <td className="py-1.5 px-3 font-mono font-semibold text-blue-700">
                          {v.sku}
                        </td>
                        <td className="py-1.5 px-3">{v.color}</td>
                        <td className="py-1.5 px-3">{v.size}</td>
                        <td className="py-1.5 px-3 font-mono">{v.stockQuantity}</td>
                        <td className="py-1.5 px-3 font-mono">${v.priceAdjustment}</td>
                        <td className="py-1.5 px-3 font-mono text-[11px] text-slate-500">
                          {v.barcode}
                        </td>
                        <td className="py-1.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setVariantsList(variantsList.filter((item) => item.id !== v.id))
                            }
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SECTION 5: SOURCING & PRICING */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                5
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Manufacturing Factory, Costing & Pricing
                </h3>
                <p className="text-xs text-slate-500">
                  EXW direct cost, export FOB rates, and computed gross profit margins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Factory Name (Database) <span className="text-blue-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddFactoryInput(!showAddFactoryInput)}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {showAddFactoryInput ? 'Cancel' : '+ New Factory'}
                  </button>
                </div>

                {!showAddFactoryInput ? (
                  <select
                    value={factoryName}
                    onChange={(e) => setFactoryName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                  >
                    {factories.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newFactoryInput}
                      onChange={(e) => setNewFactoryInput(e.target.value)}
                      placeholder="New factory name..."
                      className="flex-1 px-3 py-2 text-xs bg-white border border-blue-400 rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNewFactory}
                      className="px-3 py-2 text-xs bg-blue-600 text-white rounded-lg font-medium"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Factory Code (Auto Generated) <span className="text-blue-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateFactoryCode}
                    className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <FiRefreshCw size={10} />
                    <span>Re-generate</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={factoryCode}
                  onChange={(e) => setFactoryCode(e.target.value)}
                  placeholder="e.g. F26-001"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono font-semibold text-blue-700"
                />
              </div>
            </div>

            {/* Pricing fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Factory Price (EXW) <span className="text-blue-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={factoryPriceExw}
                    onChange={(e) => setFactoryPriceExw(e.target.value)}
                    placeholder="7.20"
                    className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  FOB Price <span className="text-blue-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={fobPrice}
                    onChange={(e) => setFobPrice(e.target.value)}
                    placeholder="8.00"
                    className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sale Price <span className="text-blue-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="8.50"
                    className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Margin Calculation banner */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-700">Gross Profit:</span>
                <span className="ml-2 font-mono font-bold text-slate-900">
                  ${marginData.profit.toFixed(2)}/pc
                </span>
                <span className="ml-3 text-slate-500">
                  (Markup: {marginData.markupPercent}%)
                </span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +{marginData.marginPercent}% Gross Margin
              </span>
            </div>

            {/* FOB Port */}
            <div className="max-w-md">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                FOB Port <span className="text-blue-600">*</span>
              </label>
              <select
                value={fobPort}
                onChange={(e) => setFobPort(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
              >
                {FOB_PORTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SECTION 6: READY STOCK & INVENTORY */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                6
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Ready Stock Availability & Warehouse Units
                </h3>
                <p className="text-xs text-slate-500">
                  Immediate dispatch stock availability and inventory counts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ready Stock Availability <span className="text-blue-600">*</span>
                </label>
                <select
                  value={readyStockAvailability}
                  onChange={(e) => setReadyStockAvailability(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="Yes">Yes (In warehouse stock)</option>
                  <option value="No">No (Made to order)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ready Stock Quantity
                </label>
                <input
                  type="number"
                  disabled={readyStockAvailability === 'No'}
                  value={readyStockQuantity}
                  onChange={(e) => setReadyStockQuantity(e.target.value)}
                  placeholder="2500"
                  className="w-full px-3 py-2 text-xs bg-white disabled:bg-slate-100 border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity Unit <span className="text-blue-600">*</span>
                </label>
                <select
                  disabled={readyStockAvailability === 'No'}
                  value={readyStockQuantityUnit}
                  onChange={(e) => setReadyStockQuantityUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white disabled:bg-slate-100 border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  {READY_STOCK_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 7: CUSTOMER & ORDER TRACKING */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                7
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Customer Assignment & Re-order History
                </h3>
                <p className="text-xs text-slate-500">
                  Client buyer accounts, style codes, and repeat order cycles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Customer Name (Database) <span className="text-blue-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddCustomerInput(!showAddCustomerInput)}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    {showAddCustomerInput ? 'Cancel' : '+ New Customer'}
                  </button>
                </div>

                {!showAddCustomerInput ? (
                  <select
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                  >
                    {customers.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newCustomerInput}
                      onChange={(e) => setNewCustomerInput(e.target.value)}
                      placeholder="New client account..."
                      className="flex-1 px-3 py-2 text-xs bg-white border border-blue-400 rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNewCustomer}
                      className="px-3 py-2 text-xs bg-blue-600 text-white rounded-lg font-medium"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Customer Style Code (Auto Generated) <span className="text-blue-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateCustomerCode}
                    className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <FiRefreshCw size={10} />
                    <span>Re-generate</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={customerStyleCode}
                  onChange={(e) => setCustomerStyleCode(e.target.value)}
                  placeholder="e.g. C26-001 or XYZ-1001"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 outline-none font-mono font-semibold text-blue-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Repeat Order? <span className="text-blue-600">*</span>
                </label>
                <select
                  value={repeatOrder}
                  onChange={(e) => setRepeatOrder(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="Yes">Yes (Replenishment program)</option>
                  <option value="No">No (First time run)</option>
                </select>
              </div>

              {repeatOrder === 'Yes' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Repeat Order Number <span className="text-blue-600">*</span>
                  </label>
                  <select
                    value={repeatOrderNumber}
                    onChange={(e) => setRepeatOrderNumber(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                  >
                    <option value="1st">1st Repeat Order</option>
                    <option value="2nd">2nd Repeat Order</option>
                    <option value="3rd">3rd Repeat Order</option>
                    <option value="4th+">4th+ Repeat Run</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 8: MEDIA & DESCRIPTION */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                8
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Product Image, Tech Description & Audit Dates
                </h3>
                <p className="text-xs text-slate-500">
                  High-res image thumbnail, merchandiser notes, and record timestamps.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Image (URL or File Upload) <span className="text-blue-600">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-28 h-36 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative flex items-center justify-center">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80'
                      }}
                    />
                  ) : (
                    <div className="text-center p-2 text-slate-400">
                      <FiImage size={24} className="mx-auto mb-1 text-slate-300" />
                      <span className="text-[10px]">No image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">
                      Image URL:
                    </label>
                    <input
                      type="url"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">
                      Or Upload File:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-slate-600 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Description (Tech Pack Summary) <span className="text-blue-600">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short product description for buyer spec sheet..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Created At Date (Month & Year) <span className="text-blue-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={createdMonth}
                    onChange={(e) => setCreatedMonth(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={createdYear}
                    onChange={(e) => setCreatedYear(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Updated At Date (Auto Timestamp)
                </label>
                <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Form Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 -mx-6 px-6 -mb-6">
            <span className="text-xs text-slate-500 font-medium">
              All 44 export specification fields • Auto-synced to ShivaSun ERP
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FiCheck size={14} className="stroke-[2.5]" />
                <span>{isEditing ? 'Save Product Changes' : 'Create Product Entry'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
