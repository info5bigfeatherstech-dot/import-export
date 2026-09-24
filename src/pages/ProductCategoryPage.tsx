import { useState, useEffect, useMemo } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbCheck,
  TbMail,
  TbX,
  TbHeart,
  TbHeartFilled,
  TbEye,
  TbSparkles,
  TbStar
} from 'react-icons/tb'
import {
  fetchProductsByCategory,
  type ProductItem,
  type CategoryMetadata
} from '../data/mockProductsApi'

export default function ProductCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>()
  const location = useLocation()

  // Resolve slug from route parameter or direct URL path
  const resolvedSlug = useMemo(() => {
    if (categorySlug) return categorySlug.toLowerCase().trim()
    const pathParts = location.pathname.split('/').filter(Boolean)
    const lastPart = pathParts[pathParts.length - 1] || 'mens-jacket'
    return lastPart.toLowerCase().trim()
  }, [categorySlug, location.pathname])

  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState<CategoryMetadata | null>(null)
  const [products, setProducts] = useState<ProductItem[]>([])

  // Wishlist state (local storage/state for e-commerce feel)
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null)
  const [selectedQuickViewColor, setSelectedQuickViewColor] = useState<number>(0)
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState<string>('M')

  // RFQ Inquiry Modal State
  const [rfqProduct, setRfqProduct] = useState<ProductItem | null>(null)
  const [rfqSubmitted, setRfqSubmitted] = useState(false)
  const [rfqForm, setRfqForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '500',
    destination: 'United States (FOB / CIF)',
    notes: 'Please quote OEM pricing with custom brand labels and hangtags.'
  })

  // Selected color preview for each card
  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, number>>({})

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchProductsByCategory(resolvedSlug)
      .then((data) => {
        if (!isMounted) return
        setCategoryData(data.category)
        setProducts(data.products)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load category products:', err)
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [resolvedSlug])

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }


  const handleOpenRfq = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setRfqProduct(product)
    setRfqSubmitted(false)
    setRfqForm((prev) => ({
      ...prev,
      quantity: product.moq ? product.moq.split(' ')[0] || '500' : '500'
    }))
  }

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRfqSubmitted(true)
  }

  const handleOpenQuickView = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuickViewProduct(product)
    setSelectedQuickViewColor(0)
    setSelectedQuickViewSize(product.sizes[0] || 'M')
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-28 font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR & BREADCRUMBS */}
      <div className="bg-slate-900 text-white text-[11px] py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/industry/${categoryData?.divisionSlug || 'garments'}`}
              className="hover:text-amber-400 transition-colors"
            >
              {categoryData?.division || 'Garments'}
            </Link>
            <span>/</span>
            <span className="text-slate-300">{categoryData?.group || 'Men'}</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold uppercase tracking-wider">
              {categoryData?.name || "Men's Jacket"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              <TbSparkles className="w-3.5 h-3.5" />
              Direct Export Wholesale &bull; OEM / ODM Custom Collections
            </span>
            <span className="text-slate-600">|</span>
            <span>AQL 2.5 Quality Guaranteed</span>
          </div>
        </div>
      </div>

      {/* 2. E-COMMERCE BRAND HEADER */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/60 to-white pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs uppercase tracking-widest font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {categoryData?.group || 'Men'} Division
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {products.length} Styles Available
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase font-[Manrope]">
                {categoryData?.name || "Men's Jacket"}{' '}
                <span className="text-amber-500 font-normal">Showcase</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                {categoryData?.headline ||
                  "Engineered utility truckers, technical softshells, down puffers, and tailored overcoats crafted with premium fabrics and export-grade hardware for private labels and global brands."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN E-COMMERCE PRODUCTS SHOWCASE GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {loading ? (
          /* SKELETON LOADING */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-[3/4] bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-20 text-center max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">No products currently available</h3>
            <p className="text-xs text-slate-500 mb-6">
              Check back soon or explore our other apparel categories.
            </p>
          </div>
        ) : (
          /* MODERN E-COMMERCE PRODUCT GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {products.map((product) => {
              const activeColorIndex = cardSelectedColors[product.id] || 0
              const activeColor = product.colors[activeColorIndex] || product.colors[0]
              const isWishlisted = !!wishlist[product.id]

              return (
                <div
                  key={product.id}
                  onClick={(e) => handleOpenQuickView(product, e)}
                  className="group relative flex flex-col cursor-pointer transition-all duration-300"
                >
                  {/* Product Image Frame (High-end 3:4 Fashion Aspect Ratio) */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/90 shadow-2xs group-hover:shadow-lg group-hover:border-slate-300 transition-all duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Bottom text visibility on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Left Tag / Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/85 backdrop-blur-sm text-white shadow-xs">
                        {product.sku}
                      </span>
                      {product.season && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                          {product.season.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    {/* Top Right Wishlist / Save Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(product.id, e)}
                      aria-label="Add to Wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all shadow-xs"
                    >
                      {isWishlisted ? (
                        <TbHeartFilled className="w-4 h-4 text-rose-600" />
                      ) : (
                        <TbHeart className="w-4 h-4" />
                      )}
                    </button>

                    {/* Quick Action Floating Bar (slides up on hover) */}
                    <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleOpenQuickView(product, e)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-sm hover:bg-slate-950 hover:text-white text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
                      >
                        <TbEye className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleOpenRfq(product, e)}
                        className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center shadow-md transition-all active:scale-[0.98]"
                        title="Request Quote / Sample"
                      >
                        <TbMail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details under image */}
                  <div className="pt-3.5 flex flex-col flex-1 space-y-2">
                    {/* Color Swatch Dots */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCardSelectedColors((prev) => ({ ...prev, [product.id]: idx }))
                            }}
                            title={c.name}
                            className={`w-3.5 h-3.5 rounded-full border transition-all ${
                              activeColorIndex === idx
                                ? 'ring-2 ring-slate-950 scale-110 border-white'
                                : 'border-slate-300 hover:scale-110'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>

                      {/* Active Color Name */}
                      <span className="text-[11px] text-slate-500 font-medium">
                        {activeColor.name}
                      </span>
                    </div>

                    {/* Brand line & Reviews */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="uppercase tracking-wider font-semibold text-slate-400">
                        SSM &bull; {product.fit || 'Regular Fit'}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <TbStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                        <span className="text-slate-400 font-normal">(42)</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Material snippet */}
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {product.materials.split(',')[0]}
                    </p>

                    {/* MOQ B2B Specification Row */}
                    <div className="pt-1.5 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] font-medium text-slate-500">
                        Export Run:
                      </span>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        MOQ {product.moq}
                      </span>
                    </div>

                    {/* Available Sizes Strip */}
                    <div className="flex items-center gap-1 pt-1 text-[10px] text-slate-400 font-medium overflow-hidden">
                      <span>Sizes:</span>
                      {product.sizes.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>


      {/* 5. E-COMMERCE QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px] md:min-h-[460px]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase">
                  {quickViewProduct.sku}
                </div>
              </div>

              {/* Right Column: E-Commerce Product Details */}
              <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-amber-600 tracking-wider">
                      {quickViewProduct.categoryName} &bull; {quickViewProduct.group}
                    </span>
                    <button
                      onClick={() => setQuickViewProduct(null)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                    >
                      <TbX className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 leading-tight mt-1">
                    {quickViewProduct.name}
                  </h3>

                  {/* MOQ & Rating */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">
                        Minimum Order Quantity
                      </span>
                      <span className="text-base font-extrabold text-slate-950">
                        {quickViewProduct.moq}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <TbStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                      4.9 (42 reviews)
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {quickViewProduct.description}
                  </p>

                  {/* Color Selector */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-800 mb-2">
                      Color: <span className="font-normal text-slate-600">{quickViewProduct.colors[selectedQuickViewColor]?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedQuickViewColor(idx)}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            selectedQuickViewColor === idx
                              ? 'ring-2 ring-slate-950 scale-110 border-white'
                              : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-4">
                    <div className="text-xs font-bold text-slate-800 mb-2">
                      Select Sample Size: <span className="text-amber-600">{selectedQuickViewSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedQuickViewSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            selectedQuickViewSize === s
                              ? 'bg-slate-950 text-white border-slate-950'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications & Materials */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] space-y-1.5">
                    <div>
                      <span className="font-bold text-slate-700">Material: </span>
                      <span className="text-slate-600">{quickViewProduct.materials}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Specs: </span>
                      <span className="text-slate-600">{quickViewProduct.specs}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">MOQ & Lead Time: </span>
                      <span className="text-amber-700 font-semibold">{quickViewProduct.moq} &bull; {quickViewProduct.leadTime}</span>
                    </div>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      const p = quickViewProduct
                      setQuickViewProduct(null)
                      handleOpenRfq(p)
                    }}
                    className="flex-1 py-3 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <TbMail className="w-4 h-4" />
                    Request Quote & Sample
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. RFQ & INQUIRY MODAL */}
      <AnimatePresence>
        {rfqProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden"
            >
              <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Factory Direct Quotation
                  </span>
                  <h4 className="text-base font-bold text-white truncate max-w-xs">
                    {rfqProduct.name}
                  </h4>
                </div>
                <button
                  onClick={() => setRfqProduct(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <TbX className="w-5 h-5" />
                </button>
              </div>

              {rfqSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <TbCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-950">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you {rfqForm.name}. Our commercial export division will send the complete tech-pack pricing breakdown for SKU <span className="font-bold">{rfqProduct.sku}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => setRfqProduct(null)}
                    className="w-full py-2.5 bg-slate-950 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
                  >
                    Done &bull; Continue Browsing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="p-6 space-y-4 text-xs">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img
                      src={rfqProduct.image}
                      alt={rfqProduct.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 truncate">{rfqProduct.name}</div>
                      <div className="text-[11px] text-slate-500">
                        SKU: {rfqProduct.sku} &bull; Standard MOQ: {rfqProduct.moq}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={rfqForm.name}
                        onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company Email *</label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="buyer@brand.com"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Brand / Company</label>
                      <input
                        type="text"
                        value={rfqForm.company}
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                        placeholder="Apparel Co."
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Target Quantity *</label>
                      <input
                        type="number"
                        min="50"
                        required
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Customization / Tech-Pack Notes</label>
                    <textarea
                      rows={2}
                      value={rfqForm.notes}
                      onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRfqProduct(null)}
                      className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
                    >
                      Submit RFQ Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
